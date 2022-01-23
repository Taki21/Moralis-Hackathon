import { nftContract, nftABI } from '../components/abi/IERC721';
import { useMoralis, useMoralisFile, useMoralisWeb3Api, useNFTBalances } from 'react-moralis';
import { Card, Image, Tooltip, Modal, Input, Alert, Spin, Button } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
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
  const [loading, setLoading] = useState('not-loaded')
  const [nftURIs, setURIs] = useState([])
  /*const account = useMoralisWeb3Api();
    const { web3, enableWeb3, Moralis } = useMoralis();
    const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
    const { getNFTBalances, data, isLoading, isFetching } = useNFTBalances();*/
    
  async function getUserNFTs () {
    if(isAuthenticated) {
      const nfts = await Moralis.Web3API.account.getNFTs({chain: 'avalanche testnet', address: user.get("ethAddress") })

      setUserNFTs(nfts.result)
      //console.log(nfts.result)
    }
  }

  async function getURI() {
    let nfts = []
    userNFTs.map(async (nft, index) => {
      const fullTokenURI = `https://dweb.link/ipfs/${nft.token_uri}` 
      const meta = await axios.get(fullTokenURI)
      //console.log(meta)
      let item = meta.data.image
      //console.log(item)
      const uri = `https://dweb.link/ipfs/${item.replace(/^ipfs:\/\//, "")}`
      //console.log(uri)
      nfts.push(uri)
    })
    //console.log("x", nfts)
    setURIs(nfts)    
    setLoading('loaded')
    //console.log(nftURIs) 
  }

  useEffect(() => {
    getUserNFTs()
    getURI() 

  }, [loading]) 

  if(loading === 'loaded' && !userNFTs.length) return <h1>Loading...</h1> 
  else {
    return (
      <div className='w-full m-0 '>
        {userNFTs.map((nft, index) => (
          <div key={index}>
            <div className='h-1/2 w-1/4'>
              <h1>NFTs : {nft.name}</h1>
              <Canvas>
                <Suspense fallback={<Loader />}> 
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                    <Model loader={OBJLoader} url={nftURIs[index]}/>
                  <OrbitControls />
                  <Environment preset="sunset" background />
                </Suspense>
              </Canvas>
            </div>
          </div>
        ))}
        
      </div>
    )
  }    
}