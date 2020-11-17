import "./victory.css";
import logo from "../img/logo.png";

function BirthdayCongrats(props) {
  return (
    <div>
      <h1>Happy Birthday, Melody!</h1>
      <h2>We couldn't all wish you in person. We still wanted to try. </h2>
      <iframe
        title="video"
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/brJfMWBTzjc?start=1"
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
      {props.birthday ? <BirthdayCongrats /> : <DefaultCongrats />}
    </div>
  );
}
