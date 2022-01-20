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
import { Model, Loader } from "../components/Model"
import Web3 from 'web3';
import Moralis from 'moralis';

export default function Home() {
    
    const { web3, enableWeb3, Moralis, account, provider } = useMoralis();
    const { error, isUploading, moralisFile, saveFile } = useMoralisFile();

    const [uploadError, setUploadError] = useState('')
    const [getFile, setFile] = useState(undefined);
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
          //console.log("mongus", fileTypeVar)
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
            
            const contract = new web3.eth.Contract(nftABI, nftContract);
            

            const file = new Moralis.File(getFile.name, getFile);
            await file.saveIPFS();
            
            const accounts = await web3.eth.getAccounts();
            await contract.methods.createToken(file.ipfs()).send({from: accounts[0]});

            // Save file reference to Moralis
            const fileObject = new Moralis.Object('fileObject')
            fileObject.set('fileName', getFile?.name)
            fileObject.set('fileData', file)
            await fileObject.save()

            // Retrieve file (for testing, u can delete later )
            const query = new Moralis.Query('fileObject')
            query.equalTo('fileName', getFile.name) // fileName depends on NFT 
            query.find().then(async function ([fileObject]) {
              const ipfs = fileObject.get('fileData').ipfs()
              const hash = fileObject.get('fileHash')
              const type = fileObject.get('fileType');
              const name = fileObject.get('fileName');
              console.log('IPFS url', ipfs)
              console.log('IPFS hash', hash)
              console.log('type of file: ', type)
              console.log('name of file: ', name)

            })

        }

        
    
        
    }

    return (
        <>
            <div className="flex flex-col items-center justify-top py-2 w-full">
                <Head>
                <title>Moralis-Hackathon</title>
                <link rel='icon' href='/favicon.ico'></link>
                </Head>
                <main className='w-full'>
                    <h1 className='text-2xl'>Upload Your NFT</h1>

                    <input
                        type="file"
                        multiple accept =".gltf, .obj, .fbx"
                        ref={uploadRef}
                        onChange={handleUpload}
                        className="flex text-base px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer"
                        style={{ display: '' }}
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
        </>
    )
}
