export const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${monthName} ${day}, ${year} - ${hours}:${minutes}`;
};
