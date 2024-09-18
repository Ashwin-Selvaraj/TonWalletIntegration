import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import React, { useCallback, useEffect, useState } from "react";
// import { Address } from "@ton/core";
// import { Buffer } from 'buffer';

// Ensure Buffer is available globally
// if (typeof window !== "undefined") {
//     window.Buffer = Buffer;
//   }
export default function Home(){
    /*useTonConnectUI - this is a hook which provides access to to connect ui functionality such as connecting to a ton wallet and handling wallet
    interactions in the component*/
    const [tonConnectUI] = useTonConnectUI();
    const [tonWalletAddress, setTonWalletAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleWalletConnection = useCallback((address)=>{
        console.log(address+"handle wallet connection");
        setTonWalletAddress(address);
        console.log("Wallet Connected Successfully!");
        setIsLoading(false);
    },[])


    const handleWalletDisconnection = useCallback((address)=>{
        setTonWalletAddress(null);
        console.log("Wallet Disconnected Successfully!");
        setIsLoading(false);
    },[])

    //used to manage the wallet connection status - it'll run whenever ton connect ui handle wallet connection/disconnection
    // This ensures the app updates its change whenever its dependencies are modified - checks tonConnectUi.account, address exists
    useEffect(()=>{
        const checkWalletConnection = async()=>{
            if(tonConnectUI.account?.address){
                handleWalletConnection(tonConnectUI.account?.address)
            }else{
                handleWalletDisconnection();
            }
        }
        checkWalletConnection();

        const unSubscribe = tonConnectUI.onStatusChange((wallet)=>{
            if(wallet){
                handleWalletConnection(wallet.account.address)
            }
            else{
                handleWalletDisconnection();
            }
        })

        /*the return statement provides a cleap up function that unsubscribes when a component is unmounted*/
        return()=>{
            unSubscribe();
        }

    },[tonConnectUI, handleWalletConnection, handleWalletDisconnection])

    const handleWalletAction=async()=>{
        if(tonConnectUI.connected){
            setIsLoading(true);
            await tonConnectUI.disconnect();
        }else{
            await tonConnectUI.openModal();
        }
    }

   
      
    
    const hexToBase64Url = (hex) => {
        const hexArray = hex.replace(/^0:/, ''); // Remove the '0:' prefix if it exists
        const bytes = new Uint8Array(hexArray.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const base64 = btoa(String.fromCharCode(...bytes));
        // Convert Base64 to URL-safe Base64
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      };
    
      const formatAddress = (address) => {
        const base64UrlAddress = hexToBase64Url(address); // Convert hex to Base64 URL-safe
        console.log(base64UrlAddress);
        return base64UrlAddress; // Directly return the Base64 URL-safe string
      };

    if(isLoading){
        return(
            <main className="flex min-h-screen flex-col items-center justify-center">
                <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
                    Loading...
                </div>
            </main>
        )
    }

    return(<React.Fragment>
        <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">TON Connect Demo</h1>
        {tonWalletAddress ? (
            <div className="flex flex-col items-center">
            <p className="mb-4">Connected: {formatAddress(tonWalletAddress)}</p>
            <button
                onClick={handleWalletAction}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Disconnect Wallet
            </button>
            </div>
        ) : (
            <button
            onClick={handleWalletAction}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
            Connect TON Wallet
            </button>
            // <TonConnectButton></TonConnectButton>
        )}
        </main>
    </React.Fragment>);
}