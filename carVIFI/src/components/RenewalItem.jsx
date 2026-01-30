import { useState } from "react";
import { RENEWAL_RULES } from "../utils/renewalRules";
import { addMonths, getStatus } from "../utils/dateUtils";
import { renewItem } from "../services/firestore";

function RenewalItem({ carId, itemKey, data, onRenew }) {
  const [showPicker, setShowPicker] = useState(false);

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
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <strong>{rule.label}</strong>{" "}
      <span>({status})</span>

      <button onClick={() => setShowPicker(!showPicker)}>
        Renewed
      </button>

      {showPicker && (
        <input
          type="date"
          onChange={(e) => handleRenew(e.target.value)}
        />
      )}
    </div>
  );
}

export default RenewalItem;
