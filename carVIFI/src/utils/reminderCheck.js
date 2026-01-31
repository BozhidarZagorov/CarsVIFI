import { sendReminderEmail } from "../services/email";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

const DAYS_BEFORE = 30;

export const checkAndSendReminders = async (user, cars) => {
  const now = new Date();

  for (const car of cars) {
    const expiringItems = [];

    for (const [key, value] of Object.entries(car)) {
      if (!value?.expiresAt) continue;

      const expiresAt = value.expiresAt.toDate();
      const diffDays = (expiresAt - now) / (1000 * 60 * 60 * 24);

      const alreadyNotified =
        value.lastNotifiedAt &&
        (now - value.lastNotifiedAt.toDate()) <
          1000 * 60 * 60 * 24 * 7; // 7-day cooldown

      if (diffDays <= DAYS_BEFORE && diffDays > 0 && !alreadyNotified) {
        expiringItems.push(key);
      }
    }

    if (expiringItems.length > 0) {
      await sendReminderEmail({
        to: user.email,
        carName: `${car.brand} ${car.model}`,
        items: expiringItems,
      });

      // update lastNotifiedAt
      const ref = doc(db, "cars", car.id);
      const updates = {};

      expiringItems.forEach((key) => {
        updates[`${key}.lastNotifiedAt`] = new Date();
      });

      await updateDoc(ref, updates);
    }
  }
};
