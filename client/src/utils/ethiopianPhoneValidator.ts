export const isValidEthiopianPhone = (phone: string): boolean => {
  if (!phone) return false;
  // Valid patterns: +2519..., +2517..., 09..., 07..., 2519..., 2517...
  const clean = phone.replace(/[\s-]/g, "");
  const regex = /^(\+251|251|0)(9|7)\d{8}$/;
  return regex.test(clean);
};

export const formatEthiopianPhone = (phone: string): string => {
  const clean = phone.replace(/[\s-]/g, "");
  if (clean.startsWith("0")) {
    return "+251-" + clean.substring(1, 3) + "-" + clean.substring(3, 6) + "-" + clean.substring(6);
  }
  if (clean.startsWith("+251")) {
    const num = clean.substring(4);
    return "+251-" + num.substring(0, 2) + "-" + num.substring(2, 5) + "-" + num.substring(5);
  }
  return phone;
};
