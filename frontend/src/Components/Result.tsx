import { useEffect } from "react";
import useQuery from "./hooks/useQuery";
import "./styles/result.css";
import $ from "jquery";
import { Link } from "react-router-dom";

const Result = () => {
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
    <div id="result">
      {(!playlistId || playlistId === "") && (
        <>
          <span>No videos found that meet the requirements.</span>
          <Link to={`/`} className="playlist-link">
            Try again
          </Link>
        </>
      )}
      {playlistId && playlistId !== "" && (
        <>
          <span>Your playlist was created successfully!</span>
          <a
            href={`https://www.youtube.com/playlist?list=${playlistId}`}
            className="playlist-link"
          >
            Go to playlist &#x29c9;
          </a>
        </>
      )}
    </div>
  );
};

export default Result;
