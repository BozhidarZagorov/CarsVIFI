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
  <div className="renew-item">
    <div className="renew-row">
      <strong>{rule.label}</strong>
      <span className={`renew-status ${status}`}>
        {status}
      </span>

      <button
        className="btn btn-renew"
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
          className="btn btn-primary"
          disabled={!selectedDate}
          onClick={() => handleRenew(selectedDate)}
        >
          Confirm
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => setShowPicker(false)}
        >
          Cancel
        </button>
      </div>
    )}
  </div>
);

}

export default RenewalItem;
