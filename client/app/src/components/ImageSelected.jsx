/* eslint-disable react/prop-types */
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./ImageGrid.css"; // You may need to create a CSS file for styling

export default function ImageGrid(props) {
  const data = props.selectedImages ? Object.values(props.selectedImages) : [];
  return (
    props.imageNames && (
      <>
        {props.category && <p>{props.category}</p>}
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {props.imageNames.map((item, index) => (
            <ImageListItem
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
                loading="lazy"
              />
              {props.showNumbers && <div className="overlay">{index + 1}</div>}
            </ImageListItem>
          ))}
        </ImageList>
      </>
    )
  );
}
