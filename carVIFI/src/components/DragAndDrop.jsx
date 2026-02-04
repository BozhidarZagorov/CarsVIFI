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
      className="drag-drop-box"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="drag-drop-input"
        onChange={handleSelect}
      />

      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          className="drag-drop-preview"
        />
      ) : (
        <p className="drag-drop-text">
          Drag & drop car image here<br />
          <span>or click to upload</span>
        </p>
      )}
    </div>
  );
}

export default DragDrop;
