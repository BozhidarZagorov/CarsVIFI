import { useRef } from "react";

function DragDrop({ image, setImage }) {
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const handleSelect = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      style={{
        border: "2px dashed #aaa",
        padding: 20,
        textAlign: "center",
        cursor: "pointer",
        marginBottom: 16,
        background: "#fff",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleSelect}
      />

      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          width={180}
        />
      ) : (
        <p>Drag & drop car image here or click to upload</p>
      )}
    </div>
  );
}

export default DragDrop;
