import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

export default function SignUp() {
  const [username, setUsername] = useState("sai");
  const [passwordLen, setPasswordLen] = useState(7);
  const [emailNotExists, setEmailNotExists] = useState(false);
  const [selectImages, setSelectImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [onNext, setOnNext] = useState({
    emailNotExists: false,
    selectImages: false,
  });
  const [categorys, setCategorys] = useState([]);
  const [imagesData, setimagesData] = useState({});
  const [categorySelected, setCategorySelected] = useState([]);

  const getCategorys = () => {
    fetch(`http://localhost:8000/category`)
      .then((response) => response.json())
      .then((data) => {
        setCategorys(() => {
          return [...data["category"]];
        });
        // currentPage++;
      });
  };
  const handleSelectedImages = (item) => {
    console.log(item);
    setSelectedImages((p) => {
      const pre = [...p];
      if (pre.includes(item)) {
        const keyToRemove = pre.indexOf(item);
        console.log(`${item} already present in list, so removing it now`);
        pre.splice(keyToRemove, 1);
        console.log("pre");
        console.log(pre);
        return [...pre];
      } else {
        pre.push(item);
        return [...pre];
      }
    });
  };

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);
  useEffect(() => {
    console.log(imagesData);
  }, [imagesData]);
  const getImagesForCategorysFromServer = async () => {
    categorySelected.forEach((category) => {
      fetch(`http://localhost:8000/images/${category}`)
        .then((response) => response.json())
        .then((data) => {
          setimagesData((pre) => {
            return {
              ...pre,
              [Object.keys(data)[0]]: Object.values(data)[0],
            };
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategorySelected(typeof value === "string" ? value.split(",") : value);
    console.log("On change");
    console.log(categorySelected);
  };

  const checkEmail = () => {
    if (username) {
      if (!emailNotExists) {
        setEmailNotExists(true);
      }
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

  const handleSignUp = (event) => {
    event.preventDefault();
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
              <div>
                <Typography>select {passwordLen} images </Typography>
                {categorySelected.map((category) => {
                  console.log(category);
                  return (
                    <ImageGrid
                      selectedImages={selectedImages}
                      handleSelectedImages={handleSelectedImages}
                      key={category}
                      category={category}
                      imageNames={imagesData[category]}
                    />
                  );
                })}
                {selectedImages && (
                  <>
                    <h1>Selected images</h1>
                    <ImageGrid
                      handleSelectedImages={handleSelectedImages}
                      category={"selected images"}
                      imageNames={Object.values(selectedImages)}
                      showNumbers={true}
                    ></ImageGrid>
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
              </div>
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
