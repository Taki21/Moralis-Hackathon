import Head from 'next/head'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Intro from '../components/Intro';
import Card from '../components/Card';
import {ChangeEventHandler, useCallback, useRef, useState} from "react";
import { FileError, FileRejection, useDropzone} from "react-dropzone"; 
import { nftContract, nftABI } from '../components/abi/IERC721';
import { useMoralis, useMoralisFile } from 'react-moralis';
import { useForm } from 'react-hook-form';
import app from 'next/app';
import axios from 'axios';



export interface UploadableFile {
    file: File;
    errors: FileError[];
}

export default function Home(this : any) {

    const { web3, Moralis, account } = useMoralis();
    const { error, isUploading, moralisFile, saveFile } = useMoralisFile();

    async function mintNFT(this: any) {
        const fileData = this.refs.upload.getInputDOMNode().files[0];
        console.log(fileData);
        // bro forget all this file stuff, can u create the NFT without it?
        // like just pass in fileData :sob: 
        if(web3) {
            const contract = new web3.eth.Contract(nftABI, nftContract);
            //const fileName = fileData.value.replace(/.*[\/\\]/, '');
            const file = new Moralis.File("testing.fbx", fileData);
            await file.saveIPFS();
            console.log(file._url);
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

                    
                    <input ref={(ref) => this.upload = ref} type="file" multiple accept=".obj, .fbx" name="NFT" className="flex text-base px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer"/>

                    <br /> 

                    <button onClick={() => mintNFT()} className="flex text-base px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer">
                        Mint
                    </button>
                </main>

            </div>
        </>
    )
}
