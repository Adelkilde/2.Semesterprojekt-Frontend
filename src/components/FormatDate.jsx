export default function FormatDate({ dateString }) {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}
