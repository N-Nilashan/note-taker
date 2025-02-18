"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useProgress, Html } from "@react-three/drei";
import { Suspense, useRef } from "react";

// Loader Component
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "emerald", fontSize: "16px", fontWeight: "bold" }}>
        Loading... {progress.toFixed(0)}%
      </div>
    </Html>
  );
};

const PenCanvas = ({ orbitRef }) => {
  const { scene } = useGLTF("/pen.glb");
  const penRef = useRef();

  // Rotate the model continuously
  useFrame(() => {
    if (penRef.current && orbitRef.current) {
      // Apply automatic rotation only if the user is not interacting
      if (!orbitRef.current.active) {
        penRef.current.rotation.y += 0.02; // Adjust speed if needed
      }
    }
  });

  return (
    <group ref={penRef}>
      <primitive
        object={scene}
        scale={1.8}
        rotation={[Math.PI, 0, (Math.PI * 2.8) / 4]}
        position={[0, 0, 0]}
      />
    </group>
  );
};

const PenModel = () => {
  const orbitRef = useRef();

  return (
    <Canvas
      frameloop="always"
      camera={{
        position: [0, 0, 5],
        fov: 45,
      }}
    >
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} />

        <OrbitControls
          ref={orbitRef}
          enableZoom={false}
          enableDamping
          dampingFactor={0.1} // Makes the rotation smoother
          rotateSpeed={1} // Adjusts mouse rotation speed
          enableRotate={true}
          enablePan={false}
        />
        {/* Pass orbitRef as a prop */}
        <PenCanvas orbitRef={orbitRef} />
      </Suspense>
    </Canvas>
  );
};

export default PenModel;
