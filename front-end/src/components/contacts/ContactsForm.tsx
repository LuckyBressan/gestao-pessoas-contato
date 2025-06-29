import { useEffect, useState } from "react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { SelectNative } from "../ui/select-native";
import type { Person } from "@/@types/People";

import type { Contact } from "@/@types/Contacts";
import { EnumContactTipo } from "@/enums/EnumContact";

import { useContactsContext } from "./ContactsProvider";
import { loadPeople } from "../people/PeopleProvider";
import ContactValidator from "@/validators/ContactValidator";
import { unformatPhone } from "@/utils/contactFormatter";
import SelectSearch from "../SelectSearch";

export interface ContactsFormProps {
  info?: Contact;
}

type ValidFormType = {
  valid: boolean;
  input?: string;
};

export default function ContactsForm({ info }: ContactsFormProps) {
  const { contacts, addContact, updateContact } = useContactsContext();

  const [valid, setValid] = useState<ValidFormType>({ valid: true });
  const [tipoContact, setTipoContact] = useState<EnumContactTipo>(
    EnumContactTipo.TELEFONE
  );
  const [people, setPeople] = useState<Person[]>([]);
  const [valueSelectPerson, setValueSelectPerson] = useState(info?.idPessoa || '')

  useEffect(() => {
    loadPeople().then((res) => {
      setPeople(res || []);
    });
  }, []);

  const isTipoTelefone = () => tipoContact == EnumContactTipo.TELEFONE;

  const toggleClassInputValid = (input: HTMLInputElement, valid: boolean) => {
    input.classList.toggle("input-invalid", valid);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!valid.valid) {
      const input = e.currentTarget.elements.namedItem(
        valid.input || ""
      ) as HTMLInputElement;
      toggleClassInputValid(input, true);
      input.focus();
      return false;
    }

    let contact = (
      e.currentTarget.elements.namedItem(
        `contact-descricao`
      ) as HTMLInputElement
    ).value;

    contact = isTipoTelefone() ? unformatPhone(contact) : contact;
    const data = {
      id: info?.id || parseInt(contacts.at(-1)?.id|| 0) + 1,
      tipo: parseInt(
        (e.currentTarget.elements.namedItem(`contact-tipo`) as HTMLInputElement)
          .value
      ),
      descricao: contact,
      idPessoa: parseInt(valueSelectPerson as string),
    } as Contact;
    if (info) {
      return updateContact(data);
    }
    addContact(data);
  };

  const handleBlurContact = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.target;
    const validator = new ContactValidator(input.value, isTipoTelefone());
    if (!validator.isValid()) {
      setValid({
        valid: false,
        input: input.id,
      });
      toggleClassInputValid(input, true);
    } else {
      setValid({ valid: true });
      toggleClassInputValid(input, false);
    }
  };

  const handleChangeContactTipo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const input = e.target.parentElement?.nextElementSibling as HTMLInputElement;
    if(input) input.value = ''
    setTipoContact(parseInt(e.target.value))
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="*:not-first:mt-2">
          <Label htmlFor="contact-descricao">Contato</Label>
          <div className="flex rounded-md shadow-xs">
            <SelectNative
              id="contact-tipo"
              className="text-muted-foreground hover:text-foreground w-fit rounded-e-none shadow-none"
              onChange={handleChangeContactTipo}
              defaultValue={info?.tipo || tipoContact}>
              <option value={EnumContactTipo.TELEFONE}>Telefone</option>
              <option value={EnumContactTipo.EMAIL}>E-mail</option>
            </SelectNative>
            <Input
              id="contact-descricao"
              className="-ms-px rounded-s-none shadow-none focus-visible:z-10"
              placeholder={
                isTipoTelefone() ? "(xx) xxxxx-xxxx" : "xxxx@gmail.com"
              }
              type={isTipoTelefone() ? "tel" : "email"}
              onBlur={handleBlurContact}
              defaultValue={info?.descricao}
            />
          </div>
        </div>
        <SelectSearch
          placeholder="pessoa"
          label="Pessoas"
          setValue={setValueSelectPerson}
          value={valueSelectPerson as string}
          items={
            people.map(person => {
              return {
                label: person.nome,
                value: String(person.id)
              }
            })
          }
        />
      </div>
      <Button type="submit" className="w-full">
        Confirmar
      </Button>
    </form>
  );
}