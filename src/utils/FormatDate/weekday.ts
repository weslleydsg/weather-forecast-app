export function formatWeekday(language: string, date = new Date()) {
  return Intl.DateTimeFormat(language, { weekday: 'long' }).format(date);
}
