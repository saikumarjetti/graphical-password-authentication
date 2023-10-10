import NavBar from "../components/NavBar";
import React, { useRef, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ImageGrid from "../components/ImageGrid";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export interface SignUpProps {
  onSignUp: (username: string, passwordLen: number) => void;
}
export interface OnNextType {
  emailNotExists: boolean;
  selectImages: boolean;
}
interface ImagesData {
  [category: string]: string[]; // Assuming each category maps to an array of strings
}

function SignUp(props: SignUpProps) {
  const [username, setUsername] = useState("sai");
  const [passwordLen, setPasswordLen] = useState(5);
  const [emailNotExists, setEmailNotExists] = useState(false);
  const [selectImages, setSelectImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState({});

  const [onNext, setOnNext] = useState<OnNextType>({
    emailNotExists: false,
    selectImages: false,
  });
  const [categorys, setCategorys] = useState<string[]>([]);
  const [imagesData, setimagesData] = useState<ImagesData>({});

  const [categorySelected, setCategorySelected] = useState<string[]>(["food"]);

  const getCategorys = () => {
    setCategorys(() => {
      return [
        "animals",
        "flags",
        "architecture",
        "birds",
        "food",
        "cars",
        "flowers",
      ];
    });
  };
  const handleSelectedImages = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    item: string
  ) => {
    console.log(item);
    const l = Object.values(selectedImages);
    if (l.includes(item)) {
      console.log(`${item} already present in list, so removing it now`);
      setSelectImages((pre) => {
        let keyToRemove = "0";
        for (const i in selectedImages) {
          if (selectedImages[i] === item) {
            keyToRemove = i;
          }
        }
        delete selectedImages[keyToRemove];
        return selectedImages;
      });
    } else {
      setSelectedImages((pre) => {
        return { ...pre, [l.length]: item };
      });
    }
    console.log(selectedImages);
  };
  const getImagesForCategorysFromServer = async () => {
    // let currentPage = 1;
    // const perPage = 10;
    categorySelected.forEach((category: string) => {
      // fetch(`/images/${category}?page=${currentPage}&perPage=${perPage}`)
      fetch(`http://localhost:8000/images/${category}`)
        .then((response) => response.json())
        .then((data) => {
          setimagesData((pre) => {
            return { ...pre, [Object.keys(data)[0]]: Object.values(data)[0] };
          });
          // currentPage++;
        });
    });
  };

  const handleSelectImages = async () => {
    await getImagesForCategorysFromServer();
    setSelectImages(!selectImages);
    setOnNext((pre) => {
      return {
        ...pre,
        selectImages: !onNext.selectImages,
      };
    });
  };

  const handleChange = (event: SelectChangeEvent<typeof categorySelected>) => {
    const {
      target: { value },
    } = event;
    setCategorySelected(typeof value === "string" ? value.split(",") : value);
    console.log("On change");
    console.log(categorySelected);
  };

  const checkEmail = () => {
    // You can replace this with actual logic to check if the email exists in the database.
    // For now, we'll simulate it by checking if the email is "example@example.com".
    if (username) {
      setEmailNotExists(true);
      setOnNext((pre) => {
        return { ...pre, emailNotExists: true };
      });
      getCategorys();
    } else {
      setEmailNotExists(false);
      setOnNext((pre) => {
        return { ...pre, emailNotExists: true };
      });
    }
  };

  const handleSignUp = (event: React.FormEvent<HTMLInputElement>): void => {
    event.preventDefault();

    // If the email exists, ask for the password.
    // if (emailNotExists) {
    //   // You can add validation logic here before calling onSignUp.
    //   props.onSignUp(username, passwordLen);
    // } else {
    //   // Handle the case where the email doesn't exist in your database.
    //   // You can display an error message or take appropriate action.
    //   alert("Email not found in the database.");
    // }
    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        passwordLen,
        imageList: selectedImages,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <>
      <NavBar></NavBar>
      <Container maxWidth="xs">
        <div>
          <Typography variant="h4" align="center">
            SignUp
          </Typography>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {!onNext.selectImages && (
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                autoComplete="true"
                variant="outlined"
                value={username}
                disabled={onNext.emailNotExists}
                required={true}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={checkEmail}
              />
            )}
            {onNext.emailNotExists && !onNext.selectImages && (
              <>
                <Typography sx={{ padding: 1 }} variant="body1">
                  How many images you want to have as password. Min is 5 😅
                </Typography>
                <TextField
                  label="Password Length"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="number"
                  autoComplete="true"
                  required={true}
                  InputProps={{ inputProps: { min: 5, max: 25 } }}
                  value={passwordLen}
                  // converting the input value to a number using parseInt with base 10.
                  onChange={(e) => setPasswordLen(parseInt(e.target.value, 10))}
                />
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-multiple-chip-label">
                    Categorys
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    label="Category"
                    value={categorySelected}
                    onChange={handleChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Categorys"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {categorys.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSelectImages}
                >
                  Next
                </Button>
              </>
            )}
            {onNext.selectImages && (
              <>
                <Typography>select {passwordLen} images </Typography>
                {categorySelected.map((category: string) => {
                  // const imageNames = imagesData[category];
                  console.log(category);
                  return (
                    <ImageGrid
                      selectedImages={selectedImages}
                      // setSelectedImages={setSelectImages}
                      handleSelectedImages={handleSelectedImages}
                      key={category}
                      category={category}
                      imageNames={imagesData[category]}
                    ></ImageGrid>
                  );
                })}
                {selectedImages && (
                  <>
                    <h1>Selected images</h1>
                    {/* {Object.values(selectedImages).map((images)=>{
                    return ( */}
                    <>
                      <ImageGrid
                        // selectedImages={selectedImages}
                        // setSelectedImages={setSelectImages}
                        handleSelectedImages={handleSelectedImages}
                        category={"selected images"}
                        imageNames={Object.values(selectedImages)}
                      ></ImageGrid>
                    </>
                    {/* ); */}
                    {/* })} */}
                  </>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </>
            )}
            {!onNext.emailNotExists && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={checkEmail}
              >
                Next
              </Button>
            )}
          </form>
        </div>
      </Container>
    </>
  );
}

export default SignUp;
