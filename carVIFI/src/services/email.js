import emailjs from "emailjs-com";

export const sendReminderEmail = async ({ to, carName, items }) => {
  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      to_email: to,
      car_name: carName,
      items: items.join(", "),
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};
