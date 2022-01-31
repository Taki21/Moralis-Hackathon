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
          <h1 className='text-3xl pt-4'>Recent 3D NFTs</h1>

          <Card/> 
          

          
        </main>

      </div>
    </>
  )
}
