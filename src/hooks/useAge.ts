import { useState, useEffect, useMemo } from "react";

export const useAge = (props: { oneYearInMilliSecond: number }) => {
  const [age, setAge] = useState<number>(1);

  const isBaby = useMemo<boolean>(() => 1 <= age && age < 5, [age]);
  const isKid = useMemo<boolean>(() => 5 <= age && age < 10, [age]);
  const isTeenager = useMemo<boolean>(() => 10 <= age && age < 20, [age]);
  const isSenior = useMemo<boolean>(() => 65 <= age, [age]);

  useEffect(() => {
    const id = setInterval(
      () => setAge((prevAge) => prevAge + 1),
      props.oneYearInMilliSecond ?? 100_000
    );
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    age,
    setAge,
    isBaby,
    isKid,
    isTeenager,
    isSenior,
  };
};
