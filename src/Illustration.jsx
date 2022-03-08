import React, { useRef } from "react";
import abilities from "./abilities.jsx";
import AbilitiesTable from "./AbilitiesTable.jsx";

let hidden = [true, true, true, true];

function handleAnimationEnd(event) {
  event.stopPropagation();
  const ab = event.target;
  ab.classList.remove(ab.classList[3], ab.classList[4]);
  ab.removeEventListener("animationend", handleAnimationEnd, {
    once: true,
  });
  return true;
}
function handleAnimationEndOut(event) {
  event.stopPropagation();
  const ab = event.target;
  ab.classList.remove(ab.classList[3], ab.classList[4]);
  ab.removeEventListener("animationend", handleAnimationEndOut, {
    once: true,
  });
  ab.toggleAttribute("hidden");
  return true;
}

const Illustration = React.forwardRef((props, ref) => {
  const Abs = useRef([]);
  const Notes = useRef([]);

  function changeState(e) {
    const index = e.target.value;
    const isFalse = hidden.indexOf(false);

    const abIn = Abs.current[index];
    const abOut = Abs.current[isFalse];

    let newHidden = hidden;
    if (newHidden[index]) {
      if (abOut !== undefined) {
        abOut.classList.add("animate__animated", "animate__fadeOut");
        abOut.addEventListener("animationend", handleAnimationEndOut, {
          once: true,
        });
      }
      Notes.current.forEach((note) => {
        note.classList.remove("note-active");
      });
      newHidden = [true, true, true, true];
    }
    e.target.classList.toggle("note-active");
    newHidden[index] = !newHidden[index];
    hidden = newHidden;

    if (abIn === abOut) {
      abOut.classList.add("animate__animated", "animate__fadeOut");
      abOut.addEventListener("animationend", handleAnimationEndOut, {
        once: true,
      });
      return;
    }
    abIn.toggleAttribute("hidden");

    abIn.classList.add("animate__animated", "animate__fadeIn");

    abIn.addEventListener("animationend", handleAnimationEnd, { once: true });
  }

  function addRefs(el) {
    if (el && !Abs.current.includes(el)) {
      Abs.current.push(el);
    }
  }
  function addNoteRefs(el) {
    if (el && !Notes.current.includes(el)) {
      Notes.current.push(el);
    }
  }

  const notes = abilities.map((ab, index) => (
    <li
      id={`note${1 + index}`}
      value={index}
      onClick={changeState}
      key={index}
      tabIndex="0"
      title={ab.id}
      ref={addNoteRefs}
    />
  ));

  const abilityTable = abilities.map((ab, index) => (
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
});

export default Illustration;
