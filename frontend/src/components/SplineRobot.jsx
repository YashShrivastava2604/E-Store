// components/SplineRobot.jsx
import React, { useEffect, useRef } from "react";
import Spline from "@splinetool/react-spline";

const SplineRobot = ({ sceneUrl = "https://prod.spline.design/V189TAMpcgNzaTs9/scene.splinecode", pageState }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Base styles for the background canvas
    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.pointerEvents = "none"; // don't block UI
    // set negative z-index *via JS* (safer if some parents create stacking contexts)
    container.style.zIndex = "0";

    // Wait for the canvas to appear then force canvas styles
    let canvas = null;
    const findCanvas = () => {
      canvas = container.querySelector("canvas");
      return !!canvas;
    };

    const obs = new MutationObserver(() => {
      if (findCanvas()) {
        // Make sure canvas doesn't intercept pointer events and sits behind UI
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "-11";
        obs.disconnect();
      }
    });
    obs.observe(container, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
    };
  }, []);

  // Optional: forward pageState by adding it to the scene url as a query param
  // or use Spline's onLoad to manipulate scene. For now we just accept props.
  return (
    <div ref={containerRef} aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
      <Spline scene={sceneUrl} />
    </div>
  );
};

export default SplineRobot;
