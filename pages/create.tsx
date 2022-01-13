import Head from 'next/head'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Intro from '../components/Intro';
import { useMoralis } from 'react-moralis'
import Card from '../components/Card';

export default function Home() {

    async function mintNFT() {

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
                    <>put the upload file btn here</>
                    <button onClick={() => mintNFT()} className="flex text-base px-9 py-3 rounded-2xl shadow-lg bg-[#1C1C1C] text-white hover:bg-[#D3B694] hover:text-white rounded-15xl hover:rounded-xl transition-all duration-600 ease-linear cursor-pointer">
                        Mint
                    </button>
                </main>

            </div>
        </>
    )
}
