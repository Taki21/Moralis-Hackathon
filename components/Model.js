import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Html,
  useProgress
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useMemo, useEffect, Suspense } from "react";
import { Mesh } from 'three'

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default function Model(props) {
  const obj = useLoader(OBJLoader, props.url);
  return (
    <primitive object={obj}/>
  );
}// ONG

