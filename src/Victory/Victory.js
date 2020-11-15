import "./victory.css";
import logo from "../img/logo.png";

function BirthdayCongrats(props) {
  const { videoURL } = props;
  return (
    <div>
      <h1>Happy Birthday, Melody!</h1>
      <h2>Those clues were a group effort. So's this.</h2>
      <iframe
        title="video"
        width="560"
        height="315"
        src={videoURL}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

function DefaultCongrats(props) {
  return (
    <div>
      <img alt="BGM logo" src={logo} className="logo"></img>
      <h1>You win!</h1>
    </div>
  );
}

export default function Victory(props) {
  return (
    <div className="victorycard">
      {props.birthday ? (
        <BirthdayCongrats videoURL="https://www.youtube.com/embed/8E4cQHejFq0" />
      ) : (
        <DefaultCongrats />
      )}
    </div>
  );
}
