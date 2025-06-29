/**
 * Formata um telefone para o padrão (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export function formatPhone(phone: string | number): string {
  const digits = String(phone).replace(/\D/g, '').slice(0, 11);

  if (digits.length === 11) {
    // Celular: (99) 99999-9999
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (digits.length === 10) {
    // Fixo: (99) 9999-9999
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return digits;
}

/**
 * Remove qualquer formatação do telefone, deixando apenas os números
 */
export function unformatPhone(phone: string | number): string {
  return String(phone).replace(/\D/g, '');
}
