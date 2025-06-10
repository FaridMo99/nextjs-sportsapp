export default function getCurrentSeason() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  if (month < 10 || (month === 10 && day < 15)) {
    return year - 1;
  } else {
    return year;
  }
}
