import Head from 'next/head'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Intro from '../components/Intro';
import { useMoralis } from 'react-moralis'
import Card from '../components/Card';
import Model from '../components/Model'
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
import { useEffect, Suspense } from "react";

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default function Home() {

  return (
    <>
      <div className="flex flex-col items-center justify-top py-2 w-full">
        <Head>
          <title>Moralis-Hackathon</title>
          <link rel='icon' href='/favicon.ico'></link>
        </Head>

        <main className='w-full'>
          <Intro/>
          <h1 className='text-3xl pt-4'>Trending</h1>

          <Card/> 
          
          <div className='h-screen w-1/2'>
            <Canvas>
              <Suspense fallback={<Loader />}> 
              <ambientLight intensity={0.2} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
                <Model url="https://ipfs.moralis.io:2053/ipfs/QmdbiLJ3hJUCAR3Qh6sWqBhjHopWja7nFxmnJAW5Wx4W9a"/>
                <OrbitControls />
                <Environment preset="sunset" background />
              </Suspense>
            </Canvas>
          </div>
          
        </main>

      </div>
    </>
  )
}
