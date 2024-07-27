import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function LikeRunes() {
  const likeRunesRef: React.RefObject<HTMLDivElement> = useRef(null);
  
  useEffect(() => {
    const qRunes: gsap.utils.SelectorFunc = gsap.utils.selector(likeRunesRef);
    const animation1: gsap.core.Tween = gsap.from(qRunes(".div"), {
      duration: 2,
      width: "50%",
      delay: 0.5,
      onComplete: () => {
        gsap.set(likeRunesRef.current, { zIndex: 0 });
      },
    });

    return () => {
      animation1.kill();
    };
  }, [likeRunesRef]);

  return (
    <div className="like-runes" ref={likeRunesRef}>
      <div className="div" />
      <div className="div" />
    </div>
  );
}

export default LikeRunes;
