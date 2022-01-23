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
  const obj = useLoader(props.loader, props.url);
  //console.log(props.loader === GLTFLoader)
  if(props.loader === GLTFLoader) {
    //console.log('joe')
    return (
      <primitive object={obj.scene}/>
    );
  } else {
    //console.log('L')
    return (
      <primitive object={obj}/>
    );
  }
  // does it work withg gltf ok
}// lets test it out

