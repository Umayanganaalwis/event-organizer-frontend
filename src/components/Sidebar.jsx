import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const drawerWidth = 240;

export default function Sidebar() {
  const { role } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      icon: DashboardOutlinedIcon,
      path: "/",
    },
    ...(role === "admin"
      ? [
          {
            text: "Create Event",
            icon: EventOutlinedIcon,
            path: "/create",
          },
        ]
      : []),
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ pt: 4 }}>
        <List>
          {menuItems.map((item) => {
            const selected = location.pathname === item.path;
            const IconComponent = item.icon;

            return (
              <ListItem
                key={item.text}
                button
                component={Link}
                to={item.path}
                selected={selected}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#e3f2fd",
                    color: "#1976d2",
                    fontWeight: "bold",
                  },
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                <ListItemIcon>
                  <IconComponent
                    sx={{
                      color: selected ? "#1976d2" : "#42a5f5",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      fontSize={14}
                      fontWeight={selected ? "bold" : "normal"}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
