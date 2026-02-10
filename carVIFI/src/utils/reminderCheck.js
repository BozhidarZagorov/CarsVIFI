import { sendReminderEmail } from "../services/email";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

const DAYS_BEFORE = 30;
const EXPIRED_COOLDOWN_DAYS = 3;

export const checkAndSendReminders = async (user, cars) => {
  const now = new Date();

  for (const car of cars) {
    const expiringItems = [];
    const expiredItems = [];

    for (const [key, value] of Object.entries(car)) {
      if (!value?.expiresAt) continue;

      const expiresAt = value.expiresAt.toDate();
      const diffDays = (expiresAt - now) / (1000 * 60 * 60 * 24);

      const alreadyNotified =
        value.lastNotifiedAt &&
        now - value.lastNotifiedAt.toDate() <
          1000 * 60 * 60 * 24 * 7;

      const expiredNotified =
        value.expiredNotifiedAt &&
        now - value.expiredNotifiedAt.toDate() <
          1000 * 60 * 60 * 24 * EXPIRED_COOLDOWN_DAYS;

      if (diffDays <= 0 && !expiredNotified) {
        expiredItems.push(key);
      } else if (diffDays <= DAYS_BEFORE && !alreadyNotified) {
        expiringItems.push(key);
      }
    }

    if (expiringItems.length > 0) {
      await sendReminderEmail({
        to: user.email,
        carName: `${car.brand} ${car.model}`,
        items: expiringItems,
        type: "expiring",
      });
    }

    if (expiredItems.length > 0) {
      await sendReminderEmail({
        to: user.email,
        carName: `${car.brand} ${car.model}`,
        items: expiredItems,
        type: "expired",
      });
    }

    if (expiringItems.length > 0 || expiredItems.length > 0) {
      const ref = doc(db, "cars", car.id);
      const updates = {};

      expiringItems.forEach((key) => {
        updates[`${key}.lastNotifiedAt`] = new Date();
      });

      expiredItems.forEach((key) => {
        updates[`${key}.expiredNotifiedAt`] = new Date();
      });

      await updateDoc(ref, updates);
    }
  }
};
