import Head from 'next/head'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Intro from '../components/Intro';
import { useMoralis } from 'react-moralis'
import Link from 'next/link'
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
import { useEffect, Suspense, useState } from "react";
import { Moralis } from 'moralis';
import { Card, Avatar, Image, Tooltip, Modal, Input, Alert, Spin, Button } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, LoadingOutlined  } from '@ant-design/icons';

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const { Meta } = Card;

export default function Home() {

  const [theNFTs, setNFTs] = useState([]);

  async function x() {
    Moralis.start({appId: 'lJOarUuAlWplKRCkGjvNNfQl2bY8OFAExeETwJS5', serverUrl: 'https://h9gw6kcvgoj4.usemoralis.com:2053/server'});
    const query = new Moralis.Query('NFTData');
    const results = await query.find();
    //console.log('nftz', results)
    setNFTs(results)
  }

  useEffect(() => {
    x()
  }, [])

  //console.log('nftz state', theNFTs)

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

          <div className='w-full pr-8 m-0 mt-4 text-white flex justify-between flex-wrap mb-8'>
            {theNFTs.map((nft, index) => (
              <div key={index} className='mb-8 cursor-pointer'>
                <div className='h-96'>

                <Card
                  style={{ width: 400, borderColor: '#141414' }}
                  cover={
                    <Canvas>
                      <Suspense fallback={<Loader />}>
                      <ambientLight intensity={0.2} />
                      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                      <pointLight position={[-10, -10, -10]} />
                        <Model loader={nft.attributes.loader} url={nft.attributes.model} colorMap={nft.attributes.color} normalMap={nft.attributes.normal} roughnessMap={nft.attributes.roughness}/>
                        <OrbitControls autoRotate />
                        <color attach='background' args={['#121212']}></color>
                      </Suspense>
                    </Canvas>
                  }

                >            
                <Link href={{
                    pathname: '/nfts/' + nft.attributes.contract + "/" + nft.attributes.tokenId,
                    
                }} key={nft.name} >
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={nft.attributes.name}
                    description={nft.attributes.description}
                  />            
                </Link>
                </Card>

                </div>
              </div>
            ))}
            {theNFTs.map((nft, index) => (
              <div key={index} style={{width:400}}/>
            ))}
          </div>
        </main>

      </div>
    </>
  )
}
