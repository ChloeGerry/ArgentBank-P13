import { useState, useEffect } from "react";

export const setHeight = (): number => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - 157);
    };

    handleResize();
  }, []);

  return height;
};
