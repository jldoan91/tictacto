import React from "react";
import ReactDOM from "react-dom";
import Board from "./components/board/board";



const App = () => {
  return (
    <Board />
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById("app"));