import { useEffect, useState } from "react";
import { addCar, getUserCars } from "../services/firestore";
import { useAuth } from "../ctx/AuthContext";
import { uploadImage } from "../services/cloudinary";
import  DragDrop  from "../components/DragAndDrop";

function YourCars() {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");


  const loadCars = async () => {
    const data = await getUserCars(user.uid);
    setCars(data);
  };

  const handleAddCar = async () => {
    setError("");

    if (!brand) return setError("Car brand is required.");
    if (!model) return setError("Car model is required.");
    if (!plate) return setError("Car plate number is required.");
    if (!image) return setError("Car image is required.");

    let imageUrl = "";

    if (image) {
      imageUrl = await uploadImage(image);
    }

    await addCar(user.uid, {
      brand,
      model,
      plate,
      imageUrl,
    });

    setBrand("")
    setModel("")
    setPlate("")
    setImage(null)
    loadCars()
  };

  useEffect(() => {
    loadCars();
  }, []);



  return (
    
    <div style={{ padding: 24 }}>
        
      <h2>My Cars 🚗</h2>
      <DragDrop image={image} setImage={setImage} />
      {error && <p style={{ color: "red" }}>{error}</p>}
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
            {car.imageUrl && (
              <img
                src={car.imageUrl}
                alt="car"
                width={120}
                style={{ display: "block" }}
              />
            )}
            {car.brand} {car.model} ({car.plate})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YourCars;
