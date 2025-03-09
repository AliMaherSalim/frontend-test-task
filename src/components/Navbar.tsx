import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  InputBase,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const [profileMenu, setProfileMenu] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setProfileMenu(null);
  };

  return (
    <AppBar position="sticky" sx={{ background: "#111", p: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo & Search */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={toggleSidebar}
            sx={{ color: "#fff", display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            <span style={{ color: "white" }}>i</span>
            <span style={{ color: "limegreen" }}>ZAM</span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: "20px",
              px: 2,
              py: 0.5,
              flexGrow: { xs: 1, md: 0 },
              maxWidth: { xs: "60%", md: "auto" },
            }}>
            <SearchIcon sx={{ color: "#666" }} />
            <InputBase
              placeholder="Search by name, job title..."
              sx={{ ml: 1 }}
            />
          </Box>
        </Box>

        {/* Right: Notifications & Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton sx={{ color: "#fff" }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton onClick={openMenu}>
            <Avatar src="/profile.jpg" alt="User Profile" />
          </IconButton>
          <Menu
            anchorEl={profileMenu}
            open={Boolean(profileMenu)}
            onClose={closeMenu}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
