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

  const expiresAt = data?.expiresAt
    ? new Date(data.expiresAt.seconds * 1000)
    : null;

  const handleRenew = async (date) => {
    const newExpiresAt = addMonths(date, rule.months);

    await renewItem(carId, itemKey, {
      lastRenewed: date,
      expiresAt: newExpiresAt,
    });

    setShowPicker(false);
    onRenew();

    downloadCalendarReminder({
      title: `${rule.label} expires`,
      date: newExpiresAt,
    });
  };

 return (
    <div className="renew-item">
      <div className="renew-row">
        <strong className="renew-label">{rule.label}</strong>

        <span className={`renew-status ${status}`}>
          {expiresAt ? expiresAt.toLocaleDateString() : "-"} | {status}
        </span>

        <button
          className="btn-renew"
          onClick={() => setShowPicker(!showPicker)}
        >
          Renew
        </button>
      </div>

      {showPicker && (
        <div className="renew-picker">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            className="btn-renew"
            disabled={!selectedDate}
            onClick={() => handleRenew(selectedDate)}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}
export default RenewalItem;
