import Head from 'next/head'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Intro from '../components/Intro';
import Card from '../components/Card';
import { FileError, FileRejection, useDropzone} from "react-dropzone"; 
import { nftContract, nftABI } from '../components/abi/IERC721';
import { useMoralis, useMoralisFile } from 'react-moralis';
import { useForm } from 'react-hook-form';
import app from 'next/app';
import axios from 'axios';
import React, { useRef, useState, ChangeEvent } from 'react'
import * as THREE from 'three'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';

export interface UploadableFile {
    file: File;
    errors: FileError[];
}

export default function Home(this : any) {
    
    const { web3, Moralis, account } = useMoralis();
    const { error, isUploading, moralisFile, saveFile } = useMoralisFile();

    const [uploadError, setUploadError] = useState('')
    const [getFile, setFile] = useState<File | undefined>(undefined);
    const uploadRef = useRef<HTMLInputElement>(null)
    
    //let nftFile: File = null; // ???
    let nftFileName: String = "";
    
    const handleUpload = (
      e: ChangeEvent<HTMLInputElement>
    ) => {
      if (e.target.files === null) {
        return
      }
    
      const file: File = e.target.files[0] //ahh this is the actual file we need to store
      setFile(file);
      
      if (file) {
        /* if (file.type !== 'text/csv') {
          setUploadError('Please upload a .csv file')
        } */
  
        const fileReader = new FileReader()
        fileReader.onload = (event) => {
          const contents = event?.target?.result
          // do something with the file contents here
          
          nftFileName = file.name;
          

          // console.log(typeof File) //testing
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
        let scene: THREE.Scene, camera, renderer;
        // cmhere BOIIIII
        console.log("who???");
        console.log("aight so: " + getFile?.name)

        if(web3 && getFile != undefined) {
            const contract = new web3.eth.Contract(nftABI, nftContract);
            const file = new Moralis.File(getFile.name, getFile);
            await file.saveIPFS();
            console.log("test: " + file.ipfs());
            //goodluck, dont think too hard, ima dip now :>

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xAAAAAA);
            camera = new THREE.PerspectiveCamera(400,window.innerWidth/window.innerHeight,1,5000);
            camera.rotation.y = 45/180*Math.PI;
            camera.position.x = 80;
            camera.position.y = 10;
            camera.position.z = 100;
            //let controls = new THREE.OrbitControls(camera);
            //controls.addEventListener('change', renderer);
            let hlight = new THREE.AmbientLight (0x404040,100);
            scene.add(hlight);
            let directionalLight = new THREE.DirectionalLight(0xffffff,100);
            directionalLight.position.set(0,1,0);
            directionalLight.castShadow = true;
            scene.add(directionalLight);
            let light = new THREE.PointLight(0xc4c4c4,10);
            light.position.set(0,300,500);
            scene.add(light);
            let light2 = new THREE.PointLight(0xc4c4c4,10);
            light2.position.set(500,100,0);
            scene.add(light2);
            let light3 = new THREE.PointLight(0xc4c4c4,10);
            light3.position.set(0,100,-500);
            scene.add(light3);
            let light4 = new THREE.PointLight(0xc4c4c4,10);
            light4.position.set(-500,300,500);
            scene.add(light4);
            renderer = new THREE.WebGLRenderer({antialias:true});
            renderer.setSize(window.innerWidth,1000);
            document.body.appendChild(renderer.domElement);
            let loader = new OBJLoader();
            loader.load(file.ipfs(), (object) => {scene.add(object);})
            renderer.render(scene, camera)
            try {
                //await contract.methods.createToken().send({from: account});
            } catch (error) {
                alert(error);
            }
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
                        multiple accept =".png, .obj, .fbx"
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

                    <div>

                    </div>
                </main>

            </div>
        </>
    )
}
