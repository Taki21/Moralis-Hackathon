import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useRouter } from 'next/router'
import { Card, Avatar } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import Model from '../../../components/Model';
import axios from 'axios';
import {
  Environment,
  OrbitControls,
  Html,
  useProgress
} from "@react-three/drei";

const { Meta } = Card;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default function Profile() {
  const [tokenNFT, setTokenNFT] = useState(undefined)
  const [tokenURI, setTokenURI] = useState(undefined)
  const [tokenType, setTokenType] = useState(undefined)
  const { Moralis, enableWeb3, isAuthenticated } = useMoralis();
  const [nftLoaded, setNFTLoaded] = useState('not-loaded')
  const [loading, setLoading] = useState('not-loaded')
  const [firstLoad, setFirstLoad] = useState(false)

  const router = useRouter()
  const { collectionId, nftId } = router.query
    
  async function getTokenNFT () {
    if(isAuthenticated) {
      const options = { address: collectionId, token_id: nftId, chain: "avalanche testnet" };
      const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(options);

      if(tokenIdMetadata.contract_type === 'ERC721') {
        setTokenNFT(tokenIdMetadata)
        setNFTLoaded('loaded')
        console.log("a", tokenNFT)
      }
    } 
  }

// execute on load
  useEffect(() => {
    if(firstLoad === false) {
      getTokenNFT().then(() => {
        setFirstLoad(true)
      })
    }
  }, [loading])

  /*async function getTokenURI() {
    if(tokenNFT.contract_type === 'ERC721') {  
      const fullTokenURI = `https://dweb.link/ipfs/${tokenNFT.token_uri.substring(tokenNFT.token_uri.lastIndexOf('ipfs')).replace(/^ipfs:\/\//, "")}`
      console.log("www", fullTokenURI)
      const meta = await axios.get(fullTokenURI)
      if(meta.data.fileType !== undefined) {
          console.log(meta.data)
          let item = await meta.data.image
          const uri = `https://dweb.link/ipfs/${item.replace(/^ipfs:\/\//, "")}`
          setTokenURI(uri)
          setTokenType(meta.data.fileType)
          console.log(meta.data.fileType)
          console.log(tokenType)
          console.log(uri)
          console.log(loading)  
          if(tokenNFT !== undefined) setLoading('loaded')  
      } 
    }
  }*/
   
  if(loading === 'not-loaded' && nftLoaded === 'not-loaded') return <button className='flex ml-3 max-h-12 text-base px-3 py-2 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer' onClick={() => (loading === 'not-loaded' ? setLoading('loaded') : setLoading('not-loaded'))}>Refresh NFTs</button> 

  else {
    return (  
      <>
        <p></p>
        <div className='w-1/2'>
        <button className='flex ml-3 max-h-12 text-base px-3 py-2 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer' onClick={() => (loading === 'not-loaded' ? setLoading('loaded') : setLoading('not-loaded'))}>Refresh NFTs</button> 
          <Canvas>
            <Suspense fallback={<Loader />}>
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

                  
                  <></>
                
                <OrbitControls />
                <Environment preset="apartment" background />
            </Suspense> 
          </Canvas>
        </div>
      </>
    )
  }
} 

/* 

<div key={tokenNFT.index_id}>
            <div className='h-96'>
                <Card
                style={{ width: 400 }} 
                cover={
                    <Canvas>
                    <Suspense fallback={<Loader />}>
                    <ambientLight intensity={0.2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                        <Model loader={tokenNFT.fileType} url={tokenURI}/>
                        <OrbitControls />
                        <Environment preset="apartment" background />
                    </Suspense>
                    </Canvas>
                }
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
                >            
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={tokenNFT.name}
                    description="a part of the metaverse"
                />            
                </Card>
            </div>
        </div>
 */

/* import { useRouter } from 'next/router'
import { useMoralis } from 'react-moralis';
import { useState, useEffect } from 'react'

const Post = () => {

    const [colNFTs, setColNFTs] = useState([])
    const [colNames, setNames] = useState([])
    const [colIds, setIds] = useState([])
    const { Moralis, isAuthenticated, enableWeb3 } = useMoralis();

    const router = useRouter()
    const { collectionId, nftId } = router.query

    async function getNFTs () {
        const options = { address: collectionId, token_id: nftId, chain: "avalanche testnet" };
        const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(options);

        console.log(tokenIdMetadata) 
    }   

    getNFTs()

    return (
        <>
        <p>Collection: </p>
        
        </>
    )
}

export default Post  */