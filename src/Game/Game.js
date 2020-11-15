import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import { ALPHABET, API_URL } from "../constants";
import LetterPalette from "../LetterPalette/LetterPalette";
import Clues from "../Clues/Clues";
import "./game.css";
import Victory from "../Victory/Victory";

const INITIAL_CLUES_UNLOCKED = 3;

function showInstructions() {
  Swal.fire({
    title: "Welcome to BananaGaram Masala!",
    icon: "question",
    width: "70%",
    html: `
      <p>
        Each clue in the game corresponds to a word or short phrase, and your goal 
        is to figure out each of these solutions. 
      </p>
      <p>
        On the left side of the game board, you'll see the list of clues you've 
        unlocked, and text fields to enter your guess. Once you've solved a clue,
        you'll no longer be able to change your guess.
      </p>
      <p>
        On the right side of the game board, you'll see the letter pane. This pane 
        shows you how many of each letter you have available to solve the clues. 
        Each time you solve a clue, you'll unlock more clues and letters.
      </p>
      <p>
        If you're stuck on a clue, click the grey question mark to its right to see 
        some of the letters in the answer. 
      </p>
    `,
  });
}

function getLetterCounts(clues) {
  const counts = clues.reduce(
    (counts, clue) => {
      clue.answer.split("").forEach((letter) => {
        counts[letter] += 1;
      });
      return counts;
    },
    ALPHABET.split("").reduce((counts, letter) => {
      counts[letter] = 0;
      return counts;
    }, {})
  );
  return counts;
}

function getUnlockedLetterCountsChange(clues) {
  const counts = getLetterCounts(clues);
  return Object.keys(counts).reduce((changes, char) => {
    changes.set(char, counts[char] * -1);
    return changes;
  }, new Map());
}

export default function Game(props) {
  const [clues, setClues] = useState([]);
  const [details, setDetails] = useState("");
  const [numCluesUnlocked, setNumCluesUnlocked] = useState(
    INITIAL_CLUES_UNLOCKED
  );
  const [numCorrect, setNumCorrect] = useState(0);
  const [letterCounts, setLetterCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { clueSet } = useParams();

  useEffect(() => {
    fetch(`${API_URL}/${clueSet}`)
      .then((res) => res.json())
      .then((response) => {
        setClues(response.clues);
        setLetterCounts(
          getLetterCounts(response.clues.slice(0, INITIAL_CLUES_UNLOCKED))
        );
        setDetails(response.details);
        setIsLoading(false);
      })
      .catch(console.log);
  }, []);

  const hasEnoughLetters = (letter, num) => letterCounts[letter] >= num;
  const adjustCounts = (changes) => {
    const newLetterCounts = { ...letterCounts };
    changes.forEach((change, letter) => {
      const numLeft = (letterCounts[letter] -= change);
      newLetterCounts[letter] = numLeft;
    });
    setLetterCounts(newLetterCounts);
  };
  const gotAnswerCorrect = (word) => {
    word = word.replace(" ", "");
    const changes = getUnlockedLetterCountsChange(
      clues.slice(
        numCluesUnlocked,
        numCluesUnlocked + Math.floor(word.length / 2)
      )
    );
    adjustCounts(changes);
    setNumCluesUnlocked(
      Math.min(numCluesUnlocked + Math.floor(word.length / 2), clues.length)
    );
    setNumCorrect(numCorrect + 1);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return numCorrect < clues.length ? (
    <div className="gameboard">
      <div className="details">{details}</div>
      <div className="gameContainer">
        <div className="clues">
          <Clues
            clues={clues.slice(0, numCluesUnlocked)}
            answerCallbacks={{
              hasEnoughLetters,
              adjustCounts,
              gotAnswerCorrect,
            }}
          ></Clues>
        </div>
        <div className="letters">
          <LetterPalette letterCounts={letterCounts}></LetterPalette>
        </div>
      </div>
      <i className="help" onClick={() => showInstructions()}>
        <FontAwesomeIcon icon={faQuestionCircle} color="#333" size="lg" />
      </i>
    </div>
  ) : (
    <Victory birthday={clueSet === "birthday"} />
  );
}
