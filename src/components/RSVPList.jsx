import { List, ListItem, ListItemText, Typography } from "@mui/material";

export default function RSVPList({ rsvps }) {
  if (!rsvps.length) return <Typography>No one has RSVP'd yet.</Typography>;

  return (
    <List>
      {rsvps.map((name, idx) => (
        <ListItem key={idx}>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
}
