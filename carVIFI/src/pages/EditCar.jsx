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
  const [error, setError] = useState("");

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
    
    if (!brand || !model || !plate) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="car-form-page">
    <h2>Edit Car ✏️</h2>

    {error && <p className="error">{error}</p>}

    <div className="image-upload-wrapper">
      <DragDrop image={image} setImage={setImage} preview={existingImage} />
    </div>

    <div className="car-form-fields">
      <input
        type="text"
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />

      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />

      <input
        type="text"
        placeholder="Plate"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
      />

      <button
        className="car-form-btn"
        onClick={handleUpdate}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  </div>
);
}

export default EditCar;
