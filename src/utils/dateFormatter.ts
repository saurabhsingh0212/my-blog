const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (dateValue: string) => {
  const fullDate = new Date(dateValue);
  const year = fullDate.getFullYear();
  const month = MONTHS[fullDate.getMonth()];
  const day = fullDate.getDate();

  return `${month} ${day}, ${year}`;
};
