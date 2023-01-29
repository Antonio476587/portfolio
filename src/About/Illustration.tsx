import React, { useRef } from "https://esm.sh/react@18.2.0";
import abilities from "./abilities.tsx";
import AbilitiesTable from "./AbilitiesTable.tsx";

function handleAnimationEnd(event: AnimationEvent) {
  event.stopPropagation();
  const { target: ab } = event;
  if (ab?.classList[3] && ab?.classList[4]) {
    ab.classList.remove(ab.classList[3], ab.classList[4]);
  }
  ab?.removeEventListener("animationend", handleAnimationEnd, {
    once: true,
  });
  return true;
}

function handleAnimationEndOut(event: AnimationEvent) {
  event.stopPropagation();
  const { target: ab } = event;
  if (ab?.classList[3] && ab?.classList[4]) {
    ab.classList.remove(ab.classList[3], ab.classList[4]);
  }
  ab?.removeEventListener("animationend", handleAnimationEndOut, {
    once: true,
  });
  ab?.toggleAttribute("hidden");
  return true;
}

const Illustration = React.forwardRef(
  function Illustration(_props, ref: React.RefObject<HTMLDivElement>) {
    const Abs: React.RefObject<HTMLTableElement[]> = useRef([]);
    const Notes: React.RefObject<HTMLLIElement[]> = useRef([]);
    let hiddenTablesState: boolean[] = [true, true, true, true];

    function getHiddenValues(): boolean[] {
      return hiddenTablesState;
    }

    function setHiddenValues(
      index?: number,
      value?: boolean,
      hiddenValues?: boolean[],
    ): boolean[] | Error {
      try {
        if (typeof index == "number" && typeof value == "boolean") {
          hiddenTablesState[index] = value;
        } else if (hiddenValues) {
          if (hiddenValues.length === hiddenTablesState.length) {
            hiddenTablesState = hiddenValues;
          } else {
            throw new Error(
              `The array doesn't not contain the same items quantity ${hiddenTablesState.length}. Give an array with the same length`,
            );
          }
        } else {
          throw new Error(
            "You should define either the two parameters: index?: number, value?: boolean to set a single value or hiddenValues?: boolean[] to set all the array.",
          );
        }
        return hiddenTablesState;
      } catch (error) {
        return error;
      }
    }

    function mixIndexOfTarget(value: string | number | null): number | null {
      switch (typeof value) {
        case "number":
          return value;
        case "string":
          return globalThis.parseInt(value, 10);
        default:
          return null;
      }
    }

    // Semi complex spaguethi bolognesa with red sauce and mozarella chesse :D
    function changeTableState(
      event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    ) {
      if (event.target) {
        // We get the LI element.
        const { target } = event;
        // Getting the value from the expected LI element.
        const { value } = target;
        // Parsing the value to a decimal integer.
        const indexOfTarget: number | null = mixIndexOfTarget(value);
        // Getting hiddenTableState = hTS.
        let hTS: boolean[] = getHiddenValues();
        // Searching for a visible table.
        const falseExitsAt: number = hTS.indexOf(false);

        // ab = ability
        let abIn: HTMLTableElement | null;
        let abOut: HTMLTableElement | null;

        // Verifying the existence of the tables and the LI element's parsed value.
        if (Abs.current && typeof indexOfTarget == "number") {
          // Getting the target table
          abIn = Abs.current[indexOfTarget] ?? null;
          // Getting the tablet that is going to go out.
          abOut = Abs.current[falseExitsAt] ?? null;

          // The table is hidden ? if it is, so it's true.
          if (hTS[indexOfTarget]) {
            // Then we shall verify that there's a table to take out.
            if (abOut !== null) {
              // If it exits, then:
              // We get it out.
              abOut.classList.add("animate__animated", "animate__fadeOut");
              abOut.addEventListener("animationend", handleAnimationEndOut, {
                once: true,
              });
              setHiddenValues(falseExitsAt, true);
              hTS = getHiddenValues();
              // And remove all the note-active class from the LI elements.
              Notes.current?.forEach((note) => {
                note.classList.remove("note-active");
              });
            }

            // We verify.
            if (abIn !== null) {
              setHiddenValues(indexOfTarget, false);
              hTS = getHiddenValues();
              // Active the target LI element.
              target.classList.add("note-active");
              // Show the table
              abIn.removeAttribute("hidden");
              // With a pretty animation from https://anime.style
              abIn.classList.add("animate__animated", "animate__fadeIn");
              // When it ends we pass the handler it.
              abIn.addEventListener("animationend", handleAnimationEnd, {
                once: true,
              });
            }
          } //  If the table is not hidden then we must dissapear it.
          else {
            // Make sure that they're not null.
            if (abIn && abOut) {
              // The same ab getting in is the same getting out? Then let's go
              if (abIn === abOut) {
                // If it exits, then:
                // We get it out.
                abOut.classList.add("animate__animated", "animate__fadeOut");
                abOut.addEventListener("animationend", handleAnimationEndOut, {
                  once: true,
                });
                setHiddenValues(falseExitsAt, true);
                hTS = getHiddenValues();
                // And remove all the note-active class from the LI elements.
                Notes.current?.forEach((note) => {
                  note.classList.remove("note-active");
                });
              }
            }
          }
        }
      }
    }

    function addRefs(el: HTMLTableElement): void {
      if (Abs.current) {
        if (el && !Abs.current.includes(el)) {
          Abs.current.push(el);
        }
      }
    }

    function addNoteRefs(el: HTMLLIElement): void {
      if (Notes.current) {
        if (el && !Notes.current.includes(el)) {
          Notes.current.push(el);
        }
      }
    }

    const notes = abilities.map((
      ab,
      index,
    ): React.ReactElement<HTMLLIElement> => (
      <li
        id={`note${1 + index}`}
        value={index}
        onClick={(e) => changeTableState(e)}
        key={index}
        tabIndex={0}
        title={ab.id}
        ref={addNoteRefs}
      />
    ));

    const abilityTable = abilities.map((
      ab,
    ): React.ReactElement<HTMLTableElement> => (
      <AbilitiesTable
        id={ab.id}
        ability={ab.ability}
        abs={ab.abs}
        key={ab.id}
        ref={addRefs}
      />
    ));

    return (
      <div className="container-illustration container cajita" ref={ref}>
        <img
          src="/img/avatar-uo-300.png"
          alt="This is avatar of me. It's seemed to the avatar Ank"
          srcSet="/img/avatar-uo-300.png 300w,
        /img/avatar-uo-700-2.png 700w, /img/avatar-uo-950-2.png 950w, /img/avatar-uo-1600.png 1800w"
          sizes="(max-width: 768px) 300px, (max-width: 1200px) 700px, (max-width: 1800px) 950px, 1800px"
        />
        <ul className="notes">{notes}</ul>
        {abilityTable}
      </div>
    );
  },
);

export default Illustration;
