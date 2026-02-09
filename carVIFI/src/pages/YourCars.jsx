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
  const [deletingId, setDeletingId] = useState(null);


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
  <div className="cars-page">
    <div style={{ padding: 24 }}>
      <div className="cars-header">
        <h2 className="logo-cars">My Cars <img src="/car.png" alt="Carvifi" className="logo-imgcars" /></h2>

        <Link to="/cars/addcar">
          <button className="btn btn-primary">Add New Car</button>
        </Link>
      </div>


      {cars.length === 0 ? (
          <div className="empty-state">
            <p style={{ marginBottom: 16, fontSize: 18 }}>
              You have not added any cars yet
            </p>

            <Link to="/cars/addcar">
              <button className="btn btn-primary">
                Add Car
              </button>
            </Link>
          </div>
        ) : (
          cars.map((car) => (
            <div key={car.id} className="car-card">
              {/* LEFT SIDE */}
              <div className="car-info">
                <h3>{car.brand} {car.model} Plate:{car.plate}</h3>
          
                {Object.keys(RENEWAL_RULES).map((key) => (
                  <RenewalItem
                    key={key}
                    carId={car.id}
                    itemKey={key}
                    data={car[key]}
                    onRenew={loadCars}
                  />
                ))}

                <div className="car-actions">
                  <Link to={`/cars/edit/${car.id}`}>
                    <button className="btn btn-secondary">Edit</button>
                  </Link>
              
                  <button
                    className="btn btn-danger"
                    disabled={deletingId === car.id}
                    onClick={async () => {
                      if (deletingId) return;
                      if (!window.confirm("Are you sure you want to remove this car?")) return;
                    
                      try {
                        setDeletingId(car.id);
                        await deleteCar(user.uid, car.id);
                        await loadCars();
                      } finally {
                        setDeletingId(null);
                      }
                    }}
                  >
                    {deletingId === car.id ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
                  
              {/* RIGHT SIDE */}
              <img
                src={car.imageUrl || "/car-placeholder.png"}
                alt="car"
                className="car-image"
              />
            </div>
          ))
        )}

      

    </div>
</div>
  );
}

export default YourCars;
