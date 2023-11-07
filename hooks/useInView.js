import React, { useState, useEffect, useRef } from "react";

const useInView = () => {
  /* state to track whether the element is in the viewport or not */
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    /* get the DOM element from the ref object */
    const element = ref.current;

    /*  when the observed element enters or exits the viewport, update the inView state */
    const observer = new IntersectionObserver((entries) => {
      setInView(entries[0].isIntersecting);
    });

    if (element) observer.observe(element);

    /* clean function to stop observing the element when the component unmounts */
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  return { ref, inView };
};

export default useInView;
