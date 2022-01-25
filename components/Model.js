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
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useMemo, useEffect, Suspense } from "react";
import { Mesh } from 'three'

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default function Model(props) {
  //console.log(props.loader === GLTFLoader) 
  if(props.loader === 'gltf') {
    //console.log('joe')      
    const obj = useLoader(GLTFLoader, props.url);
    return (  
      <primitive object={obj.scene} scale={2}/>
    );
  } else if(props.loader === 'obj') {
    //console.log('L')
    const obj = useLoader(OBJLoader, props.url);
    return (
      <primitive object={obj} scale={2}/> 
    );
  } else {
    const obj = useLoader(FBXLoader, props.url);
    return (
      <primitive object={obj} scale={2}/> 
    );
  }
  
}

