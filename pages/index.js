import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';

import { nftaddress, nftmarketaddress } from '../config';
import Script from 'next/script';
import Head from 'next/head';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import Display from '../components/Display';
import TopWaveFooter from '../components/TopWaveFooter';
import ItemList from '../components/ItemList';
import WaveFooter from '../components/WaveFooter';
import Footer from '../components/Footer';

let rpcEndpoint =
  'https://polygon-mumbai.g.alchemy.com/v2/5F_8ytFz7F0IVUdhuR0_jhzAZmCEmcZk';
if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL;
}

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      provider
    );
    const data = await marketContract.getMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState('loaded');
  }
  async function buyNft(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      nftmarketaddress,
      NFTMarket.abi,
      signer
    );

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
  }
  // if (loadingState === "loaded" && !nfts.length)
  //   return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
    <div>
      <Script src='https://kit.fontawesome.com/a076d05399.js' />
      <Head>
        <title>nebulous</title>
      </Head>
      <Display />
      <TopWaveFooter />
      <main
        style={{ marginTop: '30px', marginBottom: '50px', minHeight: '50vh' }}
      >
        <div className='container'>
          <h1
            className='title-main text-center'
            style={{ marginBottom: '30px', fontWeight: 'bold' }}
          >
            Products
          </h1>
          <ItemList />
        </div>
      </main>

      <footer>
        <WaveFooter />
        <Footer />
      </footer>
    </div>
  );
}
