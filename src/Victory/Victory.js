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
        src="https://www.youtube.com/embed/gEkodMKN4Vw?start=1"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

function ThreeYearsCongrats(props) {
  return (
    <div>
      <img
        alt="It's Us"
        src={`${process.env.PUBLIC_URL}/itsus.png`}
        className="anniv"
      ></img>
      <h1>You win!</h1>
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
  if (props.birthday) {
    return <BirthdayCongrats />;
  }
  if (props.anniversary) {
    return <ThreeYearsCongrats />;
  }
  return <DefaultCongrats />;
}
