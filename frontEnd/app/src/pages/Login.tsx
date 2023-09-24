import NavBar from "../components/NavBar";
import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";

export interface LoginProps {
  onLogin: (username: string, password: string) => void;
}
function Login(props: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    // You can add validation logic here before calling onLogin
    props.onLogin(username, password);
  };

  return (
    <>
      <NavBar></NavBar>;
      <Container maxWidth="xs">
        <div>
          <Typography variant="h4" align="center">
            Login
          </Typography>
          <form>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
export default Login;
