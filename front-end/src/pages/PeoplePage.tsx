import type { Person } from "@/@types/People";
import Banner from "@/components/Banner";
import type { Column } from "@/components/DataTable";
import PeopleProvider, { usePeopleContext } from "@/components/people/PeopleProvider";
import SectionCards, { type CardType } from "@/components/SectionCards";
import SectionTable from "@/components/SectionTable";
import { formatCpf } from "@/utils/cpfFormatter";
import { normalize } from "@/utils/stringFormatter";
import { User, MailCheck, MailX, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function PeoplePage() {

  return (
    <PeopleProvider>
      <PeoplePageContent />
    </PeopleProvider>
  );
}

function PeoplePageContent() {
  const { people, deletePerson } = usePeopleContext()
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!people.length) return
    setFilteredPeople(people);
    setLoading(false);
  }, [people]);

  useEffect(() => {
    const filtered = people.filter((person) => normalize(person.nome).includes(normalize(searchTerm)));
    setFilteredPeople(filtered);
  }, [searchTerm, people]);

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "nome",
      label: "Nome",
    },
    {
      key: "cpf",
      label: "CPF",
      render: (value: string) => formatCpf(value)
    },
  ] as Column[];

  const totalWithContacts = people.filter(person => !!person?.contatos?.length).length

  const cards = [
    {
      title: "Total de Pessoas",
      description: "Pessoas cadastradas",
      Icon: User,
      data: people.length,
    },
    {
      title: "Pessoas com Contatos",
      description: "Pessoas com contatos vinculados",
      Icon: MailCheck,
      data: totalWithContacts,
    },
    {
      title: "Pessoas sem Contatos",
      description: "Pessoas sem contatos vinculados",
      Icon: MailX,
      data: (people.length - totalWithContacts),
    },
  ] as CardType[];
  return (
    <>
      <Banner
        Icon={Users}
        title="Gestão de Pessoas"
        description="Aqui você pode fazer a gestão dos dados relacionados à pessoas"
      />
      <SectionCards cards={cards} />
      <SectionTable
        tableProps={{
          columns,
          data: filteredPeople,
          loading,
          formProps: {
            person: true
          },
          onDelete: deletePerson,
        }}
        search={{
          columnSearch: 'nome',
          searchTerm,
          setSearchTerm
        }}
      />
    </>
  )
}