export const downloadCalendarReminder = ({ title, date }) => {
  const start = new Date(date);
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const format = (d) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0];

  const ics = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${format(start)}
DTEND:${format(end)}
DESCRIPTION:Carvifi reminder
END:VEVENT
END:VCALENDAR
`;

  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${title}.ics`;
  a.click();

  URL.revokeObjectURL(url);
};
