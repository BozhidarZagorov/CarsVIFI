import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../ctx/AuthContext";
import { getUserCars, updateCar } from "../services/firestore";
import { uploadImage } from "../services/cloudinary";
import DragDrop from "../components/DragAndDrop";

function EditCar() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCar = async () => {
      const cars = await getUserCars(user.uid);
      const car = cars.find(c => c.id === id);

      if (!car) {
        navigate("/cars");
        return;
      }

      setBrand(car.brand);
      setModel(car.model);
      setPlate(car.plate);
      setExistingImage(car.imageUrl);
    };

    loadCar();
  }, [id, user.uid, navigate]);

  const handleUpdate = async () => {
    if (loading) return;

    setLoading(true);

    let imageUrl = existingImage;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    await updateCar(user.uid, id, {
      brand,
      model,
      plate,
      imageUrl,
    });

    navigate("/cars");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Edit Car ✏️</h2>

      <DragDrop image={image} setImage={setImage} preview={existingImage} />

      <input
        value={brand}
        onChange={e => setBrand(e.target.value)}
        placeholder="Brand"
      />
      <input
        value={model}
        onChange={e => setModel(e.target.value)}
        placeholder="Model"
      />
      <input
        value={plate}
        onChange={e => setPlate(e.target.value)}
        placeholder="Plate"
      />

      <button onClick={handleUpdate} disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

export default EditCar;
