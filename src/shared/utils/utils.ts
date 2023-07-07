export function dateFormatter(date: string) {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return newDate.toLocaleString('en-US', options);
}

export const isItOnTheMainPage = () => {
  return (
    window.location.pathname === '/' ||
    window.location.pathname.includes('?page=')
  );
};
