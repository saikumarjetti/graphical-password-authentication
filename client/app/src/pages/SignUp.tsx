import NavBar from "../components/NavBar";
import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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

function SignUp(props: SignUpProps) {
  const [username, setUsername] = useState("");
  const [passwordLen, setPasswordLen] = useState(5);
  const [emailExists, setEmailExists] = useState(false);
  const [categorys, setCategorys] = useState<string[]>([]);
  const [personName, setPersonName] = React.useState<string[]>([]);

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

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const checkEmail = () => {
    // You can replace this with actual logic to check if the email exists in the database.
    // For now, we'll simulate it by checking if the email is "example@example.com".
    if (username === "sai") {
      setEmailExists(true);
      getCategorys();
    } else {
      setEmailExists(false);
    }
  };

  const handleSignUp = () => {
    // If the email exists, ask for the password.
    if (emailExists) {
      // You can add validation logic here before calling onSignUp.
      props.onSignUp(username, passwordLen);
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
            SignUp
          </Typography>
          <form
            style={{ display: "flex", "flex-direction": "column", gap: "10px" }}
          >
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              autoComplete="true"
              variant="outlined"
              value={username}
              disabled={emailExists}
              required={true}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={checkEmail}
            />
            {emailExists && (
              <>
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
                  <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    label="Category"
                    value={personName}
                    onChange={handleChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
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
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSignUp}
                >
                  SignUp
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

export default SignUp;
