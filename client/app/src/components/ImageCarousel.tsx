import React, { useState, useRef } from "react";
import "./ImageCarousel.css"; // You may need to create a CSS file for styling

interface ImageCarouselProps {
  images?: string[]; // Array of image URLs
}
const images1 = [
  "uxq2Tfw6ESRXN.png",
  "uxq40s58vkvz5.png",
  "uxqBkCpiDeYEM.png",
  "uxqCsOqu78fNV.png",
  "uxqI3SVSPwIQU.png",
  "uxqTffVcdA3UN.png",
  "uxqU0DGDFRUYU.png",
  "uxqavvPuT7X35.png",
  "uxqgocXZKCOhK.png",
  "uxqho2yh0l5Ve.png",
  "uxqjMdMs9jn3F.png",
  "uxqjNAzEDD2Q8.png",
  "uxqjkcJkis51p.png",
  "uxqkXO2FzNz1f.png",
  "uxqntVuEmjg1t.png",
  "uxqoil2yveeXP.png",
  "uxqpJZFVghkKE.png",
  "uxqq6k9h5ORCJ.png",
  "uxqqSGsBmhtjr.png",
  "uxqt5LCVeoJJH.png",
  "uxqumK2CUbNa5.png",
];
const ImageCarousel: React.FC<ImageCarouselProps> = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartYRef = useRef(0);

  const handleImageClick = (index: number) => {
    console.log(index);
    setSelectedImageIndex(index);
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollPosition = container.scrollTop;
      const index = Math.round(scrollPosition / container.clientHeight);
      setSelectedImageIndex(index);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchEndY - touchStartYRef.current;
      container.scrollTop += deltaY;
      touchStartYRef.current = touchEndY;
    }
  };

  return (
    <div
      className="image-selector-container"
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      ref={containerRef}
    >
      {images1.map((imageUrl, index) => (
        <div
          key={index}
          className={`image-item ${
            index === selectedImageIndex ? "selected" : ""
          }`}
          onClick={() => handleImageClick(index)}
        >
          <img
            src={`http://127.0.0.1:8000/image/${imageUrl}`}
            alt={`Image ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
