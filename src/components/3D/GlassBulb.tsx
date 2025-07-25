import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function BulbMesh() {
  // Fix 1: Properly type the ref for Three.js Group
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Fix 2: Now rotation will be properly recognized
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main glass bulb */}
      <mesh position={[0, 0, 0]} scale={[1.2, 1.4, 1.2]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.5}
          thickness={0.2}
          roughness={0.05}
          transmission={0.95}
          ior={1.5}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
        />
      </mesh>

      {/* Inner glow/filament effect */}
      <mesh position={[0, 0, 0]} scale={[0.6, 0.8, 0.6]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#ffd700" transparent opacity={0.3} />
      </mesh>

      {/* Bulb base */}
      <mesh position={[0, -1.1, 0]} scale={[0.4, 0.3, 0.4]}>
        <cylinderGeometry args={[0.3, 0.4, 0.6, 8]} />
        <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

export function GlassBulb({ size = 64, className = "" }) {
  return (
    <div
      className={`rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <pointLight position={[-2, -2, -2]} intensity={0.5} color="#ffd700" />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Glass Bulb */}
        <BulbMesh />
      </Canvas>
    </div>
  );
}
