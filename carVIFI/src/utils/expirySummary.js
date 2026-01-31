export const getExpirySummary = (cars) => {
  const now = new Date();

  let expiringSoon = 0;
  let expired = 0;

  cars.forEach((car) => {
    Object.values(car).forEach((item) => {
      if (!item?.expiresAt) return;

      const expiresAt = item.expiresAt.toDate();
      const diffDays = (expiresAt - now) / (1000 * 60 * 60 * 24);

      if (diffDays < 0) expired++;
      else if (diffDays <= 30) expiringSoon++;
    });
  });

  return { expiringSoon, expired };
};
