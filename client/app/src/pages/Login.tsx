import NavBar from "../components/NavBar";
import { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";

export interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

function Login(props: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  const checkEmail = () => {
    // You can replace this with actual logic to check if the email exists in the database.
    // For now, we'll simulate it by checking if the email is "example@example.com".
    if (username === "sai") {
      setEmailExists(true);
    } else {
      setEmailExists(false);
    }
  };

  const handleLogin = () => {
    // If the email exists, ask for the password.
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
                <TextField
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="password"
                  autoComplete="=true"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleLogin}
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
