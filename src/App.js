import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import bg from "./assets/bg1.png";
import cloudL from "./assets/cloud-l.png";
import cloudR from "./assets/cloud-r.png";
import abbott from "./assets/text-ab.png";
import rabbit from "./assets/text-rab.png";
import therhy from "./assets/text-rhy.png";

const App = () => {
  const [query, setQuery] = useState("");
  const [rhymes, setRhymes] = useState([""]);
  const [finalQuery, setFinalQuery] = useState("");

  //  sort results by ascending length.

  let arr = rhymes;
  if (typeof arr !== "undefined") {
    arr.sort((a, b) => a.length - b.length);
  }

  // api call once finalQuery word is submitted
  const getRhymingWords = () => {
    const options = {
      method: "GET",
      url: `http://localhost:8000/rhyme/${query}`,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setRhymes(response.data.rhymes.all);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    if (query) getRhymingWords();
  }, [finalQuery]);

  const submitHandler = (e) => {
    e.preventDefault();
    setFinalQuery(query);
  };

  return (
    <>
      <div className="wrapper">
        <div className="top-content">
          <img
            className="bg"
            src={bg}
            alt="grassy hill with tree and tree stump"
          />

          <div className="cloud">
            <img className="cloudL" src={cloudL} alt="clouds" />
            <img className="cloudR" src={cloudR} alt="clouds" />
          </div>

          <div className="title__container">
            <img src={abbott} alt="abbott script text" />

            <img src={rabbit} alt="rabbit script text" />

            <img src={therhy} alt="the rhyming text" />
          </div>
        </div>
        <div className="bottom-content">
          <div className="form__container">
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Enter Word"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">Get Rhyme</button>
            </form>
          </div>

          <div className="results__container">
            {finalQuery && rhymes && (
              <div className="results__box">
                <div className="results__box-content">
                  {rhymes.map((list, index) => (
                    <p key={index}>{list}</p>
                  ))}
                </div>
              </div>
            )}
            {!rhymes && (
              <p className="no-result">
                No rhymes found for <span>{finalQuery}</span>. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
