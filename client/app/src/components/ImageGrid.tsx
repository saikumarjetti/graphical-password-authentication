import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export type ImageGridProps = {
  imageNames: string[];
  category: string;
  selectedImages?: object;
  setSelectedImages?: () => void;
  handleSelectedImages: (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    item: string
  ) => void;
};

export default function ImageGrid(props: ImageGridProps) {
  const data = props.selectedImages ? Object.values(props.selectedImages) : [];
  return (
    props.imageNames && (
      <>
        <p>{props.category}</p>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {props.imageNames.map((item) => (
            <ImageListItem
              key={item}
              sx={data.includes(item) ? { opacity: 0.3 } : null}
            >
              <img
                src={`http://localhost:8000/image/${item}`}
                onClick={(e) => {
                  return props.handleSelectedImages(e, item);
                }}
                alt={item}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </>
    )
  );
}
