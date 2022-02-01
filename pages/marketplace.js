import { nftContract, nftABI } from '../components/abi/IERC721';
import { marketAddress, marketABI } from '../components/abi/Marketplace';
import React from 'react'
import { useState } from 'react';
import { Suspense } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react'
import {
  Environment,
  OrbitControls,
  Html,
  useProgress
} from "@react-three/drei";
import Model from "../components/Model"
import Web3 from 'web3';
import Moralis from 'moralis';
import axios from 'axios';
import { NFTStorage, File } from 'nft.storage'
import { useMoralis, useMoralisFile, useWeb3ExecuteFunction } from 'react-moralis';
import Head from 'next/head'
import { Canvas } from "@react-three/fiber";
import { Card, Avatar, Image, Tooltip, Modal, Input, Alert, Spin, Button } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, LoadingOutlined  } from '@ant-design/icons';
import Link from 'next/link'

const { Meta } = Card;

function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return <Html center>{progress} % loaded</Html>;
}

export default function Marketplace() { 

    const [theNFTs, setNFTs] = useState([]);

    async function x() {
      Moralis.start({appId: 'lJOarUuAlWplKRCkGjvNNfQl2bY8OFAExeETwJS5', serverUrl: 'https://h9gw6kcvgoj4.usemoralis.com:2053/server'});
      const query = new Moralis.Query('NFTData');
      const results = await query.find();
      console.log('nftz', results)
      setNFTs(results)
    }
  
    useEffect(() => {
      x()
    }, [])
  
    console.log('nftz state', theNFTs)
  
    return (
      <>
        <div className="flex flex-col items-center justify-top py-2 w-full">
          <Head>
            <title>Moralis-Hackathon</title>
            <link rel='icon' href='/favicon.ico'></link>
          </Head>
  
          <main className='w-full'>
            <h1 className='text-3xl pt-4'>Marketplace</h1>
  
            <div className='w-full pr-8 m-0 mt-4 text-white flex justify-between flex-wrap mb-8'>
              {theNFTs.map((nft, index) => (
                <div key={index} className='mb-8'>
                  <div className='h-96'>
  
                  <Card
                    style={{ width: 400 }}
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
                    actions={[
                      <SettingOutlined key="setting" />,
                      <EditOutlined key="edit" />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
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
            </div>
          </main>
  
        </div>
      </>
    )
}