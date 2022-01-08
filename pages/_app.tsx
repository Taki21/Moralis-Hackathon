import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId='lJOarUuAlWplKRCkGjvNNfQl2bY8OFAExeETwJS5' serverUrl='https://h9gw6kcvgoj4.usemoralis.com:2053/server'>
      <Component {...pageProps} />
    </MoralisProvider>
  ) 
}

export default MyApp
