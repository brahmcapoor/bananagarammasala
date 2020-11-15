import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import "./splashpage.css";
import logo from "../img/logo.png";

export default function SplashPage(props) {
  const [redirect, setRedirect] = useState(false);

  const keyPressHandler = (event) => {
    console.log(event);
    if (event.code === "Space") {
      setRedirect(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPressHandler);
  }, []);

  return redirect ? (
    <Redirect to="/select" />
  ) : (
    <div className="splashpage">
      <div className="title">
        B<span className="second">A</span>
        <span className="first">N</span>
        <span className="second">A</span>
        <span className="first">N</span>
        <span className="second">A</span>G<span className="second">A</span>
        <span className="first">R</span>
        <span className="second">A</span>
        <span className="first">M</span>
        &nbsp; M<span className="second">A</span>
        <span className="first">S</span>
        <span className="second">A</span>
        <span className="first">L</span>
        <span className="second">A</span>
      </div>
      <div className="logocontainer">
        <img src={logo} alt="Logo" className="splash-logo"></img>
        <p className="startgame">Press space to begin</p>
      </div>
    </div>
  );
}
