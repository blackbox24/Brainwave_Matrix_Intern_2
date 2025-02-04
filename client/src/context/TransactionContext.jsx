import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, productChain } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
    try {
        const provider = new ethers.BrowserProvider(ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const transactionContract = new ethers.Contract(contractAddress, productChain, signer);

        return transactionContract;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ name: "", manufacturer: "", currentLocation: "", owner: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("productCounter"));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const checkIfWalletConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask");
    
            const accounts = await ethereum.request({ method: "eth_accounts" });
            console.log(accounts);
            
            if (accounts.length) {
                setCurrentAccount(accounts[0]);   
                getAllTransactions();
            } else {
                console.log("No account found");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object found");
        }
    }

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionContract = await getEthereumContract();
    
                const avaliableProducts = await transactionContract.getAllProduct();
                console.log(avaliableProducts);
                
    
                setTransactions(avaliableProducts);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };
    

      
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask");
            const { name, manufacturer, currentLocation } = formData;
            const transactionContract = await getEthereumContract();

            const transactionHash = await transactionContract.registerProduct(name, manufacturer, currentLocation);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Transaction completed - ${transactionHash.hash}`);

            // const transactionsCount = await transactionContract.getTransactionCount();
            // setTransactionCount(transactionsCount.toNumber());
            // window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error("Send transaction failed, No ethereum object found");
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask");
    
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object found");
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, handleChange, formData, sendTransaction, isLoading, transactions ,getAllTransactions}}>
            {children}
        </TransactionContext.Provider>
    )
}
