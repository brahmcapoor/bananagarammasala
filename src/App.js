import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import SplashPage from "./SplashPage/SplashPage";
import Game from "./Game/Game";
import LevelSelect from "./LevelSelect/LevelSelect";

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <Switch>
          <Route path="/play/:clueSet">
            <Game />
          </Route>
          <Route path="/select">
            <LevelSelect />
          </Route>
          <Route path="/">
            <SplashPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
