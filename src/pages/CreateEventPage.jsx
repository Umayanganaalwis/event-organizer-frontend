import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/events";
import dayjs from "dayjs";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CreateEventPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
  });

  const [dateTime, setDateTime] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!dateTime) return alert("Please select a date and time.");

    const eventData = {
      ...form,
      datetime: dayjs(dateTime).toISOString(),
    };

    await createEvent(eventData);
    navigate("/");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New Event
      </Typography>

      <TextField
        label="Event Name"
        name="name"
        fullWidth
        sx={{ mb: 2 }}
        onChange={handleChange}
      />

      <TextField
        label="Description"
        name="description"
        multiline
        rows={4}
        fullWidth
        sx={{ mb: 2 }}
        onChange={handleChange}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ mb: 2 }}>
          <DateTimePicker
            label="Date & Time"
            value={dateTime}
            onChange={(newValue) => setDateTime(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
            sx={{ width: '100%' }}
          />
        </Box>
      </LocalizationProvider>

      <TextField
        label="Location"
        name="location"
        fullWidth
        sx={{ mb: 2 }}
        onChange={handleChange}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Create Event
      </Button>
    </Container>
  );
}
