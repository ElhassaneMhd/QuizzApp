import { useEffect, useState } from "react";
export function useSetToLocaleStorage(score,liste) {
    const [scores, setscores] = useState(() =>
        localStorage.getItem(liste)
          ? [...JSON.parse(localStorage.getItem(liste))]
          : []
    );
    useEffect(() => {
      function additem() {
        setscores((e) => [...e, score]);
        localStorage.setItem(
          liste,
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
export function useIncrLocaleStorage(increment, item) {
   const [value, setValue] = useState(() =>
        localStorage.getItem(item)
          ? Number(localStorage.getItem(item))
          : 0
  );
  useEffect(() => {
    function incre() {
         setValue((e) => e+increment);
        localStorage.setItem(
          item,
          Number(value)+increment
      );
    }
    incre()
    // eslint-disable-next-line
  }, [increment])
  return value 
}
export function useStoredSettings(value, item) {
  const settings = JSON.stringify(localStorage.getItem('settings'))||localStorage.setItem('settings',JSON.parse({timer:10,difficulty:''}))
  
  useEffect(() => {
    if (item==='timer') localStorage.setItem('settings',JSON.parse({...settings,timer:value}));
    if (item==='numberQuestions') localStorage.setItem('settings',JSON.parse({...settings,timer:value}));
    if (item==='difficulty') localStorage.setItem('settings',JSON.parse({...settings,timer:value}));
  }, [item, value, settings])

  return settings
}