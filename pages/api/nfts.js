import { Moralis } from 'moralis'

export default async function handler(req, res) {
    Moralis.start({appId: 'lJOarUuAlWplKRCkGjvNNfQl2bY8OFAExeETwJS5', serverUrl: 'https://h9gw6kcvgoj4.usemoralis.com:2053/server'});
    const query = new Moralis.Query('NFTData');
    const results = await query.find();
    res.status(200).json({ results })
}