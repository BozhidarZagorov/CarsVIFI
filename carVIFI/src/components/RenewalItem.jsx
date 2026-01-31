import { useState } from "react";
import { RENEWAL_RULES } from "../utils/renewalRules";
import { addMonths, getStatus } from "../utils/dateUtils";
import { renewItem } from "../services/firestore";
import { downloadCalendarReminder } from "../utils/calendar";

function RenewalItem({ carId, itemKey, data, onRenew }) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");


  const rule = RENEWAL_RULES[itemKey];
  const status = getStatus(data?.expiresAt);

  const handleRenew = async (date) => {
    const expiresAt = addMonths(date, rule.months);

    await renewItem(carId, itemKey, {
      lastRenewed: date,
      expiresAt,
    });

    setShowPicker(false);
    onRenew();

    downloadCalendarReminder({
      title: `${rule.label} expires`,
      date: expiresAt,
    });
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <strong>{rule.label}</strong>{" "}
      <span>({status})</span>

      <button onClick={() => setShowPicker(!showPicker)}>
        Renewed
      </button>

      {showPicker && (
        <div style={{ marginTop: 8 }}>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <button
            disabled={!selectedDate}
            onClick={() => handleRenew(selectedDate)}
          >
            Confirm
          </button>

          <button onClick={() => setShowPicker(false)}>
            Cancel
          </button>
        </div>
      )}

    </div>
  );
}

export default RenewalItem;
