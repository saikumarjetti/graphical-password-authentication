import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import ImageGrid from "../components/ImageGrid";
import ImageCarousel from "../components/ImageCarousel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// export interface LoginProps {
//   onLogin: (username, password) => void;
// }
// interface ImagesData {
//   [category: string]: string[]; // Assuming each category maps to an array of strings
// }

function Login(props) {
  const [username, setUsername] = useState("sai");
  const [password] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [allImages, setAllImages] = useState({});
  const [categorys, setCategorys] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");

  useEffect(() => {
    console.log("long live mp");
    const fetchData = async () => {
      fetch(`https://server-two-rose.vercel.app/category`)
        .then((response) => response.json())
        .then((data) => {
          setCategorys(() => {
            return [...data["category"]];
          });
        });
    };
    fetchData();
  }, []);
  // const getCategorys = async () => {
  //   await fetch(`http://localhost:8000/category`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCategorys(() => {
  //         return [
  //           ...data,
  //           // "animals",
  //           // "flags",
  //           // "architecture",
  //           // "birds",
  //           // "food",
  //           // "cars",
  //           // "flowers",
  //         ];
  //       });
  //       // currentPage++;
  //     });
  // };
  const checkEmail = (e) => {
    // You can replace this with actual logic to check if the email exists in the database.
    // For now, we'll simulate it by checking if the email is "example@example.com".
    e.preventDefault();
    // fetch("http://localhost:8000/logingrid", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json, text/plain, */*",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //     setGridImages(() => {
    //       return [...res.imageList];
    //     });
    //   });
    setEmailExists(true);
    // if (username === "sai") {
    // } else {
    //   setEmailExists(false);
    // }
  };

  const handleSelectedImages = (item) => {
    // const regex = /(?:^|\/)([^/.]+)\.(?:png|jpg|gif)$/;
    // const match = regex.exec(item);
    // if (match) {
    //   console.log(match[1]); // "ldo1EhDfGteKi"
    // }
    console.log(item);
    setSelectedImages((p) => {
      const pre = [...p];
      // const l = Object.values(pre);
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
    // If the email exists, ask for the password
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
        console.log("login done");
      });
    if (emailExists) {
      // You can add validation logic here before calling onLogin.
      // eslint-disable-next-line react/prop-types
      props.onLogin(username, password);
    } else {
      // Handle the case where the email doesn't exist in your database.
      // You can display an error message or take appropriate action.
      alert("Email not found in the database.");
    }
    // await getCategorys();
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
        // currentPage++;
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
                {/* {console.log(imagesData[category])} */}
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
                    {/* <ImageGrid
                      selectedImages={selectedImages}
                      // setSelectedImages={setSelectImages}
                      handleSelectedImages={handleSelectedImages}
                      // key={category}
                      imageNames={allImages[categorySelected]}
                    /> */}
                    {selectedImages && (
                      <>
                        <h1>Selected images</h1>
                        {/* {Object.values(selectedImages).map((images)=>{
                    return ( */}
                        <div style={{ display: "flex" }}>
                          <ImageGrid
                            // selectedImages={selectedImages}
                            // setSelectedImages={setSelectImages}
                            // handleSelectedImages={handleSelectedImages}
                            showNumbers={true}
                            category={"selected images"}
                            imageNames={Object.values(selectedImages)}
                          ></ImageGrid>
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
