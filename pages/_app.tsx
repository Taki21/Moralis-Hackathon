import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId='lJOarUuAlWplKRCkGjvNNfQl2bY8OFAExeETwJS5' serverUrl='https://h9gw6kcvgoj4.usemoralis.com:2053/server'>
      <div className='flex'>
        <Sidebar/>
        <div className='w-full bg-[#0A0A0B] text-white'>
          <Header/>
          <Component {...pageProps} />
        </div>
      </div>
    </MoralisProvider>
  ) 
}

export default MyApp
