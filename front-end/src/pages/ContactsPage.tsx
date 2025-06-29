import { useEffect, useState } from "react";
import { Phone, BookUser, Mail } from "lucide-react";

import type { Column } from "@/components/DataTable";

import Banner from "@/components/Banner";
import ContactsProvider, {
  useContactsContext,
} from "@/components/contacts/ContactsProvider";
import SectionCards, { type CardType } from "@/components/SectionCards";
import SectionTable from "@/components/SectionTable";
import type { Contact } from "@/@types/Contacts";
import { EnumContactTipo } from "@/enums/EnumContact";
import ContactValidator from "@/validators/ContactValidator";
import { formatPhone } from "@/utils/contactFormatter";

export default function ContactsPage() {
  return (
    <ContactsProvider>
      <ContactsPageContent />
    </ContactsProvider>
  );
}

function ContactsPageContent() {
  const { contacts, deleteContact } = useContactsContext();
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contacts.length) return;
    setFilteredContacts(contacts);
    setLoading(false);
  }, [contacts]);

  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      normalize(contact.descricao).includes(normalize(searchTerm))
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  const normalize = (str: string | number) =>
    String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "tipo",
      label: "Tipo",
      render: (value: number) => EnumContactTipo[value],
    },
    {
      key: "descricao",
      label: "Descrição",
      render: (value: string) => {
        const validator = new ContactValidator(value);
        return <>{validator.isPhone() ? formatPhone(value) : value}</>;
      },
    },
    {
      key: "idPessoa",
      label: "Pessoa ID"
    },
  ] as Column[];

  const totalEmail = contacts.filter(
    (contact) => contact.tipo == EnumContactTipo.EMAIL
  ).length;

  const cards = [
    {
      title: "Total de Contatos",
      description: "Contatos cadastrados",
      Icon: BookUser,
      data: contacts.length,
    },
    {
      title: "E-mails",
      description: "Total de contatos do tipo e-mail",
      Icon: Mail,
      data: totalEmail,
    },
    {
      title: "Telefones",
      description: "Total de contatos do tipo telefone",
      Icon: Phone,
      data: contacts.length - totalEmail,
    },
  ] as CardType[];
  return (
    <>
      <Banner
        Icon={Phone}
        title="Gestão de Contatos"
        description="Aqui você pode fazer a gestão dos dados relacionados à contatos"
      />
      <SectionCards cards={cards} />
      <SectionTable
        tableProps={{
          columns,
          data: filteredContacts,
          loading,
          formProps: {
            contact: true,
          },
          onDelete: deleteContact,
        }}
        search={{
          columnSearch: "descrição",
          searchTerm,
          setSearchTerm,
        }}
      />
    </>
  );
}
