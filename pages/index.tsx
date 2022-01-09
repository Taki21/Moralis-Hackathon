import Head from 'next/head'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Intro from '../components/Intro';

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
        </main>

      </div>
    </>
  )
}
