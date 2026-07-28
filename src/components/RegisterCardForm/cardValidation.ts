export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return (digits.match(/.{1,4}/g) || []).join(" ");
};

export const formatExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

export const formatCvc = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 3);
};

export const isValidCardNumber = (value: string): boolean => {
  const digits = value.replace(/\D/g, "");
  return digits.length === 16;
};

export const isValidCvc = (value: string): boolean => {
  return /^\d{3}$/.test(value);
};

export const isValidExpiry = (value: string): boolean => {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);

  if (!match) {
    return false;
  }

  const month = Number(match[1]);
  const year = Number(match[2]) + 2000;

  if (month < 1 || month > 12) {
    return false;
  }

  const now = new Date();
  const expiryEnd = new Date(year, month, 0, 23, 59, 59);

  return expiryEnd.getTime() >= now.getTime();
};