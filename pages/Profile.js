import { nftContract, nftABI } from '../components/abi/IERC721';
import { useMoralis, useMoralisFile, useMoralisWeb3Api, useNFTBalances } from 'react-moralis';

import { Card, Avatar, Image, Tooltip, Modal, Input, Alert, Spin, Button } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, LoadingOutlined  } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
import Link from 'next/link'

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";
import Model from '../components/Model';
import axios from 'axios';
import {
  Environment,
  OrbitControls,
  Html,
  useProgress
} from "@react-three/drei";

const { Meta } = Card;

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1000px",
    gap: "10px",
  },
};

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default function Profile() {
  const [userNFTs, setUserNFTs] = useState([])
  const { enableWeb3, Moralis, isAuthenticated, user} = useMoralis();
  const [nftsLoaded, setNFTsLoaded] = useState('not-loaded')
  const [loading, setLoading] = useState('not-loaded')
  const [nftURIs, setURIs] = useState([])
  const [theNFTs, setNFTs] = useState([])
  const [collectionURL, setcollectionURL] = useState([])
  const [tokenIDcol, settokenIDcol] = useState([])
  const [nftTokenIds, setNFTTokenIds] = useState([])
  const [colorMaps, setColorMaps] = useState([])
  const [normalMaps, setNormalMaps] = useState([])
  const [roughnessMaps, setRoughnessMaps] = useState([])
  /*const account = useMoralisWeb3Api();
    const { web3, enableWeb3, Moralis } = useMoralis();
    const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
    const { getNFTBalances, data, isLoading, isFetching } = useNFTBalances();*/

  async function getUserNFTs () {
    if(isAuthenticated) {
      const nfts = await Moralis.Web3API.account.getNFTsForContract({chain: 'avalanche testnet', address: user.get("ethAddress"), token_address: nftContract }).then(setNFTsLoaded('loaded'))

      let colUrl = []
      let idCol = []

      //console.log(nfts)

      setUserNFTs(nfts.result)
      userNFTs.forEach(nft => {
        colUrl.push(nft.token_address)
        idCol.push(nft.token_id)
      });

      setcollectionURL(colUrl)
      settokenIDcol(idCol)

      //console.log("suss", nfts.result) 
    }
  }

  async function getURI() {
    let uris = []
    let coloruris = []
    let normaluris = []
    let roughnessuris = []
    let nfts = []
    let ids = []
    userNFTs.map(async (nft, index) => {

      try {    
        const fullTokenURI = `https://dweb.link/${nft.token_uri.substring(nft.token_uri.lastIndexOf('ipfs')).replace(/^ipfs:\/\//, "")}`    
       // console.log('d', fullTokenURI) 
        const meta = await axios.get(fullTokenURI) 
        if(meta.data.fileType.length != 0) {
          //console.log(meta)
          //console.log("joe", meta.data)   
          let item = meta.data.image
          let item2 = meta.data.color
          let item3 = meta.data.normal
          let item4 = meta.data.roughness
          //console.log(item) 
          const uri = `https://dweb.link/ipfs/${item.replace(/^ipfs:\/\//, "")}`
          const coloruri = `https://dweb.link/ipfs/${item2.replace(/^ipfs:\/\//, "")}`
          const normaluri = `https://dweb.link/ipfs/${item3.replace(/^ipfs:\/\//, "")}`
          const roughnessuri = `https://dweb.link/ipfs/${item4.replace(/^ipfs:\/\//, "")}`
          //console.log(uri)
          uris.push(uri)
          coloruris.push(coloruri)
          normaluris.push(normaluri)
          roughnessuris.push(roughnessuri)
          ids.push(nft.token_uri.substring(0, nft.token_uri.indexOf("/")))
          nfts.push(meta.data)
        } 
      } catch (e) {
        //console.log("derivative of e", e)
      }
    }) 
    //console.log("x", nfts)
    setURIs(uris)
    setColorMaps(coloruris)
    setNormalMaps(normaluris)
    setRoughnessMaps(roughnessuris)
    setNFTs(nfts)
    setNFTTokenIds(ids)
    setLoading('loaded')
   // console.log('uriz', nftURIs)
   // console.log('wer', userNFTs)
  }

  useEffect(() => {
    getUserNFTs()
    getURI()
  }, [loading])  
 
  if(loading === 'loaded' && nftsLoaded === 'loaded' && !userNFTs.length) return <div className='h-5/6 w-full flex flex-col items-center place-content-center'><h1 className='mt-8 text-xl font-bold'>You have no 3D NFTs! Purchase some from the Marketplace!</h1></div>
  else {
    return (
      <>   
      <div className='flex items-center'>
        <h1 className='text-white text-3xl my-4'>My Minted NFTs</h1>      
        <button className='flex ml-3 max-h-12 text-base px-3 py-2 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer' onClick={() => (loading === 'not-loaded' ? setLoading('loaded') : setLoading('not-loaded'))}>Refresh NFTs</button> 
      </div>
      <div className='w-full pr-8 m-0 mt-4 text-white flex justify-between flex-wrap mb-8'>
        {theNFTs.map((nft, index) => (
          <div key={index} className='mb-8'>
            <div className='h-96'>

            <Card
              style={{ width: 400, borderColor: '#1C1C1C' }}
              cover={
                <Canvas>
                  <Suspense fallback={<Loader />}>
                  <ambientLight intensity={0.2} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <pointLight position={[-10, -10, -10]} />
                    <Model loader={nft.fileType} url={nftURIs[index]} colorMap={colorMaps[index]} normalMap={normalMaps[index]} roughnessMap={roughnessMaps[index]}/>
                    <OrbitControls />
                    <color attach='background' args={['#121212']}></color>
                  </Suspense>
                </Canvas>
              }
            >            

              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={nft.name}
                description="A Part of the Metaverse!"
              />            

            </Card>

            </div>
          </div>
        ))}
                    {theNFTs.map((nft, index) => (
              <div key={index} style={{width:400}}/>
            ))}
      </div>
      
      </>
    )
  }    
}