import { useState } from "react";
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
  Divider,
  ListItemIcon,
  Stack,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BusinessIcon from "@mui/icons-material/Business";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import Logout from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [profileMenu, setProfileMenu] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openMenu = (
    event: React.MouseEvent<HTMLElement>,
    setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  ) => {
    setter(event.currentTarget);
  };

  const closeMenu = (
    setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  ) => {
    setter(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#111", padding: "5px 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Mobile View: Profile Button */}
        {isMobile ? (
          <IconButton onClick={() => setDrawerOpen(true)}>
            <Avatar src="/profile.jpg" alt="User Profile" />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              i<span style={{ color: "#4CAF50" }}>Z</span>AM
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: "5px 10px",
                borderRadius: "20px",
              }}>
              <SearchIcon sx={{ color: "#4CAF50" }} />
              <InputBase
                placeholder="Search by name, job title..."
                sx={{ ml: 1 }}
              />
            </Box>
          </Box>
        )}

        {/* Middle: Navigation Links (Hidden on Mobile) */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            {[
              { icon: HomeIcon, label: "Home" },
              { icon: WorkOutlineIcon, label: "Jobs" },
              { icon: BusinessIcon, label: "Employees" },
            ].map((item, index) => (
              <Stack key={index} alignItems="center" sx={{ color: "#fff" }}>
                <IconButton sx={{ color: "#fff" }}>
                  <item.icon />
                </IconButton>
                <Typography variant="body2">{item.label}</Typography>
              </Stack>
            ))}
          </Box>
        )}

        {/* Divider */}
        {!isMobile && (
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 2, backgroundColor: "#fff" }}
          />
        )}

        {/* Right Side: Notifications, Messaging, Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {[
            { icon: NotificationsIcon, label: "Notifications" },
            { icon: MessageIcon, label: "Messaging" },
          ].map((item, index) => (
            <Stack key={index} alignItems="center" sx={{ color: "#fff" }}>
              <IconButton sx={{ color: "#fff" }}>
                <item.icon />
              </IconButton>
              <Typography variant="body2">{item.label}</Typography>
            </Stack>
          ))}

          {/* Profile Section */}
          {!isMobile && (
            <Stack alignItems="center">
              <IconButton onClick={(e) => openMenu(e, setProfileMenu)}>
                <Avatar src="/profile.jpg" alt="User Profile" />
              </IconButton>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                Profile
              </Typography>
            </Stack>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              onClick={(e) => openMenu(e, setProfileMenu)}
              sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Profile Menu */}
          <Menu
            anchorEl={profileMenu}
            open={Boolean(profileMenu)}
            onClose={() => closeMenu(setProfileMenu)}>
            <MenuItem>
              <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
              <Box>
                <Typography variant="body1">Ahmed Amaar</Typography>
                <Typography variant="caption" color="gray">
                  UX UI designer
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem>Setting and Privacy</MenuItem>
            <MenuItem>Language</MenuItem>
            <MenuItem>Help</MenuItem>
            <Divider />
            <MenuItem onClick={() => closeMenu(setProfileMenu)}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      {/* Mobile Profile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <MenuItem>
            <Avatar sx={{ width: 40, height: 40, mr: 2 }} />
            <Box>
              <Typography variant="body1">Ahmed Amaar</Typography>
              <Typography variant="caption" color="gray">
                UX UI designer
              </Typography>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem>Home</MenuItem>
          <MenuItem>Jobs</MenuItem>
          <MenuItem>Employers</MenuItem>
          <Divider />
          <MenuItem>Notifications</MenuItem>
          <MenuItem>Messaging</MenuItem>
          <Divider />
          <MenuItem>Setting and Privacy</MenuItem>
          <MenuItem>Language</MenuItem>
          <MenuItem>Help</MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Box>
      </Drawer>
    </AppBar>
  );
}
