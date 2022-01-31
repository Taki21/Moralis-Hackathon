import Head from 'next/head'
import { Canvas } from "@react-three/fiber";
import { nftContract, nftABI } from '../components/abi/IERC721';
import { marketAddress, marketABI } from '../components/abi/Marketplace';
import { useMoralis, useMoralisFile, useWeb3ExecuteFunction } from 'react-moralis';
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
import { pack } from 'ipfs-car/pack';

// using mine for now cus i cant access urs 
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEUzRkQ4ZDYyYTI1OGY3ODEzQkM1MTg1MUNiMTQ3ODg2Mzk0NDM0ODMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0Mjg5MzEwNTI5NiwibmFtZSI6InN0YXJiaXRzIn0.wuI_px6tWzssmEctp4mowCUL1FO9NQNnbvPlT1nmgco'
const client = new NFTStorage({ token: apiKey })

export function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export function DefaultModel() {
  return (
    <mesh
      scale={2}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

export default function Home() {
    
    const { web3, enableWeb3, Moralis, account, provider } = useMoralis();
    const { error, isUploading, moralisFile, saveFile } = useMoralisFile();

    const [uploadError, setUploadError] = useState('')
    const [getFile, setFile] = useState(undefined);
    const [fileType, setFileType] = useState(undefined);
    const [preview, setPreview] = useState(false);
    const [fileTexture, setFileTexture] = useState(undefined)

    // Model URIS FOR PREVIEW
    const [_guri, setURI] = useState(undefined)
    const [_curi, setCURI] = useState(undefined)
    const [_nuri, setNURI] = useState(undefined)
    const [_ruri, setRURI] = useState(undefined)

    // texture FILES
    const [colorTexture, setColorTexture] = useState(undefined)
    const [normalTexture, setNormalTexture] = useState(undefined)
    const [roughTexture, setRoughTexture] = useState(undefined)

    const [price, setPrice] = useState('0')
    const [txres, setTxres] = useState(undefined)

    const uploadRef = useRef(null)
    const textureCRef = useRef(null)
    const textureNRef = useRef(null)
    const textureRRef = useRef(null)
    
    useEffect(() => {
      previewModel()
    }, [preview, getFile, colorTexture, normalTexture, roughTexture]) 

    const handleUpload = async (e) => {
      //setPreview(false);
      console.log("upload handled")

      if (e.target.files === null) {
        return
      }
    
      const file = e.target.files[0]
      setFile(file)      
      console.log('file', getFile)
      setFileType(file.name.substring(file.name.indexOf(".") + 1))
    }

    async function mintNFT() { 
      await Moralis.enableWeb3()
      const web3 = new Web3(Moralis.provider)
        // cmhere BOIIIII
        // console.log("who???");
        // console.log("aight so: " + getFile?.name)

        if(web3 && getFile != undefined) {
          const fileType = getFile.name.substring(getFile.name.lastIndexOf(".") + 1, getFile.name.length)
            
            const metadata = await client.store({
              name: getFile.name,
              description: "in the metaverse",
              fileType: fileType,
              image: getFile,
              color: colorTexture,
              normal: normalTexture,
              roughness: roughTexture
            });
            
            setFileType(fileType)
            console.log("in mint", metadata.url)

            const contract = new web3.eth.Contract(nftABI, nftContract);
            const market = new web3.eth.Contract(marketABI, marketAddress);
            
            const accounts = await web3.eth.getAccounts();

            console.log('price: ', price)
            const mintTx = await contract.methods.createToken(metadataURI).send({from: accounts[0]}, function(error, receipt) {
              console.log(receipt)
              setTxres(receipt)
              return receipt
            });
            console.log('who?', mintTx)
            const tokenId = mintTx.events.Transfer.returnValues.tokenId
            console.log("tokenID", tokenId)
            const fee = await market.methods.getListingPrice().call({from: accounts[0]});
            console.log('listingfee', fee)
            //const tokenId = 

            await market.methods.createMarketItem(nftContract, tokenId, web3.utils.toWei(price, 'ether')).send({from: accounts[0], value: fee});
            /*const NFTData = Moralis.Object.extend('NFTData');
            const nftData = new NFTData();*/
        }    
    }
    
    async function previewModel() {
      if (getFile === undefined) return
      //if (preview) return
      const type = getFile.name.substring(getFile.name.lastIndexOf(".") + 1, getFile.name.length)
      const metadata = await client.store({
        name: getFile.name,
        description: "in the metaverse",
        fileType: type,
        image: getFile,
        color: colorTexture,
        normal: normalTexture,
        roughness: roughTexture
      });
      
      console.log('leData', metadata)

      let obj = metadata.data.image.href
      const uri = `https://dweb.link/ipfs/${obj.replace(/^ipfs:\/\//, "")}`
      setURI(uri)

      if(colorTexture !== undefined) {
        let colorMap = metadata.data.color.href
        const curi = `https://dweb.link/ipfs/${colorMap.replace(/^ipfs:\/\//, "")}`
        console.log('curi', curi)
        setCURI(curi)
      }

      if(normalTexture !== undefined) {
        let normalMap = metadata.data.normal.href
        const nuri = `https://dweb.link/ipfs/${normalMap.replace(/^ipfs:\/\//, "")}`
        console.log('nuri', nuri)
        setNURI(nuri)
      }

      if(roughTexture !== undefined) {
        let roughnessMap = metadata.data.roughness.href
        const ruri = `https://dweb.link/ipfs/${roughnessMap.replace(/^ipfs:\/\//, "")}`
        console.log('ruri', ruri) 
        setRURI(ruri)
      }

      console.log("_guri state", _guri)
      console.log("_curi state", _curi)
      console.log("_nuri state", _nuri)
      console.log("_ruri state", _ruri)

      // setPreview(true);   
    }

    const handleCTextureUpload = async (e) => {
      console.log("texture color uploaded")
      if (e.target.files === null) {
        return
      }
      const file2 = e.target.files[0] 
      setColorTexture(file2)      
      console.log('e', file2)
      console.log(colorTexture)
    }

    const handleNTextureUpload = async (e) => {
      console.log("texture normal uploaded")
      if (e.target.files === null) {
        return 
      }
      const file3 = e.target.files[0]
      setNormalTexture(file3)
      console.log(normalTexture)
    }

    const handleRTextureUpload = async (e) => {
      console.log("texture roughness uploaded")
      if (e.target.files === null) {
        return
      }
      const file4 = e.target.files[0]
      setRoughTexture(file4)
      console.log(roughTexture)
    }

    return (
        <div className='flex my-4 mr-8 h-5/6'>

          <div className="flex flex-col items-center justify-top p-12 w-full bg-[#101011] rounded-l-3xl">
              <Head>
              <title>Moralis-Hackathon</title>
              <link rel='icon' href='/favicon.ico'></link>
              </Head>
              <main className='w-full'>
                  <h1 className='text-3xl font-bold'>Upload Your NFT</h1>

                  <div className='flex'>
                    <input className="bg-[#1C1C1C] w-3/4 resize-none rounded-2xl p-4 focus:outline-none mt-8 mr-4" type="text" placeholder="Name of Your NFT" />
                    
                    <input type="number" id="price" name="price" onChange={(e) => setPrice(e.target.value)}
                      min="0" max="999" placeholder="Price" className="bg-[#1C1C1C] w-1/4 resize-none rounded-2xl p-4 focus:outline-none mt-8"
                    />
                  </div>

                  <input
                      type="file"
                      multiple accept =".gltf, .obj, .glb, .mtl"
                      ref={uploadRef}
                      onChange={handleUpload}
                      className="flex text-base px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer"
                      style={{ display: 'none' }}
                  />

                  <input type="file"
                          multiple accept =".png, .jpeg, .jpg"
                          ref={textureCRef}
                          onChange={handleCTextureUpload}
                          className="hidden"
                  />

                  <input type="file"
                          multiple accept =".png, .jpeg, .jpg"
                          ref={textureNRef}
                          onChange={handleNTextureUpload}
                          className="hidden"
                  />

                  <input type="file"
                          multiple accept =".png, .jpeg, .jpg"
                          ref={textureRRef}
                          onChange={handleRTextureUpload}
                          className="hidden"
                  />

                  <textarea className='bg-[#1C1C1C] w-full h-1/2 resize-none rounded-3xl p-4 focus:outline-none my-4' placeholder='Your 3D NFT Description'/>

                  <button id="btn" onClick={() => uploadRef.current?.click()} className="flex w-full text-base my-3 px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer justify-center">
                      <>Select Your 3D Model</>
                  </button>

                  <div className='flex'>
                    <button id="btnColor" onClick={() => textureCRef.current?.click()} className="w-full text-base my-3 px-9 py-3 mr-4 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer justify-center">
                        <>Color/Diffuse Map</>
                    </button>

                    <button id="btnNormal" onClick={() => textureNRef.current?.click()} className="w-full text-base my-3 px-9 py-3 mr-4 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer justify-center">
                        <>Normal Map</>
                    </button>

                    <button id="btnRough" onClick={() => textureRRef.current?.click()} className="w-full text-base my-3 px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer justify-center">
                        <>Roughness Map</>
                    </button>
                  </div>

                  <button onClick={mintNFT} className="flex text-base px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer">
                      Mint Your NFT
                  </button>

                  {uploadError ? <p>{uploadError}</p> : null}
              </main>
          </div>

          <div className='w-1/2'>
            {
              preview === true && _guri !== undefined ? (
                <>
                  {console.log("_guri", _guri), console.log('fileType', fileType)}
                  <Canvas>
                    <Suspense fallback={<Loader />}>
                    <ambientLight intensity={0.2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                      <Model loader={fileType} url={_guri}/>
                      <OrbitControls autoRotate />
                      <Environment preset="apartment" background />
                    </Suspense>
                  </Canvas>
                </>
              ) : (
                <Canvas >
                  <Suspense fallback={<Loader />}>
                    <ambientLight intensity={0.2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <DefaultModel/>
                    <OrbitControls autoRotate />  
                    <Environment preset="apartment" background />
                  </Suspense>
                </Canvas>
              )
            }
          </div>

        </div>
    )
}
