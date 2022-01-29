import { useMoralis } from 'react-moralis';
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
  const [userNFTs, setUserNFTs] = useState([])
  const {Moralis, isAuthenticated} = useMoralis();
  const [nftsLoaded, setNFTsLoaded] = useState('not-loaded')
  const [loading, setLoading] = useState('not-loaded')
  const [nftURIs, setURIs] = useState([])
  const [theNFTs, setNFTs] = useState([])
  const [collectionURL, setcollectionURL] = useState([])
  const [tokenIDcol, settokenIDcol] = useState([])
  const [nftTokenIds, setNFTTokenIds] = useState([])

  const router = useRouter()
  const { collectionId } = router.query
    
  async function getUserNFTs () {
    if(isAuthenticated) {
      const options = { address: collectionId, chain: "avalanche testnet" };
      const nfts = await Moralis.Web3API.token.getAllTokenIds(options);

      let colUrl = []
      let idCol = []

      setUserNFTs(nfts.result)
      userNFTs.forEach(nft => {
        colUrl.push(nft.token_address)
        idCol.push(nft.token_id)
      });

      setcollectionURL(colUrl)
      settokenIDcol(idCol)
    }
  }

  async function getURI() {
    let uris = []
    let nfts = []
    let ids = []
    userNFTs.map(async (nft, index) => {

      try {    
        const fullTokenURI = `https://dweb.link/ipfs/${nft.token_uri.substring(nft.token_uri.lastIndexOf('ipfs')).replace(/^ipfs:\/\//, "")}`    
        console.log(fullTokenURI) 
        const meta = await axios.get(fullTokenURI) 
        if(meta.data.fileType.length != 0) {
          let item = meta.data.image
          const uri = `https://dweb.link/ipfs/${item.replace(/^ipfs:\/\//, "")}`
          uris.push(uri)
          ids.push(nft.token_uri.substring(0, nft.token_uri.indexOf("/")))
          nfts.push(meta.data)
        } 
      } catch (e) {
        console.log("derivative of e", e)
      }
    }) 
    setURIs(uris)
    setNFTs(nfts)
    setNFTTokenIds(ids)
    setLoading('loaded')
  }

  useEffect(() => {
    getUserNFTs()
    getURI()
  }, [loading])  
 
  if(loading === 'loaded' && nftsLoaded === 'loaded' && !userNFTs.length) return <><h1>Loading ... </h1></>
  else {
    return (
      <div className=''>   
        <div className='flex items-center'>
          <h1 className='text-white text-3xl my-4'>NFTs from {collectionId}</h1>      
          <button className='flex ml-3 max-h-12 text-base px-3 py-2 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer' onClick={() => (loading === 'not-loaded' ? setLoading('loaded') : setLoading('not-loaded'))}>Refresh NFTs</button> 
        </div>
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
                      <Model loader={nft.fileType} url={nftURIs[index]}/>
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
              <Link href={{
                  pathname: '/nfts/' + collectionURL[index] + "/" + tokenIDcol[index],
                  
              }} key={nft.name} >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={nft.name}
                  description="a part of the metaverse"
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
      
      </div>
    )
  }    
}

/* 
 */