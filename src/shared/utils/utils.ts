export function dateFormatter(date: string) {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return newDate.toLocaleString('ru', options);
}

export const nameFormatter = (name: string) => {
  return name[0].toUpperCase() + name.slice(1);
};
