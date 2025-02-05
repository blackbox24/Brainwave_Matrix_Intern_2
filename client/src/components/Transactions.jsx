import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({
  id,
  name,
  manufactorer,
  currentLocation,
  timestamp,
  owner,
}) => {
  // const gifUrl = useFetch({ name });
  const newDate = new Date(Number(timestamp) * 1000);
  timestamp = newDate.toDateString();

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a
            href={`https://etherscan.io/address/${owner}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              Owner: {shortenAddress(owner)}
            </p>
            /
          </a>
          <p className="text-white text-base">Product Name: {name} </p>
          <p className="text-white text-base">Manufactorer: {manufactorer} </p>
          {currentLocation && (
            <>
              <br />
              <p className="text-white text-base">
                Location: {currentLocation}
              </p>
            </>
          )}
        </div>

        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <>
      <div className="flex w-full justify-center items-center gradient-bg-services">
        <div className="flex mf:flex-row flex-col  md:p-20 py-12 px-4">
          <div className="flex-1 flex flex-col justify-start items-start">
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
        <div className="flex flex-col md:p-12 py-12 px-4">
          {currentAccount ? (
            <h3 className="text-white text-3xl text-center my-2">
              Latest Transactions
            </h3>
          ) : (
            <h3 className="text-white text-3xl text-center my-2">
              Connect your account to see the latest transactions
            </h3>
          )}

          <div className="flex flex-wrap justify-center items-center mt-10">
            {[...transactions].map((transaction, i) => (
              <TransactionsCard
                key={i}
                id={transaction[0]}
                name={transaction[1]}
                manufactorer={transaction[2]}
                currentLocation={transaction[3]}
                timestamp={transaction[4]}
                owner={transaction[5]}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
