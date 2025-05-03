import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Container, Typography, Button, Box, Link } from "@mui/material";
import { fetchEventById } from "../api/events";
import { rsvpToEvent, getRsvps } from "../api/rsvp";
import dayjs from "dayjs";
import RSVPList from "../components/RSVPList";
import { useAuth } from "../auth/AuthContext";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [hasRSVPed, setHasRSVPed] = useState(false);
  const { role, userId } = useAuth();

  const loadEvent = async () => {
    const res = await fetchEventById(id);
    setEvent(res.data);
  };

  const loadRsvps = async () => {
    const res = await getRsvps(id);
    const allRsvps = res.data || [];
    setRsvps(allRsvps);
    setHasRSVPed(allRsvps.includes(userId));
  };

  const handleRsvp = async () => {
    await rsvpToEvent(id);
    setHasRSVPed(true);
    loadRsvps();
  };

  useEffect(() => {
    loadEvent();
    loadRsvps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, role, userId]);

  if (!event) return <Container sx={{ mt: 4 }}>Loading...</Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" color="primary">
          Back to Events
        </Link>
      </Box>

      <Typography variant="h4" gutterBottom>
        {event.name}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        {dayjs(event.datetime).format("MMMM D, YYYY h:mm A")} @ {event.location}
      </Typography>
      <Typography>{event.description}</Typography>

      {role === "user" && userId && (
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" onClick={handleRsvp} disabled={hasRSVPed}>
            {hasRSVPed ? "You're attending" : "I'm Attending"}
          </Button>
        </Box>
      )}

      {role === "admin" && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Who's Attending</Typography>
          <RSVPList rsvps={rsvps} />
        </Box>
      )}
    </Container>
  );
}
