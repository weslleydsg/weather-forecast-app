export function formatWeekday(date = new Date()) {
  return date.toLocaleString('pt-br', { weekday: 'long' });
}
