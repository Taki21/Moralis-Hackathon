import '../styles/globals.css'
import { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import { useMoralis } from 'react-moralis'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId='lJOarUuAlWplKRCkGjvNNfQl2bY8OFAExeETwJS5' serverUrl='https://h9gw6kcvgoj4.usemoralis.com:2053/server'>
      <div className='flex'>
        <div className='z-10'><Sidebar/></div>
        <div className='w-full relative bg-[#0A0A0B] text-white'>
          <Header/>
          <Component {...pageProps} />
        </div>
      </div>
    </MoralisProvider>
  ) 
}

export default MyApp
