import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function EventCard({ event }) {
  return (
    <Box
      sx={{
        backgroundColor: "#f0f7ff", // Light blue shade
        borderRadius: 2,
        p: 2,
        mb: 3,
        border: "1px solid #d0e4ff", // Optional border
      }}
    >
      <Typography variant="h6" gutterBottom>
        {event.name}
      </Typography>

      <Typography variant="body2" sx={{ color: "#555" }}>
        {dayjs(event.datetime).format("MMMM D, YYYY h:mm A")} @ {event.location}
      </Typography>

      <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
        {event.description}
      </Typography>

      <Button
        component={Link}
        to={`/events/${event.id}`}
        size="small"
        sx={{ textTransform: "uppercase", fontWeight: 'bold' }}
      >
        View Details
      </Button>
    </Box>
  );
}
