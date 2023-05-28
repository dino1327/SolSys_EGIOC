import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Solars = ({ isMobile }) => {
  const solar = useGLTF("./solar_system/scene.gltf");

  return (
    <mesh>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <spotLight
        position={[0, 20, 10]}
        angle={0.5}
        penumbra={0.5}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 0, 10]} intensity={0.5} />
      <primitive
        object={solar.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const SolarsCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [targetPosition, setTargetPosition] = useState([0, -3, -1.5]);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const handleCanvasClick = (event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    // Calculate normalized mouse position
    const x = (clientX / innerWidth) * 2 - 1;
    const y = -(clientY / innerHeight) * 2 + 1;

    // Calculate new target position based on mouse position
    const newTargetPosition = [
      x * 10, // adjust the scale factor as needed
      y * 10, // adjust the scale factor as needed
      -1.5,
    ];

    // Update the target position state
    setTargetPosition(newTargetPosition);
  };

  return (
    <Canvas
      onClick={handleCanvasClick}
      frameloop="demand"
      shadows
      dpr={[1, 2]}
       camera={{ position: [200, 200, -1000], fov: 65, far: 10000 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls autoRotate enableZoom={true} target={targetPosition} />
        <Solars isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default SolarsCanvas;
