import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import "./clues.css";
import { ALPHABET } from "../constants";

const HINT_PROBABILITY = 0.4;
const HINT_DELAY_MS = 1000;
const HINT_SEPARATOR = "*";

function isAlpha(str) {
  return /^[a-zA-Z\*]*$/.test(str.replace(" ", ""));
}

function getCharFreqs(str) {
  return str.split("").reduce((counts, char) => {
    if (!counts.has(char)) {
      counts.set(char, 0);
    }
    counts.set(char, counts.get(char) + 1);
    return counts;
  }, new Map());
}

function mapDefaultGet(map, key, defaultVal) {
  return map.has(key) ? map.get(key) : defaultVal;
}

function getChangesBetween(lastAnswer, value) {
  const lastCounts = getCharFreqs(lastAnswer);
  const currCounts = getCharFreqs(value);

  const changes = new Map();

  ALPHABET.split("").forEach((letter) => {
    changes.set(
      letter,
      mapDefaultGet(currCounts, letter, 0) -
        mapDefaultGet(lastCounts, letter, 0)
    );
  });

  return changes;
}

function Answer(props) {
  const {
    answer,
    callbacks: { hasEnoughLetters, adjustCounts, gotAnswerCorrect },
  } = props;

  const [currentAnswer, setCurrentAnswer] = useState("");
  const [hintAllowed, setHintAllowed] = useState(false);

  const changesAreValid = (changes) => {
    for (let i = 0; i < ALPHABET.length; i++) {
      const letter = ALPHABET.charAt(i);
      if (!hasEnoughLetters(letter, mapDefaultGet(changes, letter, 0))) {
        return false;
      }
    }
    return true;
  };

  const trySetText = (value) => {
    setHintAllowed(false);
    value = value.toUpperCase();
    if (isAlpha(value.replace(HINT_SEPARATOR, ""))) {
      const changes = getChangesBetween(
        currentAnswer.replace(" ", "").replace(HINT_SEPARATOR, ""),
        value.replace(" ", "").replace(HINT_SEPARATOR, "")
      );
      if (changesAreValid(changes)) {
        adjustCounts(changes);
        setCurrentAnswer(value);
        if (
          value.replace(" ", "").replace(HINT_SEPARATOR, "") ===
          answer.replace(" ", "").replace(HINT_SEPARATOR, "")
        ) {
          gotAnswerCorrect(value);
        }
      }
    }
  };

  const resetHintTimer = () => {
    setHintAllowed(false);
    setTimeout(() => {
      setHintAllowed(true);
    }, HINT_DELAY_MS);
  };

  const makeHintStr = () => {
    return answer.split("").reduce((string, letter) => {
      if (Math.random() < HINT_PROBABILITY) {
        string += letter;
      } else {
        string += HINT_SEPARATOR;
      }
      return string;
    }, "");
  };

  const getHint = () => {
    trySetText(makeHintStr());
    resetHintTimer();
  };

  return (
    <div className="answerContainer">
      <input
        type="text"
        value={currentAnswer}
        onChange={(event) => trySetText(event.target.value)}
        disabled={currentAnswer.replace(" ", "") === answer.replace(" ", "")}
        onFocus={() => trySetText("")}
        onBlur={resetHintTimer}
      />
      {currentAnswer.replace(" ", "") === answer.replace(" ", "") ? (
        <FontAwesomeIcon icon={faCheckCircle} color="green" size="lg" />
      ) : (
        hintAllowed && (
          <i className="hintButton" onClick={getHint}>
            <FontAwesomeIcon
              icon={faInfoCircle}
              color="#aaa"
              size="lg"
            ></FontAwesomeIcon>
          </i>
        )
      )}
    </div>
  );
}

function Clue(props) {
  const { clue, answer, answerCallbacks } = props;

  return (
    <div className="clueContainer">
      <div className="clue">{clue}</div>
      <Answer
        className="answer"
        answer={answer}
        callbacks={answerCallbacks}
      ></Answer>
    </div>
  );
}

export default function Clues(props) {
  const { clues, answerCallbacks } = props;
  const clueStrs = [];
  clues.forEach((clue, index) => {
    clueStrs.push(
      <Clue
        key={index}
        clue={clue.clue}
        answer={clue.answer}
        answerCallbacks={answerCallbacks}
      />
    );
  });
  return <div className="container">{clueStrs}</div>;
}
