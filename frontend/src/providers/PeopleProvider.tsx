import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import api from "@/services/api";
import type { Person } from "@/@types/People";
import { useAlert } from "./AlertProvider";
import type { AxiosError, AxiosResponse } from "axios";
import type { ErrorResponse } from "@/@types/Response";

type PeopleContextType = {
  people: Person[];
  addPerson: (data: Person) => void;
  updatePerson: (data: Person) => void;
  deletePerson: (id: number) => void;
};

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export function usePeopleContext() {
  const context = useContext(PeopleContext);
  if (!context) {
    throw new Error("usePeopleContext deve ser usado dentro do PeopleProvider");
  }
  return context;
}

export function loadPeople() {
  return api
    .get("people")
    .then((res: AxiosResponse<Person[], []>) => res.data)
    .catch((err) => console.error("Erro ao carregar as pessoas: ", err));
}

type UpdateStateAction = {
  alterar?: boolean;
  excluir?: boolean;
};

interface PeopleProviderProps {
  children: ReactNode;
}

export default function PeopleProvider({ children }: PeopleProviderProps) {
  const [people, setPeople] = useState<Person[]>([]);

  const { showAlert } = useAlert();

  const errorResponseDefault = (action: string) => {
    return {
      error: {
        title: `Erro ao ${action} pessoa!`,
      }
    } as ErrorResponse
  }

  const updatePeopleState = (data: Person, action?: UpdateStateAction) => {
    setPeople((prevPeople) => {
      //Se for ação de alterar, alteramos uma das pessoas salvas no state
      if (action?.alterar) {
        return prevPeople.map((value) => (value.id == data.id ? data : value));
      }

      //Se for ação de excluir, filtramos as pessoas para não conter o que foi apagado
      if (action?.excluir) {
        return prevPeople.filter((value) => value.id !== data.id);
      }
      return [...prevPeople, data];
    });
  };

  const loadPeopleState = () => {
    return loadPeople().then((res) => res && setPeople(res));
  };

  const addPerson = (data: Person) => {
    if (!data) {
      return showAlert({
        title: "Erro ao adicionar pessoa!",
        description:
          "Não foi possível adicionar o registro por iconsistência de dados.",
        variant: "error",
      });
    }
    api
      .post("people", data)
      .then((res: AxiosResponse<Person>) => {
        updatePeopleState(res.data);
        showAlert({
          title: "Pessoa inserida com sucesso!",
          variant: "success",
        });
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        const data = err.response?.data
        const { error } = (data ?? errorResponseDefault('incluir'))

        showAlert({
          ...error,
          variant: 'error'
        });
        console.error(error.trace);
      });
  };

  const updatePerson = (data: Person) => {
    if (!data) {
      return showAlert({
        title: "Erro ao atualizar pessoa!",
        description:
          "Não foi possível atualizar o registro por iconsistência de dados.",
        variant: "error",
      });
    }
    api
      .put(`people/${data.id}`, data)
      .then((res: AxiosResponse<Person>) => {
        updatePeopleState(res.data, { alterar: true });
        showAlert({
          title: "Pessoa atualizada com sucesso!",
          variant: "success",
        });
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        const data = err.response?.data
        const { error } = (data ?? errorResponseDefault('alterar'))

        showAlert({
          ...error,
          variant: 'error'
        });
        console.error(error.trace);
      });
  };

  const deletePerson = (id: number) => {
    if (!id) {
      return showAlert({
        title: "Erro ao deletar pessoa!",
        description:
          "Não foi possível deletar o registro por iconsistência de dados.",
        variant: "error",
      });
    }
    api
      .delete(`people/${id}`)
      .then(() => {
        updatePeopleState({ id, cpf: "", nome: "" }, { excluir: true });
        showAlert({
          title: "Pessoa deletada com sucesso!",
          variant: "success",
        });
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        const data = err.response?.data
        const { error } = (data ?? errorResponseDefault('deletar'))

        showAlert({
          ...error,
          variant: 'error'
        });
        console.error(error.trace);
      });
  };

  useEffect(() => {
    loadPeopleState();
  }, []);

  return (
    <PeopleContext.Provider
      value={{
        people,
        addPerson,
        updatePerson,
        deletePerson,
      }}>
      {children}
    </PeopleContext.Provider>
  );
}
