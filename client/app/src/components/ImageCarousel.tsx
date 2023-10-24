import React, { useRef } from "react";
import "./ImageCarousel.css"; // You may need to create a CSS file for styling

interface ImageCarouselProps {
  images: string[]; // Array of image URLs
  imageNames?: string[];
  category?: string;
  selectedImages?: object;
  setSelectedImages?: () => void;
  handleSelectedImages: (item: string) => void;
}
// const images1 = [
//   "uxq2Tfw6ESRXN.png",
//   "uxq40s58vkvz5.png",
//   "uxqBkCpiDeYEM.png",
//   "uxqCsOqu78fNV.png",
//   "uxqI3SVSPwIQU.png",
//   "uxqTffVcdA3UN.png",
//   "uxqU0DGDFRUYU.png",
//   "uxqavvPuT7X35.png",
//   "uxqgocXZKCOhK.png",
//   "uxqho2yh0l5Ve.png",
//   "uxqjMdMs9jn3F.png",
//   "uxqjNAzEDD2Q8.png",
//   "uxqjkcJkis51p.png",
//   "uxqkXO2FzNz1f.png",
//   "uxqntVuEmjg1t.png",
//   "uxqoil2yveeXP.png",
//   "uxqpJZFVghkKE.png",
//   "uxqq6k9h5ORCJ.png",
//   "uxqqSGsBmhtjr.png",
//   "uxqt5LCVeoJJH.png",
//   "uxqumK2CUbNa5.png",
// ];
const ImageCarousel: React.FC<ImageCarouselProps> = (
  props: ImageCarouselProps
) => {
  // const [selectedImageIndex, setSelectedImageIndex] = useState<number>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  // const touchStartYRef = useRef(0);
  const data = props.selectedImages ? Object.values(props.selectedImages) : [];

  const handleImageClick = (imageUrl: string) => {
    // console.log(index);
    // setSelectedImageIndex(index as number);
    props.handleSelectedImages(imageUrl);
  };

  // const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
  //   touchStartYRef.current = e.touches[0].clientY;
  //   console.log(e);
  //   console.log("handleTouchStart");
  // };

  // const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
  //   if (containerRef.current) {
  //     const container = containerRef.current;
  //     const touchEndY = e.touches[0].clientY;
  //     const deltaY = touchEndY - touchStartYRef.current;
  //     container.scrollTop += deltaY;
  //     touchStartYRef.current = touchEndY;
  //   }
  //   console.log(e);
  //   console.log("handleTouchMove");
  // };

  console.log("mp needs food");
  console.log(props);
  return (
    <div
      className="image-selector-container"
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      ref={containerRef}
    >
      {props.images &&
        props.images.map((imageUrl, index) => (
          <div
            key={index}
            className={`image-item ${
              data.includes(imageUrl) ? "selected" : ""
            }`}
            onClick={() => handleImageClick(imageUrl)}
          >
            <img src={imageUrl} alt={`Image ${index + 1}`} />
          </div>
        ))}
    </div>
  );
};

export default ImageCarousel;
