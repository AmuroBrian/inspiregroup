import React from "react";
import Image from "next/image";

export default function InspireWalletIntro() {
  return (
    <div className="w-full flex justify-center items-center p-2 flex-col md:flex-row md:p-8">
      <div className="w-full md:w-[50%] flex justify-center items-center text-center p-2 md:p-8">
        <img
          src="./images/iwintro.png"
          alt="Inspire Wallet"
          className="w-full rounded-lg"
        />
      </div>
      <div className="flex justify-center flex-col items-start w-full md:w-[50%] p-2 md:p-8">
        <div className="w-full p-3 text-3xl font-bold">
          Introducing Inspire Wallet
        </div>
        <div className="w-full flex justify-center items-center text-left p-2 text-xl">
          Experience the Ultimate Asset Management App and Seamless Bank Account
          Opening with Inspire! The Inspire Wallet asset management app connects
          effortlessly with the bank account you want to open, providing a
          smooth and efficient financial experience. Moreover, opening a bank
          account with Inspire is simple and fast, allowing you to access
          financial services with ease. Additionally, Inspire Wallet is
          officially certified by Apple and Google as a finance application,
          recognized at the same level as banking institutions. Discover the
          convenience and security of Inspire Wallet today!
        </div>
      </div>
    </div>
  );
}
