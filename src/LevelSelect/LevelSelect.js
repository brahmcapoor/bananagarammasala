import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { API_URL } from "../constants";
import Swal from "sweetalert2";
import "./levelselect.css";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function formatName(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function LevelCard(props) {
  const { clueSet, clickHandler } = props;
  const imageFilename = `${process.env.PUBLIC_URL}/${clueSet}.png`;

  return (
    <div className="cardContainer" onClick={clickHandler}>
      <div className="cardContainerInner">
        <div className="cardFront">
          <img className="levelImage" src={imageFilename} alt="{clueSet}"></img>
        </div>
        <div className="cardBack">
          <div className="clueSetTitle">{formatName(clueSet)}</div>
        </div>
      </div>
    </div>
  );
}

function attributeIcons() {
  Swal.fire({
    title:
      "I'm not artistic enough to make those icons, so I have these people to thank:",
    html:
      "<ul>" +
      '<li><a href="https://www.flaticon.com/authors/photo3idea-studio" title="photo3idea_studio">photo3idea_studio</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></li>' +
      '<li><a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></li>' +
      '<li><a href="https://www.flaticon.com/authors/turkkub" title="turkkub">turkkub</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></li>' +
      "</ul>",
    width: 800,
  });
}

export default function LevelSelect() {
  const [clueSets, setClueSets] = useState([]);
  const [clueSet, setClueSet] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/cluesets`)
      .then((res) => res.json())
      .then((response) => {
        setClueSets(response.cluesets);
        setIsLoading(false);
      })
      .catch(console.log);
  }, []);

  const cards = clueSets.reduce((cards, clueSet) => {
    cards.push(
      <LevelCard clueSet={clueSet} clickHandler={() => setClueSet(clueSet)} />
    );
    return cards;
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return clueSet ? (
    <Redirect to={`/play/${clueSet}`}></Redirect>
  ) : (
    <div className="levelselectcontainer">
      <div className="cardsContainer">{cards}</div>
      <button className="attributions" onClick={attributeIcons}>
        Attributions
      </button>
    </div>
  );
}
