/**
 * Formata uma data ISO (2005-01-15T02:00:00.000Z) para o formato DD/MM/YYYY usando toLocaleDateString
 * @param dataISO Data no formato ISO 8601
 * @returns Data formatada como DD/MM/YYYY
 */
export function formatarData(dataISO: string | Date): string {
  const date = new Date(dataISO);

  // Verificar se a data é válida
  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  return date.toLocaleDateString("pt-BR");
}

/**
 * Formata uma data ISO com hora e minuto (DD/MM/YYYY HH:mm) usando toLocaleString
 * @param dataISO Data no formato ISO 8601
 * @returns Data e hora formatadas
 */
export function formatarDataComHora(dataISO: string | Date): string {
  const date = new Date(dataISO);

  // Verificar se a data é válida
  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  return date.toLocaleString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Formata apenas a hora (HH:mm:ss) usando toLocaleTimeString
 * @param dataISO Data no formato ISO 8601
 * @returns Hora formatada
 */
export function formatarHora(dataISO: string | Date): string {
  const date = new Date(dataISO);

  // Verificar se a data é válida
  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  return date.toLocaleTimeString("pt-BR");
}
