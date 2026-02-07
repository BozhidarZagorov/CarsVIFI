import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCar } from "../services/firestore";
import { uploadImage } from "../services/cloudinary";
import { useAuth } from "../ctx/AuthContext";
import DragDrop from "../components/DragAndDrop";

function AddCar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCar = async () => {
    if (loading) return;

    setError("");

    if (!brand) return setError("Car brand is required.");
    if (!model) return setError("Car model is required.");
    if (!plate) return setError("Car plate number is required.");
    if (!image) return setError("Car image is required.");

    try {
      setLoading(true);

      const imageUrl = await uploadImage(image);

      await addCar(user.uid, {
        brand,
        model,
        plate,
        imageUrl,
      });

      navigate("/cars"); // go back to list
    } catch (err) {
      setError("Failed to add car.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="car-form-wraper">
    <div className="car-form-page">
      <h2 className="logo-addcar">Add Car <img src="/car.png" alt="Carvifi" className="logo-imgaddcar" /></h2>
      
      {error && <p className="error">{error}</p>}
      
      <div className="image-upload-wrapper">
        <DragDrop image={image} setImage={setImage} />
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
          onClick={handleAddCar}
          disabled={loading}
          >
          {loading ? "Saving..." : "Add Car"}
        </button>
      </div>
    </div>
  </div>

  );
}
export default AddCar;
