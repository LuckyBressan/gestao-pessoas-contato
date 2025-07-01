import { useState } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

import { usePeopleContext } from "@/providers/PeopleProvider";

import CpfValidator from "@/validators/CpfValidator";
import { formatCpf, unformatCpf } from "@/utils/cpfFormatter";
import type { Person } from "@/@types/People";

export interface PeopleFormProps {
  info?: Person;
  setOpenDialogForm: (open: boolean) => void;
}

type ValidFormType = {
  valid: boolean;
  input?: string;
};

export default function PeopleForm({
  info,
  setOpenDialogForm,
}: PeopleFormProps) {
  const { addPerson, updatePerson } = usePeopleContext();

  const [valid, setValid] = useState<ValidFormType>({ valid: true });

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

    const cpf = unformatCpf(
      (e.currentTarget.elements.namedItem(`person-cpf`) as HTMLInputElement)
        .value
    );

    const data = {
      id: info?.id,
      nome: (
        e.currentTarget.elements.namedItem(`person-name`) as HTMLInputElement
      ).value,
      cpf: cpf,
    } as Person;

    if (info) {
      updatePerson(data);
    } else {
      addPerson(data);
    }

    setOpenDialogForm(false);
  };

  const handleBlurCpf = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const input = e.target;
    const validator = new CpfValidator(input.value);
    if (!validator.validate()) {
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

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="*:not-first:mt-2">
          <Label htmlFor={`person-name`}>Nome</Label>
          <Input
            id={`person-name`}
            type="text"
            defaultValue={info?.nome}
            placeholder="Informe o nome completo..."
            required
          />
        </div>
        <div className="*:not-first:mt-2">
          <Label htmlFor={`person-cpf`}>CPF</Label>
          <div className="relative">
            <Input
              id={`person-cpf`}
              placeholder="xxx.xxx.xxx-xx"
              defaultValue={info?.cpf ? formatCpf(info?.cpf) : ""}
              className="peer pe-9 [direction:inherit]"
              onBlur={handleBlurCpf}
              required
            />
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Confirmar
      </Button>
    </form>
  );
}
