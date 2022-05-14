import { useEffect, useState } from "react";
import "./styles/home.css";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import $ from "jquery";
import "jqueryui";

const Home = () => {
  const [loading, setLoading] = useState(false);

  type Options = {
    keyword: string;
    days: number;
    results_per_channel: number;
  };

  const handleSubmit = (values: Options) => {
    setLoading(true);
    window.location.replace(
      `http://localhost:8080?keyword=${values.keyword}&days=${values.days}&results_per_channel=${values.results_per_channel}`
    );
  };

  const PlaylistSchema = Yup.object().shape({
    keyword: Yup.string()
      .min(1, "Too short!")
      .max(50, "Too long!")
      .required("Required"),

    days: Yup.number()
      .typeError("you must specify a number")
      .min(0, "Min value 0.")
      .max(30, "Max value 30.")
      .required("Required"),

    results_per_channel: Yup.number()
      .typeError("you must specify a number")
      .min(0, "Min value 0.")
      .max(30, "Max value 50.")
      .required("Required"),
  });

  useEffect(() => {
    const draggableDiv = document.getElementById("draggable-div");

    if (draggableDiv) {
      $("#draggable-div").draggable({ containment: "parent" });
      draggableDiv.classList.add("is-visible");
    }
  }, []);

  return (
    <div id="draggable-div">
      {loading && "Loading..."}
      {!loading && (
        <Formik
          initialValues={{
            keyword: "",
            days: 0,
            results_per_channel: 2,
          }}
          validationSchema={PlaylistSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              handleSubmit(values);
              setSubmitting(false);
            }, 400);
          }}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, errors, values }) => (
            <Form>
              <div className="form-title">YouTube Auto-Playlist</div>
              <div className="option-text">
                <span>
                  Keyword{" "}
                  <span className="hint">
                    (e g. titles that contain the word "music")
                  </span>
                </span>
                <Field
                  type="text"
                  name="keyword"
                  required
                  className={`form-input ${
                    errors.keyword && !values.keyword ? "input-error" : ""
                  }`}
                />
                <span
                  className={`msg ${
                    errors.keyword && !values.keyword ? "error" : ""
                  }`}
                >
                  {errors.keyword ? errors.keyword : "placeholder"}
                </span>
              </div>
              <div className="option-text">
                <span>
                  Days{" "}
                  <span className="hint">
                    (0 for videos uploaded today - max: 30)
                  </span>
                </span>
                <Field
                  type="number"
                  step="1"
                  min="0"
                  max="30"
                  name="days"
                  className={`form-input ${errors.days ? "input-error" : ""}`}
                />
                <span className={`msg ${errors.days ? "error" : ""}`}>
                  {errors.days ? errors.days : "placeholder"}
                </span>
              </div>
              <div className="option-text">
                <span>
                  Results per channel{" "}
                  <span className="hint">(min: 1 - max: 50)</span>
                </span>
                <Field
                  type="number"
                  step="1"
                  min="1"
                  max="50"
                  name="results_per_channel"
                  className={`form-input ${
                    errors.results_per_channel && !values.results_per_channel
                      ? "input-error"
                      : ""
                  }`}
                />
                <span
                  className={`msg ${errors.results_per_channel ? "error" : ""}`}
                >
                  {errors.results_per_channel
                    ? errors.results_per_channel
                    : "placeholder"}
                </span>
              </div>
              <div className="button">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn"
                >
                  Create playlist
                </button>
                <span className="hint">
                  You may be asked by Google to authorize this site.
                </span>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Home;
