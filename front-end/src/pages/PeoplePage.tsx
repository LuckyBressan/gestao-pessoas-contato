import Banner from "@/components/Banner";
import type { Column } from "@/components/DataTable";
import SectionCards, { type CardType } from "@/components/SectionCards";
import SectionTable from "@/components/SectionTable";
import { User, MailCheck, MailX, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface Person {
  id: number;
  nome: string;
  cpf: string;
  contatos: [];
}

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockPeople: Person[] = [
        {
          id: 1,
          nome: "Ana Silva",
          cpf: "123.456.789-00",
          contatos: [],
        },
        {
          id: 2,
          nome: "João Bezerra da Silva",
          cpf: "032.203.340-32",
          contatos: [],
        },
        {
          id: 3,
          nome: "Maria Gonzales de Aparecida",
          cpf: "987.654.321-11",
          contatos: [],
        },
        {
          id: 4,
          nome: "Carlos Eduardo Souza",
          cpf: "111.222.333-44",
          contatos: [],
        },
        {
          id: 5,
          nome: "Fernanda Lima",
          cpf: "555.666.777-88",
          contatos: [],
        },
      ];

      setPeople(mockPeople);
      setFilteredPeople(mockPeople);
      setLoading(false);
    };

    fetchPeople();
  }, []);

  useEffect(() => {
    const filtered = people.filter((person) => normalize(person.nome).includes(normalize(searchTerm)));
    setFilteredPeople(filtered);
  }, [searchTerm, people]);

  const normalize = (str: string | number) =>
    String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const handleEdit = (id: number) => {
    console.log("Editar pessoa:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Excluir pessoa:", id);
    setPeople(people.filter((person) => person.id !== id));
  };

  const handleAddNew = () => {
    console.log("Adicionar nova pessoa");
  };

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
    },
  ] as Column[];

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
      data: people.filter(person => !!person.contatos.length).length,
    },
    {
      title: "Pessoas sem Contatos",
      description: "Pessoas sem contatos vinculados",
      Icon: MailX,
      data: people.filter(person => !person.contatos.length).length,
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
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
        addNew={handleAddNew}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
}
