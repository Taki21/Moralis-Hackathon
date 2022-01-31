import { nftContract, nftABI } from '../components/abi/IERC721';
import { marketAddress, marketABI } from '../components/abi/Marketplace';
import React from 'react'
import { useState } from 'react';
import { Suspense } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react'
import {
  Environment,
  OrbitControls,
  Html,
  useProgress
} from "@react-three/drei";
import Model from "../components/Model"
import Web3 from 'web3';
import Moralis from 'moralis';
import axios from 'axios';
import { NFTStorage, File } from 'nft.storage'
import { useMoralis, useMoralisFile, useWeb3ExecuteFunction } from 'react-moralis';
import Head from 'next/head'
import { Canvas } from "@react-three/fiber";

export default function Marketplace() { 

    const { enableWeb3, Moralis, account, provider } = useMoralis();

    async function loadNFTs() {
        await Moralis.enableWeb3()
        const web3 = new Web3(Moralis.provider)
        const contract = new web3.eth.Contract(nftABI, nftContract);
        const market = new web3.eth.Contract(marketABI, marketAddress);
        const accounts = await web3.eth.getAccounts();

        const data = await market.methods.fetchMarketItems().call({from: accounts[0]});
        console.log(data)
    }

    useEffect(() => {
        loadNFTs()
    }, []) 

    return (
        <h1 className="text-3xl mt-4">Marketplace</h1>
    )
}