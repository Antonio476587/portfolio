import abilities, { ability } from "./abilities.tsx";
import React, { useState } from "https://esm.sh/react@18.2.0";
import { arrow90DD } from "../Utils/Svg.tsx";

interface AbilitiesRowProps {
  ab: ability;
}

function AbilitiesRow({ ab }: AbilitiesRowProps) {
  const [hidden, setHidden] = useState(true);

  const { subAbs = null } = ab;

  if (subAbs !== null) {
    return (
      <tr className="div-row">
        <td className="ab d-flex">
          <h4 className="h4 ability">{ab.name}</h4>
          <div className="container level">
            <button
              type="button"
              className="buttonContent"
              id={`btn-${ab.name}`}
              onClick={() => setHidden(!hidden)}
              aria-label="Display and hid subabilities"
            >
              {arrow90DD}
            </button>
          </div>
        </td>
        <td>
          <ul className="ul-sub-abs" hidden={hidden}>
            {subAbs.map((abs) => (
              <li key={abs.name}>
                <div className="sub-ab d-flex">
                  <div>
                    <h5 className="h5 sub-ability">{abs.name}</h5>
                  </div>
                  <div>
                    <div className="container sub-level">{abs.content}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </td>
      </tr>
    );
  }
  return (
    <tr className="div-row">
      <td className="ab d-flex">
        <div>
          <h4 className="h4 ability">{ab.name}</h4>
        </div>
        <div>
          <div className="container level">{ab.content}</div>
        </div>
      </td>
    </tr>
  );
}

const AbilitiesTable = React.forwardRef(
  function AbilitiesTable(
    { id, ability, abs }: abilities,
    ref: React.RefObject<HTMLTableElement>,
  ) {
    const abilityRow = abs.map((abs) => (
      <AbilitiesRow
        ab={abs}
        key={abs.name}
      />
    ));

    return (
      <table className={`container div-abilities ${id}`} ref={ref} hidden>
        <thead className="container div-abilities-h3">
          <tr>
            <th className="abilities">
              <h3>{ability}</h3>
            </th>
          </tr>
        </thead>

        <tbody className="container abs">
          {abilityRow}
        </tbody>
      </table>
    );
  },
);

export { AbilitiesRow };
export default AbilitiesTable;
