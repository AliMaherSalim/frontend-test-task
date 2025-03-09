import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Chip,
  Pagination,
  Switch,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getJobs } from "../utils/api";
import MenuIcon from "@mui/icons-material/Menu";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  experience: string;
  employmentType: string;
  mode: string;
  category: string;
  logo: string;
}

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const jobsPerPage = 3;
  const [alertEnabled, setAlertEnabled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    getJobs().then(setJobs);
  }, []);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedJobs = jobs.slice(
    (page - 1) * jobsPerPage,
    page * jobsPerPage
  );

  return (
    <>
      <Header />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
        <Container sx={{ mt: 3, flexGrow: 1 }}>
          {/* Job Listings Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row", // Ensures alignment stays correct
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              position: "relative",
            }}>
            <Box
              sx={{
                flexGrow: 1,
                backgroundColor: "#2e7d32",
                p: 2,
                borderRadius: "8px",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  UI Designer in Egypt
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  70 job positions
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography sx={{ mr: 1 }}>Set alert</Typography>
                <Switch
                  checked={alertEnabled}
                  onChange={() => setAlertEnabled(!alertEnabled)}
                />
              </Box>
            </Box>

            {isMobile && (
              <Box
                sx={{
                  position: "absolute",
                  right: "-10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                  padding: "5px",
                }}>
                <IconButton
                  onClick={() => setMobileOpen(true)}
                  sx={{ color: "#000" }}>
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Job Cards */}
          {paginatedJobs.map((job) => (
            <Card
              key={job.id}
              sx={{
                mb: 2,
                boxShadow: 2,
                borderRadius: "8px",
                p: isMobile ? 1 : 2,
              }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: isMobile ? "column" : "row",
                }}>
                <Avatar
                  src={job.logo}
                  alt={job.company}
                  sx={{
                    width: 56,
                    height: 56,
                    mb: isMobile ? 1 : 0,
                    mr: isMobile ? 0 : 2,
                  }}
                />
                <Box flex={1} textAlign={isMobile ? "center" : "left"}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {job.title}
                  </Typography>
                  <Typography variant="subtitle2" color="primary">
                    {job.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📍 {job.location} • 📅 {job.postedDate}
                  </Typography>
                  <Box mt={1}>
                    <Chip label={job.experience} size="small" sx={{ mr: 1 }} />
                    <Chip
                      label={job.employmentType}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip label={job.mode} size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {job.category}
                  </Typography>
                </Box>
                <IconButton sx={{ mt: isMobile ? 1 : 0 }}>
                  <FavoriteBorderIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={Math.ceil(jobs.length / jobsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
