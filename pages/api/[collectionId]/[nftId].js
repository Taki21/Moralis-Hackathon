import { Moralis } from 'moralis'

export default async function handler(req, res) {
    const { collectionId, nftId } = req.query
    Moralis.start({appId: 'lJOarUuAlWplKRCkGjvNNfQl2bY8OFAExeETwJS5', serverUrl: 'https://h9gw6kcvgoj4.usemoralis.com:2053/server'});
    const options = { address: collectionId, token_id: nftId, chain: "avalanche testnet" };
    const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(options);
    res.status(200).json({ tokenIdMetadata })
}