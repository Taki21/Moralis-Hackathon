import {Moralis} from 'moralis'

export default async function handler(req, res) {
    const { collectionId } = req.query
    Moralis.start({appId: 'lJOarUuAlWplKRCkGjvNNfQl2bY8OFAExeETwJS5', serverUrl: 'https://h9gw6kcvgoj4.usemoralis.com:2053/server'});
    const options = { address: collectionId, chain: "avalanche testnet" };
    const allNfts = await Moralis.Web3API.token.getAllTokenIds(options);
    res.status(200).json({ allNfts })
}