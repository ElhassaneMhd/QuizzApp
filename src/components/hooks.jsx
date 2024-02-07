import { useEffect, useState } from "react";
export function useSetToLocaleStorage(score,allScores) {
    const [scores, setscores] = useState(() =>
        localStorage.getItem(allScores)
          ? [...JSON.parse(localStorage.getItem(allScores))]
          : []
    );
    useEffect(() => {
      function additem() {
        setscores((e) => [...e, score]);
        localStorage.setItem(
          allScores,
          JSON.stringify([...scores, score])
        );
      }
      score &&
        !scores.includes(score) &&
        additem();
      /*eslint-disable-next-line*/
    }, [score]);
    return { scores, setscores };
}