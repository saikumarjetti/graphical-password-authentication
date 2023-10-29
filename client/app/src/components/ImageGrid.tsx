import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./ImageGrid.css"; // You may need to create a CSS file for styling
import { styled } from "@mui/system";

export type ImageGridProps = {
  imageNames: string[];
  category?: string;
  selectedImages?: object;
  setSelectedImages?: () => void;
  handleSelectedImages?: (item: string) => void;
  showNumbers?: boolean;
};
const MyComponent = styled(ImageListItem)({
  justifyContent: "center",
});

export default function ImageGrid(props: ImageGridProps) {
  const data = props.selectedImages ? Object.values(props.selectedImages) : [];
  return (
    props.imageNames && (
      <>
        {props.category && <p>{props.category}</p>}
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {props.imageNames.map((item, index) => (
            <MyComponent
              key={item}
              sx={data.includes(item) ? { opacity: 0.3 } : null}
            >
              <img
                src={item}
                onClick={() => {
                  if (props.handleSelectedImages)
                    return props.handleSelectedImages(item);
                }}
                alt={item}
                style={props.showNumbers ? { opacity: 0.2 } : { opacity: 1 }}
                loading="lazy"
              />
              {props.showNumbers && <div className="overlay">{index + 1}</div>}
            </MyComponent>
          ))}
        </ImageList>
      </>
    )
  );
}
