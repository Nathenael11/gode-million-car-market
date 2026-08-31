// Approximate Ethiopian (Ge'ez) Calendar conversion for display
export const toEthiopianDateString = (gregorianDate: Date | string): string => {
  const d = new Date(gregorianDate);
  if (isNaN(d.getTime())) return "";

  const ethMonths = [
    "መስከረም", "ጥቅምት", "ኅዳር", "ታኅሣሥ", "ጥር", "የካቲት",
    "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"
  ];

  // Ethiopian calendar is ~7 to 8 years behind Gregorian
  const gYear = d.getFullYear();
  const gMonth = d.getMonth() + 1; // 1-12
  const gDay = d.getDate();

  let ethYear = gYear - 8;
  if (gMonth > 9 || (gMonth === 9 && gDay >= 11)) {
    ethYear = gYear - 7;
  }

  // Approximate current Ethiopian month
  let ethMonthIdx = (gMonth + 3) % 12;
  let ethDay = ((gDay + 20) % 30) || 1;

  return `${ethMonths[ethMonthIdx]} ${ethDay} ቀን ${ethYear} ዓ.ም`;
};
