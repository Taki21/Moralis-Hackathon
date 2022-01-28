import { useMoralis } from 'react-moralis';
import { useState } from 'react';
import { useRouter } from 'next/router';
// all of this is BAD!!!!!!!! 
function Page() {
  // Render data...

  const router = useRouter()
  const { collectionID, tokenID } = router.query

  console.log(collectionID, tokenID)
  return (
    <div>
      <h1>a</h1>
      <p>b</p>
    </div>
  );
}

function fetchNFTs() {
  const [userNFTs, setUserNFTs] = useState([])
  const { Moralis, isAuthenticated, user} = useMoralis();

  async function getUserNFTs () {
    if(isAuthenticated) {
      const nfts = await Moralis.Web3API.account.getNFTs({chain: 'avalanche testnet', address: user.get("ethAddress") }).then(setNFTsLoaded('loaded'))

      setUserNFTs(nfts.result)
    }
  }

  return userNFTs
}

export async function getServerSideProps({query: {page}, searchQuery}){
  console.log(query.search)
  return {
      props: {
          data: data
      }
  }
}

export default Page
