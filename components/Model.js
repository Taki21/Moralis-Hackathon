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
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useMemo, useEffect, Suspense } from "react";
import { Mesh } from 'three'

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default function Model(props) {
  if(props.loader === 'gltf' || props.loader === 'glb') { 
    const obj = useLoader(GLTFLoader, props.url);
    return (  
      <primitive object={obj.scene} scale={2}/>
    );
  } else if(props.loader === 'obj') {
    //const materials = useLoader(MTLLoader, props.mtlUrl) // @TODO uhhhhhh mtl shit 
    const obj = useLoader(OBJLoader, props.url)
    return (
      <primitive object={obj} scale={2} normalMap={'https://learnopengl.com/img/advanced-lighting/normal_mapping_normal_map.png '}/> 
    );
  } else if (props.loader === "fbx") {
    const obj = useLoader(FBXLoader, props.url);
    return (
      <primitive object={obj} scale={2}/> 
    );
  } else {
    return <></>
  }
  
}