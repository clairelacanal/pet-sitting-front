import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../utils/apiHandler";
import "./SignupPage.css";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";

function SignupPage() {
  const [signupForm, setSignupForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setSignupForm((form) => ({ ...form, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await apiHandler.signup(signupForm);
      navigate("/connexion");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Box sx={{ width: 300, mx: "auto", mt: 5 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h6" sx={{ mb: 2 }} className="typo">
        Se créer un compte
      </Typography>
      <form onSubmit={handleSubmit} className="signup">
        <TextField
          fullWidth
          margin="normal"
          label="Nom"
          name="userName"
          value={signupForm.userName}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={signupForm.email}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Mot de passe"
          name="password"
          type="password"
          value={signupForm.password}
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
          Créer mon compte
        </Button>
      </form>
    </Box>
  );
}

export default SignupPage;
