export default class ContactValidator {
  contact: string;
  #phone = true;

  constructor(contact: string, phone: boolean = true) {
    this.contact = contact.trim()
    this.#phone = phone
  }

  isEmail(): boolean {
    // Regex simples para validação do e-mail
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.contact);
  }

  isPhone(): boolean {
    // Aceita formatos com ou sem DDD, com ou sem máscara
    return /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/.test(this.contact);
  }

  isValid(): boolean {
    return this.#phone ? this.isPhone() : this.isEmail();
  }
}
