export const addMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

export const getStatus = (expiresAt) => {
  if (!expiresAt) return "missing";

  const now = new Date();

  const expiryDate =
    expiresAt instanceof Date
      ? expiresAt
      : expiresAt.toDate
      ? expiresAt.toDate()
      : new Date(expiresAt);

  const diffDays =
    (expiryDate.getTime() - now.getTime()) /
    (1000 * 60 * 60 * 24);

  if (diffDays < 0) return "expired";
  if (diffDays <= 30) return "warning";
  return "ok";
};
