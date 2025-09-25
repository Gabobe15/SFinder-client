import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

const settings = [
  {
    name: "Profile",
    link: "/profile",
  },
  {
    name: "Setting",
    link: "/account",
  },
  {
    name: "Logout",
    link: "/logout",
  },
];

function ResponsiveAppBar() {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role;
  const fullname = user?.fullname;

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { Logout } = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = [
    {
      name: "Homepage",
      link: "/",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: role,
      link: role,
    },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            to="/"
            sx={{
              mr: 10,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              fontStyle: "italic",
              textDecoration: "none",
            }}
          >
            eduFinder
            {/* desktop version */}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map(({ name, link }, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={link}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <Typography sx={{ textAlign: "left" }}>{name}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            eduFinder
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ name, link }, index) => (
              <Button
                component="a"
                to={link}
                key={index}
                // onClick={handleCloseNavMenu}
                onClick={() => navigate(link)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                {name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  {fullname?.split(" ").length > 1
                    ? (
                        fullname.split(" ")[0][0] +
                        fullname.split(" ")[fullname.split(" ").length - 1][0]
                      ).toUpperCase()
                    : fullname?.substring(0, 2).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ name, link }, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  {index === settings.length - 1 ? (
                    <Button onClick={() => Logout()}>
                      <Typography
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                          width: "100%",
                          textAlign: "center",
                          textTransform: "none",
                          justifyContent: "center",
                          "&:hover": {
                            background: "transparent",
                          },
                        }}
                      >
                        {name}
                      </Typography>
                    </Button>
                  ) : (
                    <NavLink
                      to={link}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {name}
                      </Typography>
                    </NavLink>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
