import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import "./form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaylistCreationForm = () => {
  const [loading, setLoading] = useState(false);
  const [authUrl, setAuthUrl] = useState("");
  const [windowClosed, setWindowClosed] = useState(false);
  const navigate = useNavigate();

  type Params = {
    keyword: string;
    days: number;
    results_per_channel: number;
  };

  const [params, setParams] = useState<Partial<Params>>({
    keyword: "",
    days: 0,
    results_per_channel: 1,
  });

  const openWindow = () => {
    var pop_win = window.open(
      `http://localhost:3000/auth?auth_url=${encodeURIComponent(authUrl)}`,
      "_blank",
      "toolbar=0,location=0,menubar=0,width=600,height=600"
    );

    var timer = setInterval(function () {
      if (pop_win && pop_win.closed) {
        clearInterval(timer);
        setWindowClosed(true);
      }
    }, 1000);
  };

  useEffect(() => {
    var authLink = document.getElementById("auth-link");
    if (authLink && authUrl) {
      authLink.click();
    }
  }, [authUrl]);

  useEffect(() => {
    async function createPlaylist() {
      if (windowClosed) {
        await axios
          .get(
            `http://localhost:8080?keyword=${params.keyword}&days=${params.days}&results_per_channel=${params.results_per_channel}`,
            { withCredentials: true }
          )
          .then((response) => {
            const statusCode = response.status;
            if (statusCode === 200 || statusCode === 201) {
              const data = response.data;
              if (data.playlistId || data.playlistId === "") {
                console.log("playlistId: " + data.playlistId);
                navigate(`/result?playlist_id=${data.playlistId}`);
              } else if (data.authUrl) {
                setAuthUrl("");
                setLoading(false);
              }
            }
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
      }
    }
    createPlaylist();
  }, [
    navigate,
    params.days,
    params.keyword,
    params.results_per_channel,
    windowClosed,
  ]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    await axios
      .get(
        `http://localhost:8080?keyword=${params.keyword}&days=${params.days}&results_per_channel=${params.results_per_channel}`,
        { withCredentials: true }
      )
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === 200 || statusCode === 201) {
          const data = response.data;
          if (data.playlistId || data.playlistId === "") {
            console.log("playlistId: " + data.playlistId);
            navigate(`/result?playlist_id=${data.playlistId}`);
          } else if (data.authUrl) {
            setAuthUrl(data.authUrl);
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, [navigate, params.days, params.keyword, params.results_per_channel]);

  return (
    <Paper elevation={1} className="playlist-form">
      <Stack spacing={2}>
        <div className="input-label">
          <span>Keyword </span>
          <span className="hint">
            (e g. titles that contain the word "music")
          </span>
        </div>
        <TextField
          id="keyword-input"
          name="keyword"
          required
          onChange={(e) => setParams({ ...params, keyword: e.target.value })}
          label="Keyword"
          variant="outlined"
          defaultValue=""
        />

        <div className="input-label">
          <span>Days </span>
          <span className="hint">(0 for videos uploaded today - max: 30)</span>
        </div>
        <TextField
          id="days-input"
          name="days"
          type="number"
          InputProps={{ inputProps: { min: 0, max: 30 } }}
          onChange={(e) => {
            const value = Number.parseInt(e.target.value);
            if (!isNaN(value)) {
              if (value >= 0 && value <= 30) {
                setParams({ ...params, days: value });
              } else if (value < 0) {
                setParams({ ...params, days: 0 });
              } else if (value > 30) {
                setParams({ ...params, days: 30 });
              }
            }
          }}
          onBlur={(e) => {
            const value = e.target.value;
            if (value !== params.days?.toString()) {
              e.target.value = `${params.days}`;
            }
          }}
          required
          label="Days"
          variant="outlined"
          defaultValue={0}
          InputLabelProps={{ shrink: true }}
        />

        <div className="input-label">
          <span>Results per channel </span>
          <span className="hint">(min: 1 - max: 50)</span>
        </div>
        <TextField
          id="results-input"
          name="results_per_channel"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 50 } }}
          onChange={(e) => {
            const value = Number.parseInt(e.target.value);
            if (!isNaN(value)) {
              if (value >= 1 && value <= 50) {
                setParams({ ...params, results_per_channel: value });
              } else if (value < 1) {
                setParams({ ...params, results_per_channel: 1 });
              } else if (value > 50) {
                setParams({ ...params, results_per_channel: 50 });
              }
            }
          }}
          onBlur={(e) => {
            const value = e.target.value;
            if (value !== params.results_per_channel?.toString()) {
              e.target.value = `${params.results_per_channel}`;
            }
          }}
          required
          label="Results per channel"
          variant="outlined"
          defaultValue={1}
          InputLabelProps={{ shrink: true }}
        />
      </Stack>
      <Box sx={{ "& button": { m: 1 } }}>
        <LoadingButton
          loading={loading}
          variant="contained"
          className="submit-btn"
          onClick={handleSubmit}
        >
          Create Playlist
        </LoadingButton>
      </Box>
      <span className="hint">
        You may be asked by Google to authorize this site.
      </span>
      <button onClick={openWindow} id="auth-link">
        Auth link
      </button>
    </Paper>
  );
};

export default PlaylistCreationForm;
