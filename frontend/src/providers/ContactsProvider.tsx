import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import api from "@/services/api";

import { useAlert } from "./AlertProvider";
import type { Contact } from "@/@types/Contacts";
import type { ErrorResponse } from "@/@types/Response";
import type { AxiosError, AxiosResponse } from "axios";
import { useAuthContext } from "./AuthProvider";

type ContactsContextType = {
  contacts: Contact[];
  addContact   : (data: Contact) => void;
  updateContact: (data: Contact) => void;
  deleteContact: (id  : number) => void;
};

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export function useContactsContext() {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContactsContext deve ser usado dentro do ContactsProvider");
  }
  return context;
}

type UpdateStateAction = {
  alterar?: boolean;
  excluir?: boolean;
}

interface ContactsProviderProps {
  children: ReactNode;
}

export default function ContactsProvider({ children }: ContactsProviderProps) {
  const { token } = useAuthContext()
  const [contacts, setContacts] = useState<Contact[]>([]);

  const { showAlert } = useAlert()

  const errorResponseDefault = (action: string) => {
    return {
      error: {
        title: `Erro ao ${action} contato!`
      }
    } as ErrorResponse
  }

  const updateContactsState = (data: Contact, action?: UpdateStateAction) => {
    setContacts((prevContacts) => {
      //Se for ação de alterar, alteramos um dos contatos salvos no state
      if (action?.alterar) {
        return prevContacts.map((value) =>
          value.id == data.id ? data : value
        );
      }

      //Se for ação de excluir, filtramos os contatos para não conter o que foi apagado
      if (action?.excluir) {
        return prevContacts.filter((value) => value.id !== data.id);
      }
      return [...prevContacts, data];
    });
  };

  const loadContacts = () => {
    return api
      .get("contacts")
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Erro ao carregar os contatos: ", err));
  };

  const addContact = (data: Contact) => {
    if (!data) {
        return showAlert({
            title: "Erro ao adicionar contato!",
            description:"Não foi possível adicionar o registro por iconsistência de dados.",
            variant: 'error'
        });
    }
    api
      .post("contacts", data)
      .then((res: AxiosResponse<Contact>) => {
        updateContactsState(res.data);
        showAlert({
            title: "Contato inserido com sucesso!",
            variant: 'success'
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

  const updateContact = (data: Contact) => {
    if (!data) {
        return showAlert({
            title: "Erro ao atualizar contato!",
            description: "Não foi possível atualizar o registro por iconsistência de dados.",
            variant: 'error'
        });
    }
    api
      .put(`contacts/${data.id}`, data)
      .then(() => {
        updateContactsState(data, { alterar: true });
        showAlert({
            title: "Contato atualizado com sucesso!",
            variant: 'success'
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

  const deleteContact = (id: number) => {
    if (!id) {
        return showAlert({
            title: "Erro ao deletar contato!",
            description: "Não foi possível deletar o registro por iconsistência de dados.",
            variant: 'error'
        });
    }
    api
      .delete(`contacts/${id}`)
      .then(() => {
        updateContactsState(
          { id, descricao: "", idPessoa: 0, tipo: 1 },
          { excluir: true }
        );
        showAlert({
            title: "Contato deletado com sucesso!",
            variant: 'success'
        });
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        const data = err.response?.data
        const { error } = (data ?? errorResponseDefault('excluir'))

        showAlert({
          ...error,
          variant: 'error'
        });
        console.error(error.trace);
      });
  };

  useEffect(() => {
    if(!token) return
    loadContacts();
  }, []);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact
      }}>
      {children}
    </ContactsContext.Provider>
  );
}