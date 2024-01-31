import s from "./Header.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useContractRead,
  useNetwork,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useBalance,
} from "wagmi";
import { formatEther, formatUnits } from "viem";

import babybonkContractInterface from "../../../abis/babybonk.json";

import { SvgBNB, SvgScore, SvgShutdown, SvgWallet, SvgXP } from "assets/svg";
import { useEffect } from "react";

const addressToken = {
  addressBase: "0xd31BE249db60B30D047aAE51ccc18D0561B75465",
  addressBNB: "0xbb2826ab03b6321e170f0558804f2b6488c98775",
};

const addressPack = {
  addressBase: "0xd31BE249db60B30D047aAE51ccc18D0561B75465",
  addressBNB: "0xbb2826ab03b6321e170f0558804f2b6488c98775",
};

const Header = () => {
  const { chain } = useNetwork();

  const { address, connector, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });
  function formatNumber(number) {
    if (isNaN(number)) {
      return "Invalid input";
    }

    if (number < 1000) {
      return number.toString();
    } else if (number < 1000000) {
      return (number / 1000).toFixed(1) + "K";
    } else if (number < 1000000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number < 10000000000000) {
      return (number / 1000000000).toFixed(0) + "B";
    } else {
      return (number / 1000000000000000).toFixed(0) + "T";
    }
  }

  console.log(data, "result of token");

  const babyBonkContractConfig = {
    address:
      chain?.id === 56 ? addressToken.addressBNB : addressToken.addressBase,
    abi: babybonkContractInterface,
  };

  const { data: balance } = useContractRead({
    ...babyBonkContractConfig,
    functionName: "balanceOf",
    args: [address],
  });
  console.log(balance, "balance");

  useEffect(() => {
    console.log(data, "hearder part");
  }, [balance]);

  return (
    <div className={s.root}>
      <div className={s.nav}>
        {/* {isConnected ? (
					<div className="flex gap-2 items-center">
						<div className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] rounded-full bg-[#FF6200] flex items-center justify-center">
							<SvgWallet className="w-[14px] h-[14px] md:w-[20px] md:h-[20px]" />
						</div>

						<div className="hidden lg:flex text-[16px] font-normal ">
							{address}
						</div>
						<div className="flex lg:hidden text-[12px] md:text-[16px] font-normal ">
							{address.slice(0, 6) + ' ... ' + address.slice(38, 42)}
						</div>
						<SvgShutdown className="w-[12px] h-[12px] md:w-[16px] md:h-[16px]" />
					</div>
				) : (
					
				)} */}
        <img
          src="/assets/images/bonkroyale.png"
          alt="bonkroyale"
          className="w-[60px] h-[24px] md:w-[70px] md:h-[32px]"
        />

        <div className="flex gap-2 sm:gap-6 items-center justify-center">
          <ConnectButton showBalance={false} />

          <div className="flex gap-2 items-center moo">
            <img
              src="/assets/images/babybonk.png"
              alt="babybonk"
              className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
            />
            <div className="text-[12px] md:text-[16px] font-normal ">
              {formatNumber(
                formatUnits(balance === undefined ? 0 : balance, 9)
              )}{" "}
              BABYBONK
            </div>
          </div>
          <div className="flex gap-2 items-center moo">
            <SvgBNB className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" />
            <div className="text-[12px] md:text-[16px] font-normal ">
              {data === undefined ? 0 : Number(data?.formatted).toFixed(4)}{" "}
              {data === undefined ? "BNB" : data?.symbol}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">{/* <SvgGridMenu /> */}</div>
    </div>
  );
};

export default Header;
