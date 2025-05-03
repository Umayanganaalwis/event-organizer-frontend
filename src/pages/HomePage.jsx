import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { fetchEvents } from "../api/events";
import EventCard from "../components/EventCard";
import dayjs from "dayjs";

export default function HomePage() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  const loadEvents = async () => {
    const res = await fetchEvents();
    const now = dayjs();

    const upcomingEvents = res.data.filter((e) =>
      dayjs(e.datetime).isAfter(now)
    );
    const pastEvents = res.data.filter((e) => dayjs(e.datetime).isBefore(now));

    setUpcoming(upcomingEvents);
    setPast(pastEvents);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      {upcoming.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      {past.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mt: 4 }}>
            Past Events
          </Typography>
          {past.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </>
      )}
    </Container>
  );
}
