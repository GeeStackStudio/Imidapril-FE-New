import { useEffect, useState } from "react";
import { useInterval } from "ahooks";

export default function useSpeed(props: {
  currentLoaded: number;
  refresh: number;
}) {
  const [loaded, setLoaded] = useState(0);
  const [speed, setSpeed] = useState(0);

  useInterval(() => {
    const theSpeed = (props.currentLoaded - loaded) / (props.refresh / 1000);
    setSpeed(theSpeed < 0 ? 0 : theSpeed);
    setLoaded(props.currentLoaded);
  }, props.refresh);
  return {
    speed,
  };
}
