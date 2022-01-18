import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Html,
  useProgress
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const Model = () => {
  const gltf = useLoader(GLTFLoader, "https://ipfs.moralis.io:2053/ipfs/QmU1eeLitTwPv377hP1zqSZcvPHKBiqbDjZP6GRJkHNHx7");
  return <primitive object={gltf.scene} scale={1} />;
};// ONG

export default function App() {
  return (
    <div className="h-1/2 w-1/2">
      <Canvas>
        <Suspense fallback={<Loader />}> 
          <Model />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    </div>
  );
}
