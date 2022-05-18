import AppBar from "@mui/material/AppBar/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";

type AutoPlaylistAppBarProps = {
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
};

const AutoPlaylistAppBar = ({ setDarkTheme }: AutoPlaylistAppBarProps) => {
  return (
    <AppBar position="static" color="inherit" style={{ opacity: "0.6" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontSize: { xs: 16, md: 22 },
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: { xs: ".1rem", md: ".3rem" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            YouTube AutoPlaylist
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <a
              href="https://github.com/ivan-svetlich/YouTube-AutoPlaylist"
              style={{ color: "inherit" }}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon sx={{ fontSize: { xs: 0, md: 36 } }} />
            </a>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>,
                    checked: boolean
                  ) => setDarkTheme(checked)}
                />
              }
              label="Dark Mode"
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AutoPlaylistAppBar;
