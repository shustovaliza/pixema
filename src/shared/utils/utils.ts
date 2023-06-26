export function urlFormatter(string: string) {
  return string.split(' ').join('-').toLowerCase();
}

export function dateFormatter(date: string) {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return newDate.toLocaleString('en-US', options);
}
