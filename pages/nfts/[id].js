import { useRouter } from 'next/router'
import { useMoralis } from 'react-moralis';
import { useState, useEffect } from 'react';

/* const Post = () => {
  const router = useRouter()
  console.log(router.query)
  const { pid } = router.query

  return <p>Post: {pid}</p>
}

export default Post */
  
const Details = () => {

  const [userNFTs, setUserNFTs] = useState([])
  const router = useRouter()

  async function getUserNFTs () {
    if(isAuthenticated) {
      const nfts = await Moralis.Web3API.account.getNFTs({chain: 'avalanche testnet', address: user.get("ethAddress") }).then(setNFTsLoaded('loaded'))

      setUserNFTs(nfts.result)
      //console.log(nfts.result) 
    }
  }

    console.log(userNFTs)

    // do the mapping thingy here
    // userNFTs has the nfts holluyyp yus
    return (
      <div>
        <h1>{ nft.name }</h1>
        <p>{ nft.fileType }</p>
      </div>
    );
}
  
  export default Details;