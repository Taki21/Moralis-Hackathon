import Head from 'next/head'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Intro from '../components/Intro';
import { useMoralis } from 'react-moralis'
import Card from '../components/Card';

export default function Home() {

  return (
    <>
      <div className="flex flex-col items-center justify-top h-screen py-2 w-full">
        <Head>
          <title>Moralis-Hackathon</title>
          <link rel='icon' href='/favicon.ico'></link>
        </Head>

        <main className='w-full'>
          <Intro/>
          <h1 className='text-3xl pt-4'>Trending</h1>
          <Card/>
        </main>

      </div>
    </>
  )
}
