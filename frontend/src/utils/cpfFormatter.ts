/**
 * Formata um CPF para o padrão xxx.xxx.xxx-xx
 */
export function formatCpf(cpf: string | number): string {
  const digits = String(cpf).replace(/\D/g, '').slice(0, 11);
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, function(_, a, b, c, d) {
    return d ? `${a}.${b}.${c}-${d}` : `${a}.${b}.${c}`;
  });
}

/**
 * Remove qualquer formatação do CPF, deixando apenas os números
 */
export function unformatCpf(cpf: string | number): string {
  return String(cpf).replace(/\D/g, '')
}