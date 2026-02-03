import { useEffect, useState } from "react";
import { getUserCars, deleteCar } from "../services/firestore";
import { useAuth } from "../ctx/AuthContext";
import RenewalItem from "../components/RenewalItem";
import { RENEWAL_RULES } from "../utils/renewalRules";
import { checkAndSendReminders } from "../utils/reminderCheck";
import { Link } from "react-router-dom";

function YourCars() {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);

  const loadCars = async () => {
    const data = await getUserCars(user.uid);
    setCars(data);
  };

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      checkAndSendReminders(user, cars);
    }
  }, [cars]);

  return (
    <div style={{ padding: 24 }}>
      <div className="cars-header">
        <h2>My Cars 🚗</h2>

        <Link to="/cars/addcar">
          <button>Add New Car</button>
        </Link>
      </div>


      {cars.map((car) => (
        <div
          key={car.id}
          className="car-card"
        >
          {/* LEFT SIDE */}
          <div className="car-info">
            <h3>{car.brand} {car.model}</h3>

            {Object.keys(RENEWAL_RULES).map((key) => (
              <RenewalItem
                key={key}
                carId={car.id}
                itemKey={key}
                data={car[key]}
                onRenew={loadCars}
              />
            ))}
            <Link to={`/cars/edit/${car.id}`}>
              <button>Edit</button>
            </Link>

            <button onClick={async () => {
                if (!window.confirm("Are you sure you want to remove this car?")) return;
                await deleteCar(user.uid, car.id);
                loadCars();
              }}>
                Remove this car
            </button>


          </div>
          
          {/* RIGHT SIDE */}
          <img
            src={car.imageUrl}
            alt="car"
            className="car-image"
          />
        </div>
      ))}
      

    </div>
  );
}

export default YourCars;
