import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { signupUser } from "../api/auth";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await signupUser(form);
    navigate("/login");
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="Name"
        name="name"
        fullWidth
        sx={{ mb: 2 }}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        sx={{ mb: 2 }}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        sx={{ mb: 2 }}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 1 }}>
        Sign Up
      </Button>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link component={RouterLink} to="/login">
            Log in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
