import Head from 'next/head'
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { nftContract, nftABI } from '../components/abi/IERC721';
import { useMoralis, useMoralisFile, useWeb3ExecuteFunction } from 'react-moralis';
import React, { useRef, useState, ChangeEvent, Suspense } from 'react'
import {
  Environment,
  OrbitControls,
  Html,
  useProgress
} from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Model } from "../components/Model"
import Web3 from 'web3';
import Moralis from 'moralis';

import { NFTStorage, File } from 'nft.storage'
import { pack } from 'ipfs-car/pack';

// using mine for now cus i cant access urs 
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEUzRkQ4ZDYyYTI1OGY3ODEzQkM1MTg1MUNiMTQ3ODg2Mzk0NDM0ODMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0Mjg5MzEwNTI5NiwibmFtZSI6InN0YXJiaXRzIn0.wuI_px6tWzssmEctp4mowCUL1FO9NQNnbvPlT1nmgco'
const client = new NFTStorage({ token: apiKey })

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default function Home() {
    
    const { web3, enableWeb3, Moralis, account, provider } = useMoralis();
    const { error, isUploading, moralisFile, saveFile } = useMoralisFile();

    const [uploadError, setUploadError] = useState('')
    const [getFile, setFile] = useState(undefined);
    const [textures, setTextures] = useState([]);
    const [preview, setPreview] = useState(false);
    const uploadRef = useRef(null)
    // const contract = useWeb3ExecuteFunction()
    const contractProcessor = useWeb3ExecuteFunction();

    //let nftFile: File = null; // ???
    let nftFileName = "";

    const fileTypeVar = "";
    
    const handleUpload = (
      e
    ) => {
      if (e.target.files === null) {
        return
      }
    
      const file = e.target.files[0] //ahh this is the actual file we need to store
      setFile(file);
      
      if (file) { 

        const fileReader = new FileReader()
        fileReader.onload = (event) => {
          const contents = event?.target?.result
          // do something with the file contents here
          
          nftFileName = file.name;
          fileTypeVar = contents.Type;
        }
  
        // e.target.value = ''
        fileReader.readAsText(file)
      } else {
        setUploadError(
          'File could not be uploaded. Please try again.'
        )
      }
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
              test: getFile,
            });
            
            const metadataURI = metadata.url.replace(/^ipfs:\/\//, "")
            console.log(metadata.url)
            console.log(metadataURI)

            const contract = new web3.eth.Contract(nftABI, nftContract);
            
            const accounts = await web3.eth.getAccounts();
            await contract.methods.createToken(metadataURI).send({from: accounts[0]});

        }    
    }
    
    async function previewModel() {
      const fileType = getFile.name.substring(getFile.name.lastIndexOf(".") + 1, getFile.name.length)
      const metadata = await client.store({
        name: getFile.name,
        description: "in the metaverse",
        fileType: fileType,
        image: getFile,
        test: getFile,
      });
      
      const metadataURI = metadata.url.replace(/^ipfs:\/\//, "")
      console.log(metadata.url)
      console.log(metadataURI)
    }
    
    console.log(getFile)

    return (
        <div className='flex'>
          <div className=''>
            {
              preview ? (
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
              ) : (
                <Canvas>
                  <Suspense fallback={<Loader />}>
                    <ambientLight intensity={0.2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <Model loader={'obj'} url='/BOX.obj'/>
                    <OrbitControls />
                    <Environment preset="apartment" background />
                  </Suspense>
                </Canvas>
              )
            }
          </div>

          <div className="flex flex-col items-center justify-top py-2 w-full">
              <Head>
              <title>Moralis-Hackathon</title>
              <link rel='icon' href='/favicon.ico'></link>
              </Head>
              <main className='w-full'>
                  <h1 className='text-2xl'>Upload Your NFT</h1>

                  <input
                      type="file"
                      multiple accept =".gltf, .obj, .fbx, .glb, .mtl"
                      ref={uploadRef}
                      onChange={handleUpload}
                      className="flex text-base px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer"
                      style={{ display: 'none' }}
                  />
                  <button onClick={() => uploadRef.current?.click()} className="flex text-base px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer">
                      Upload File
                  </button>

                  <button onClick={mintNFT} className="flex text-base px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer">
                      Mint
                  </button>
                  {uploadError ? <p>{uploadError}</p> : null}

                  
              </main>

          </div>
        </div>
    )
}
