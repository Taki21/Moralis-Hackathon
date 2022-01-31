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

Profile.getInitialProps = async (context) => {
  const address = context.query.collectionId
  const id = context.query.nftId
  const respone = await fetch('http://localhost:3000/api/'+ address +'/'+ id)
  const data = await respone.json()

  return {
    nft: data
  }
}

export default function Profile(nft) {
  //const [tokenNFT, setTokenNFT] = useState(undefined)
  const [tokenURI, setTokenURI] = useState(undefined)
  const [tokenType, setTokenType] = useState(undefined)
  const { Moralis, enableWeb3, isAuthenticated } = useMoralis();
  const [nftLoaded, setNFTLoaded] = useState('not-loaded') 
  const [loading, setLoading] = useState('not-loaded')
  const [firstLoad, setFirstLoad] = useState(false)

  const router = useRouter()
  const { collectionId, nftId } = router.query
    
  console.log('ok', nft) 

// call getTokenNFT() when the component is loaded
  useEffect(() => {
    getTokenURI()
  }, [loading]) 



  async function getTokenURI() {
    console.log('bruh', nft.nft)
    if(nft.nft.tokenIdMetadata.contract_type === 'ERC721') {  
      const fullTokenURI = `https://dweb.link/ipfs/${nft.nft.tokenIdMetadata.token_uri.substring(nft.nft.tokenIdMetadata.token_uri.lastIndexOf('ipfs')).replace(/^ipfs:\/\//, "")}`
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
          setLoading('loaded')  
      } 
    }
  }
   
  if(loading === 'not-loaded' && nftLoaded === 'not-loaded') return <h1>Loading...</h1>
  else {
    return (  
      <>
        <p></p>
        <div className='w-1/2'>
          <Canvas>
            <Suspense fallback={<Loader />}>
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

                <Model loader={tokenType} url={tokenURI}/>
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