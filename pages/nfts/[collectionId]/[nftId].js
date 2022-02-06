import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useRouter } from 'next/router'
import { Card, Avatar } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { nftContract, nftABI } from '../../../components/abi/IERC721';
import { marketAddress, marketABI } from '../../../components/abi/Marketplace';
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
import Web3 from 'web3';


const { Meta } = Card;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default function Profile() {
  //const [tokenNFT, setTokenNFT] = useState(undefined)
  const [tokenURI, setTokenURI] = useState(undefined)
  const [tokenType, setTokenType] = useState(undefined)
  const { Moralis, enableWeb3, isAuthenticated } = useMoralis();
  const [nftLoaded, setNFTLoaded] = useState('not-loaded') 
  const [loading, setLoading] = useState('not-loaded')
  const [firstLoad, setFirstLoad] = useState(false)
  const [nfts, setNFTs] = useState([]);

  const router = useRouter()
  const { collectionId, nftId } = router.query

  useEffect(() => {
    x()
  }, [loading]) 

  async function x() {
    Moralis.start({appId: 'lJOarUuAlWplKRCkGjvNNfQl2bY8OFAExeETwJS5', serverUrl: 'https://h9gw6kcvgoj4.usemoralis.com:2053/server'});
    const query = new Moralis.Query('NFTData');
    query.equalTo('tokenId', nftId);
    const results = await query.find();
    //console.log('nftz', results)
    setNFTs(results)
    setLoading('loaded')
  }

  async function buyNFT() {
    await Moralis.enableWeb3()
    const web3 = new Web3(Moralis.provider)

    if(web3) {
      const market = new web3.eth.Contract(marketABI, marketAddress);
      const accounts = await web3.eth.getAccounts();

      nfts.map(async (nft) => {      
        const price = web3.utils.toWei(nft.attributes.price, 'ether')
        await market.methods.createMarketSale(nftContract, nft.attributes.tokenId).send({from: accounts[0], value: price})
      })
    }
  }
   
  return (  
    <>
      <div className='flex mr-8 mt-8 h-[85.5%]'>
        <div className='w-full'>
          {nfts.map((nft) => (
            <Canvas>
              <Suspense fallback={<Loader />}>
              <ambientLight intensity={0.2} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} /> 

                  <Model loader={nft.attributes.loader} url={nft.attributes.model} colorMap={nft.attributes.color} normalMap={nft.attributes.normal} roughnessMap={nft.attributes.roughness}/>
                    <></>
                  
                  <OrbitControls autoRotate/>
                  <Environment preset='dawn' background />
              </Suspense> 
            </Canvas>
          ))}
        </div>
      </div>

      <div className='absolute bottom-16 right-16 flex justify-top items-center place-content-center p-6 bg-[#dfdfdf] rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 select-none'>
        {nfts.map((nft) => (
          <>
            <div className='border-r-[#707070] border-r mr-8'>
              <div className='flex flex-col mr-4'>
                <div className='flex'>
                  <h1 className='text-xl font-bold'>{nft.attributes.name}:&nbsp;</h1>
                  <h1 className='text-xl'>{nft.attributes.description}</h1>
                </div>

                <div className='flex flex-col mr-4'>
                  <h1 className='text-5xl font-bold text-[#b88f60]'>{parseFloat(nft.attributes.price).toFixed(2)} AVAX</h1>      
                  <h1 className='text-base m-0'>Price: $78.31</h1>      
                </div>
              </div>
            </div>

            <div className='flex flex-col items-center'>
              <h2 className='text-base font-bold pb-2'>Seller: {nft.attributes.seller.substring(0, 5) + '...' + nft.attributes.seller.substring((nft.attributes.seller.length - 4), nft.attributes.seller.length)}</h2>
              <button onClick={buyNFT} className="flex text-base px-9 py-3 rounded-2xl shadow-lg bg-[#b88f60] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#1c1c1c] rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer">
                  Purchase NFT
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  )
   
} 