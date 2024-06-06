import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import apiHandler from "../utils/apiHandler";
import "./LoginPage.css";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";

function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { updateToken } = useContext(AuthContext);

  function handleChange(e) {
    setLoginForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await apiHandler.login(loginForm);
      updateToken(response.data.authToken);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Box sx={{ width: 300, mx: "auto", mt: 5 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h6" sx={{ mb: 2 }} className="typo">
        Se connecter
      </Typography>
      <form method="post" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Nom"
          name="userName"
          value={loginForm.userName}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Mot de passe"
          name="password"
          type="password"
          value={loginForm.password}
          onChange={handleChange}
          variant="outlined"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Se connecter
        </Button>
      </form>
    </Box>
  );
}

export default LoginPage;
