import React, { useState } from "react";
import { arrow90DD } from "./Svg.jsx";

function AbilitiesRow({ ab }) {
  const [hidden, setHidden] = useState(true);

  const { subAbs = null } = ab;

  if (subAbs !== null) {
    return (
      <li className="li">
        <div className="ab d-flex">
          <h4 className="h4 ability">{ab.name}</h4>
          <div className="container level">
            <button
              type="button"
              className="buttonContent"
              id={`btn-${ab.name}`}
              onClick={() => setHidden(!hidden)}
            >
              {arrow90DD}
            </button>
          </div>
        </div>
        <ul className="ul-sub-abs" hidden={hidden}>
          {subAbs.map((abs) => (
            <li>
              <div className="sub-ab d-flex">
                <h4 className="h5 sub-ability">{abs.name}</h4>
                <div className="container sub-level">{abs.content}</div>
              </div>
            </li>
          ))}
        </ul>
      </li>
    );
  }
  return (
    <li className="li">
      <div className="ab d-flex">
        <h4 className="h4 ability">{ab.name}</h4>
        <div className="container level">{ab.content}</div>
      </div>
    </li>
  );
}

const AbilitiesTable = React.forwardRef(({ id, ability, abs }, ref) => {
  const abilityRow = abs.map((abs) => <AbilitiesRow ab={abs} key={abs.name} />);

  return (
    <div className={`container div-abilities ${id}`} ref={ref} hidden>
      <div className="container div-abilities-h3">
        <h3 className="abilities">{ability}</h3>
      </div>

      <div className="container abs">
        <ol className="ol ol-abs">{abilityRow}</ol>
      </div>
    </div>
  );
});

export default AbilitiesTable;
