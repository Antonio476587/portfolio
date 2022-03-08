import React from "react";

function NotFound() {
  return (
    <div className="not-found">
      <h2>Hmmm... Page not found</h2>
      <div className="not-found-content">
        <h3>This page don't exits or the link is incorrect. Try:</h3>
        <ul>
          <li>
            <h4>Make sure you the link is correctly typed.</h4>
          </li>
          <li>
            <h4>Go home and navigate from here.</h4>
          </li>
          <li>
            <h4>Dance.</h4>
          </li>
        </ul>
        <div className="not-found-link">
          <h3>Maybe you would like to play a game -{">"}</h3>
          <button type="button" role="link">
            <a href="tic-tac-toe.html">Launch Game</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
