/* eslint-disable @typescript-eslint/no-unused-vars */
import NavBar from "../components/NavBar";
import { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import ImageGrid from "../components/ImageGrid";

export interface LoginProps {
  onLogin: (username: string, password: string) => void;
}
interface SelectedImages {
  [key: string]: string;
}

function Login(props: LoginProps) {
  const [username, setUsername] = useState("");
  const [password] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [gridImages, setGridImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<SelectedImages>({});

  const checkEmail = (e: { preventDefault: () => void }) => {
    // You can replace this with actual logic to check if the email exists in the database.
    // For now, we'll simulate it by checking if the email is "example@example.com".
    e.preventDefault();
    fetch("http://localhost:8000/logingrid", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setGridImages(() => {
          return [...res.imageList];
        });
      });
    setEmailExists(true);
    // if (username === "sai") {
    // } else {
    //   setEmailExists(false);
    // }
  };

  const handleSelectedImages = (item: string) => {
    console.log(item);
    const l = Object.values(selectedImages);
    if (l.includes(item)) {
      console.log(`${item} already present in list, so removing it now`);
      setSelectedImages(() => {
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

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>): void => {
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
      props.onLogin(username, password);
    } else {
      // Handle the case where the email doesn't exist in your database.
      // You can display an error message or take appropriate action.
      alert("Email not found in the database.");
    }
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
              onChange={(e) => setUsername(e.target.value)}
              onBlur={checkEmail}
            />
            {emailExists && (
              <>
                <ImageGrid
                  selectedImages={selectedImages}
                  // setSelectedImages={setSelectImages}
                  handleSelectedImages={handleSelectedImages}
                  // key={category}
                  imageNames={gridImages}
                ></ImageGrid>
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
