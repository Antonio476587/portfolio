const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Hmmm... Page not found</h2>
      <div className="not-found-content">
        <h3>This page don&apos;t exits or the link is incorrect. Try:</h3>
        <ul>
          <li>
            <h4>Make sure you the link is correctly typed.</h4>
          </li>
          <li>
            <h4>
              <a href="/">Go home</a> and navigate from there.
            </h4>
          </li>
          <li>
            <h4>Dance.</h4>
          </li>
          <li>
            <h4>
              Watch a video in youtube about{" "}
              <a href="https://www.youtube.com/watch?v=0Puv0Pss33M">
                how to help the enviroment.
              </a>
            </h4>
          </li>
        </ul>
        <div className="not-found-link">
          <h3>Maybe you would like to play a game -{">"}</h3>
          <button type="button" role="link">
            <a href="/static/h5/tic-tac-toe.html">Launch Game</a>
          </button>
          <h3>:( == :)&macr;&sup1;</h3>
        </div>
      </div>
    </div>
  );
};

export default NotFound;