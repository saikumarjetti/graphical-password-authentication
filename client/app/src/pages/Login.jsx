import NavBar from "../components/NavBar";
import { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import ImageGrid from "../components/ImageGrid";
import ImageCarousel from "../components/ImageCarousel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("sai");
  const [emailExists, setEmailExists] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [allImages, setAllImages] = useState({});
  const [categorys, setCategorys] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");
  const navigateTo = useNavigate();

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
  const checkEmail = (e) => {
    e.preventDefault();

    setEmailExists(true);
    getCategorys();
  };

  const handleSelectedImages = async (item) => {
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
  const handleLogin = async (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        selectedImages: selectedImages,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res["token"]) {
          console.log("login done");
          navigateTo("/dashboard");
        } else {
          console.log("login failed");
        }
      });
  };
  const handleChangeCategoty = async (event) => {
    console.log(event.target.value);
    setCategorySelected(event.target.value);

    await fetch(`http://localhost:8000/images/${event.target.value}`)
      .then((response) => response.json())
      .then((data) => {
        setAllImages((pre) => {
          return {
            ...pre,
            [Object.keys(data)[0]]: Object.values(data)[0],
          };
        });
      });
  };
  return (
    <>
      <NavBar></NavBar>
      <Container maxWidth="xs">
        <div>
          <Typography variant="h4" align="center">
            Login
          </Typography>
          <form>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              autoComplete="true"
              variant="outlined"
              value={username}
              required={true}
              disabled={emailExists}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={checkEmail}
            />
            {emailExists && (
              <>
                <FormControl fullWidth>
                  <InputLabel id="select1">Category</InputLabel>
                  <Select
                    labelId="select1"
                    id="simple-select"
                    value={categorySelected}
                    label="Category"
                    onChange={handleChangeCategoty}
                  >
                    {categorys.map((cat) => {
                      return (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {categorySelected && (
                  <>
                    <h1>{categorySelected}</h1>
                    <ImageCarousel
                      images={allImages[categorySelected]}
                      handleSelectedImages={handleSelectedImages}
                      selectedImages={selectedImages}
                    />
                    <br />
                    <h1>{categorySelected}</h1>
                    {selectedImages && (
                      <>
                        <h1>Selected images</h1>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <ImageGrid
                            sx={{}}
                            showNumbers={true}
                            imageNames={Object.values(selectedImages)}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={(e) => handleLogin(e)}
                >
                  Login
                </Button>
              </>
            )}
            {!emailExists && (
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

export default Login;
