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
  const respone = await fetch('http://localhost:3000/api/'+ address)
  const data = await respone.json()

  const items = await Promise.allSettled(data.allNfts.result.map(async (nft, index) => {
    if(nft.token_uri !== null && nft.token_uri.indexOf('https://') === -1 && nft.token_uri.indexOf('http://') === -1) {
      const cidbase = nft.token_uri.substring(nft.token_uri.lastIndexOf('ipfs')).replace(/^ipfs:\/\//, "")
      const cid = cidbase.substring(0, cidbase.indexOf('/'))
      //console.log('x', cid)
      const fullTokenURI = `https://${cid}.ipfs.dweb.link/metadata.json`    
      console.log(fullTokenURI) 
      const meta = await axios.get(fullTokenURI) 
      if(meta.data.fileType.length > 0) {
        console.log(meta.data.fileType)
        let item = meta.data.image
        const uri = `https://dweb.link/ipfs/${item.replace(/^ipfs:\/\//, "")}`
        let r = {
          nft: meta.data,
          uri: uri,
        }
        return r
      } 
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

  console.log(getNFTs)
 
  
  //console.log('cuh', theNFTs)
 
  if(loading === 'loading' && !theNFTs.length) return <h1>Loading ... </h1>
  else {
    return (
      <div className=''>   
        <div className='flex items-center'>
          <h1 className='text-white text-3xl my-4'>NFTs from {collectionId}</h1>      
        </div>

      
      </div>
    )
  }    
}

/* 
 */