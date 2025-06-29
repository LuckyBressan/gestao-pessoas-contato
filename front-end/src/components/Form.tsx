import type { JSX } from "react";
import PeopleForm, { type PeopleFormProps } from "./people/PeopleForm";
import ContactsForm, { type ContactsFormProps } from "./contacts/ContactsForm";

export interface FormProps {
    contact?: boolean;
    person ?: boolean;
    props  ?: PeopleFormProps|ContactsFormProps
    children?: JSX.Element;
}

export default function Form({
    contact = false,
    person  = false,
    props,
    children
} : FormProps) {
    if(contact) {
        return (
            <ContactsForm {...props as ContactsFormProps} />
        )
    }
    if(person) {
        return (
            <PeopleForm {...props as PeopleFormProps}/>
        )
    }

    return (
        <form>
            {children}
        </form>
    )
};
