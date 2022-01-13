import Head from 'next/head'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Intro from '../components/Intro';
import Card from '../components/Card';
import {useCallback, useState} from "react";
import { FileError, FileRejection, useDropzone} from "react-dropzone"; 
import { nftContract, nftABI } from '../components/abi/IERC721';
import { useMoralis } from 'react-moralis';


export interface UploadableFile {
    file: File;
    errors: FileError[];
}

export default function Home() {

    const { web3, account } = useMoralis();

    async function mintNFT() {
        if(web3) {
            const contract = new web3.eth.Contract(nftABI, nftContract);
            
            try {
                await contract.methods.createToken().send({from: account});
            } catch (error) {
                alert(error);
            }
        }
        
    }

    function uploadSrcFile() { //i think this just makes files drag and droppable lol
        const [files, setFiles] = useState<UploadableFile[]>([]);

        const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
            const mappedAcc = accFiles.map((file) => ({file, errors: []}));
            setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
        }, []);

        const {getRootProps, getInputProps} = useDropzone({ onDrop });
    }

    return (
        <>
            <div className="flex flex-col items-center justify-top py-2 w-full">
                <Head>
                <title>Moralis-Hackathon</title>
                <link rel='icon' href='/favicon.ico'></link>
                </Head>

                <main className='w-full'>
                    <h1 className='text-2xl'>Create Your NFT</h1>
                    

                    

                    <input type="file" id="real-file-button" className="flex text-base px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer"></input>
                    <button id="custom-file-button" className="flex text-base px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer">
                        Upload
                    </button>

                    <br />

                    <button onClick={() => mintNFT()} className="flex text-base px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer">
                        Mint
                    </button>
                </main>

            </div>
        </>
    )
}
