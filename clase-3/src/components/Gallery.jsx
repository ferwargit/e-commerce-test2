import logo from "../assets/react.svg";

function Gallery() {
  const images = [logo, logo, "https://picsum.photos/seed/picsum/200/300"];
  // The images array contains the paths to the images to be displayed in the gallery.
  return (
    <section
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Imagen ${index + 1}`}
          style={{ width: "150px", height: "150px" }}
        />
      ))}
    </section>
  );
}

export default Gallery;
