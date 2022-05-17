import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import PlaylistCreationPage from "./containers/PlaylistCreationPage";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AutoPlaylistAppBar from "./containers/appBar/AutoPlaylistAppBar";
import ResultAlert from "./containers/result/ResultAlert";
import AuthPage from "./containers/auth/AuthPage";
import AuthResult from "./containers/auth/AuthResult";

function App() {
  const [darkTheme, setDarkTheme] =useState(true)
  const pageTheme = createTheme({
    palette: {
      mode: darkTheme ? 'dark': 'light',

    }
  })

  return (
    <div className="App">
      <ThemeProvider theme={pageTheme}>
        <AutoPlaylistAppBar setDarkTheme={setDarkTheme} />
        <Router>
          <Routes>
            <Route path="/" element={<PlaylistCreationPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/authResult" element={<AuthResult />} />
            <Route path="/result" element={<ResultAlert  />} />
            <Route path="/test" element={<PlaylistCreationPage />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
