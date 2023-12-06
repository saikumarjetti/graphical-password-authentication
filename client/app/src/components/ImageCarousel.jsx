/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from "react";
import "./ImageCarousel.css";

const ImageCarousel = (props) => {
  const myRef = useRef();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const data = props.selectedImages ? Object.values(props.selectedImages) : [];

  const handleImageClick = (action) => {
    if (action === "previous" && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (
      action === "next" &&
      currentImageIndex < props.images.length - 1
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleMouseWheel = (e) => {
    if (e.deltaY > 0 && currentImageIndex < props.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1); // Scroll down
    } else if (e.deltaY < 0 && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1); // Scroll up
    }
  };

  useEffect(() => {
    const container = myRef.current;
    container.addEventListener("wheel", handleMouseWheel);

    return () => {
      container.removeEventListener("wheel", handleMouseWheel);
    };
  }, [currentImageIndex]);

  return (
    <>
      <h1>sai</h1>
      <button type="button" onClick={() => handleImageClick("previous")}>
        Previous
      </button>
      <button type="button" onClick={() => handleImageClick("next")}>
        Next
      </button>
      <div className="image-selector-container" ref={myRef}>
        {props.images &&
          props.images.map((imageUrl, index) => (
            <div
              key={index}
              className={`image-item ${
                data.includes(imageUrl) ? "selected" : ""
              }`}
              onClick={() => props.handleSelectedImages(imageUrl)}
              style={{
                display: index === currentImageIndex ? "block" : "none",
              }}
            >
              <img
                src={`http://localhost:8000/image/${imageUrl}`}
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default ImageCarousel;
