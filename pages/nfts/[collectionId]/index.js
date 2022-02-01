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

Profile.getInitialProps = async (context) => {
  const address = context.query.collectionId
  const respone = await fetch('https://moralis-hackathon-zeta.vercel.app/api/'+ address)
  const data = await respone.json()

  const promises = []

  data.allNfts.result.map((nft) => {
    if(nft.token_uri !== null && nft.token_uri.indexOf('https://') === -1 && nft.token_uri.indexOf('http://') === -1) {
      const cidbase = nft.token_uri.substring(nft.token_uri.lastIndexOf('ipfs')).replace(/^ipfs:\/\//, "")
      const cid = cidbase.substring(0, cidbase.indexOf('/'))
      //console.log('x', cid)
      const fullTokenURI = `https://${cid}.ipfs.dweb.link/metadata.json`    
      //console.log(fullTokenURI) 
      promises.push(fullTokenURI)
    }
  })

  //console.log(promises)

  const items = await Promise.allSettled(promises.map(async (nft, index) => { 
    const meta = await axios.get(nft) 
    if(meta.data.fileType.length > 0) {
      //console.log(meta.data.fileType)
      let item = meta.data.image
      const uri = `https://dweb.link/ipfs/${item.replace(/^ipfs:\/\//, "")}`
      let r = {
        nft: meta.data,
        uri: uri,
      }
      return r
    } 
  })) 

  return {
    getNFTs: items
  }
}

export default function Profile(getNFTs) {
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

  //console.log(getNFTs)
 

 
  if(loading === 'loading') return <h1>Loading ... </h1>
  else {
    return (
      <div className=''>   
        <div className='flex items-center'>
          <h1 className='text-white text-3xl my-4'>NFTs from {collectionId}</h1>
          <button className='flex ml-3 max-h-12 text-base px-3 py-2 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer' onClick={() => (loading === 'not-loaded' ? setLoading('loaded') : setLoading('not-loaded'))}>Refresh NFTs</button>       
        </div> 

        <div className='w-full pr-8 m-0 mt-4 text-white flex justify-between flex-wrap mb-8'>
        {getNFTs.getNFTs.map((nft, index) => ( 
          <div key={index} className='mb-8'>
            {nft.status === 'fulfilled' ? (
              <div className='h-96'>

              <Card
                style={{ width: 400 }} 
                cover={
                  <Canvas>
                    <color attach='background' args={["black"]}></color>
                    <Suspense fallback={<Loader />}>
                    <ambientLight intensity={0.2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                      <Model loader={nft.value.nft.fileType} url={nft.value.uri}/>
                      <OrbitControls />

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
                  
              }} key={nft.name}>
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={nft.value.nft.name}
                  description="a part of the metaverse"
                />            
              </Link>
              </Card>

              </div>
            ) : ( <></> )
            }

          </div>
        ))}
        {getNFTs.getNFTs.map((nft, index) => (
          <div key={index} style={{width:400}}/>
        ))}
      </div>
      
      </div>
    )
  }    
}

/* 
 */
