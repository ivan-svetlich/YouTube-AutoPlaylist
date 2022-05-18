import { useEffect } from "react";
import useQuery from "../hooks/useQuery";
import $ from "jquery";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./alert.css";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const ResultAlert = () => {
  const query = useQuery();
  const playlistId = query.get("playlist_id");

  useEffect(() => {
    const result = document.getElementById("result");

    if (result) {
      $("#result").draggable({ containment: "parent" });
      result.classList.add("is-visible");
    }
  }, []);

  return (
    <Paper className="result-container">
      {(!playlistId || playlistId === "") && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Alert variant="outlined" severity="error" className="result-alert">
            No videos found that meet the requirements.
          </Alert>
          <Link to="/">
            <Button variant="contained" color="primary">
              Go back
            </Button>
          </Link>
        </Grid>
      )}
      {playlistId && playlistId !== "" && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Alert variant="outlined" severity="success" className="result-alert">
            Your playlist was created successfully!
          </Alert>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.youtube.com/playlist?list=${playlistId}`}
          >
            <Button variant="contained" color="primary">
              Go to playlist
            </Button>
          </a>
        </Grid>
      )}
    </Paper>
  );
};

export default ResultAlert;
