import { useEffect, useState } from "react";
import { addCar, getUserCars } from "../services/firestore";
import { useAuth } from "../ctx/AuthContext";

function YourCars() {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");

  const loadCars = async () => {
    const data = await getUserCars(user.uid);
    setCars(data);
  };

  const handleAddCar = async () => {
    await addCar(user.uid, {
      brand,
      model,
      plate,
    });

    setBrand("");
    setModel("");
    setPlate("");
    loadCars();
  };

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>My Cars 🚗</h2>

      <input
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <input
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <input
        placeholder="Plate"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
      />

      <button onClick={handleAddCar}>Add Car</button>

      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.brand} {car.model} ({car.plate})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YourCars;
