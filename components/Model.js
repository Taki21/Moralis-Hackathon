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
import { useTexture } from "@react-three/drei";
import { useMemo, useEffect, Suspense } from "react";
import { Mesh } from 'three' 
import { TextureLoader } from "three";

export function Loader() {
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
    
    const obj = useLoader(OBJLoader, props.url)

    if(props.colorMap !== undefined && props.normalMap !== undefined && props.roughnessMap !== undefined) { 
      const [
        colorMap,
        normalMap,
        roughnessMap
      ] = useLoader(TextureLoader, [
        props.colorMap,
        props.normalMap,
        props.roughnessMap
      ])

      const geometry = useMemo(() => {
        let g;
        obj.traverse((c) => {
          if (c.type === "Mesh") {
            const _c = c
            g = _c.geometry;
          }
        });
        return g;
      }, [obj]);

      return (
        <>
          <ambientLight intensity={0.2} />
          <directionalLight />
          <mesh geometry={geometry} scale={1}>
            <meshStandardMaterial
              map={colorMap}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
            />
          </mesh> 
        </>
      );
    } else return (
      <>
        <ambientLight intensity={0.2} />
        <directionalLight />
        <mesh geometry={geometry} scale={1}/>
      </>
    )
  } else if (props.loader === "fbx") {
    const obj = useLoader(FBXLoader, props.url);
    return (
      <primitive object={obj} scale={2}/> 
    );
  } else {
    return <></>
  }
  
}