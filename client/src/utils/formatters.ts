export const formatETB = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) return "0 ETB";
  return new Intl.NumberFormat("en-US").format(amount) + " ETB";
};

export const formatETBMillions = (amount: number, lang: "en" | "am" = "en"): string => {
  if (!amount) return "0";
  const millions = (amount / 1000000).toFixed(2).replace(/\.00$/, "");
  return lang === "am" ? `${millions} ሚሊየን ብር` : `${millions}M ETB`;
};

export const formatKM = (km: number, lang: "en" | "am" = "en"): string => {
  if (!km) return lang === "am" ? "0 ኪ.ሜ (አዲስ)" : "0 km (Brand New)";
  return `${new Intl.NumberFormat("en-US").format(km)} ${lang === "am" ? "ኪ.ሜ" : "km"}`;
};
