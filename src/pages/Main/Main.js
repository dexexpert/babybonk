import React from "react";
import NFTItem from "components/NFTItem";
import s from "./Main.module.css";

import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { SvgBNB } from "assets/svg";
import { useNavigate } from "react-router-dom";
import packContractInterface from "../../abis/Pack.json";
import { formatEther, formatUnits, parseUnits } from "viem";

import babybonkContractInterface from "../../abis/babybonk.json";
import {
  useNetwork,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
} from "wagmi";

const addressToken = {
  addressBase: "0xd31BE249db60B30D047aAE51ccc18D0561B75465",
  addressBNB: "0xbb2826ab03b6321e170f0558804f2b6488c98775",
};

const addressPack = {
  addressBase: "0x709fe4a56a553694Ce0A4dcB038c773094A15180",
  addressBNB: "0x6E921Cd45ed0186191D58Ed797379e94B0e0cF29",
};

function Main() {
  const { chain } = useNetwork();
  const [packId, setPackId] = useState(1);
  const [bonkOrBnb, setBonkOrBnb] = useState(true);
  const [detailOpen, setDetailOpen] = useState(false);
  const [transactionHash, setTransactionHash] = useState("0x");

  const [selectedPack, setSelectedPack] = useState("packnew1");
  const navigate = useNavigate();
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

  const babyBonkContractConfig = {
    address:
      chain?.id === 56 ? addressToken.addressBNB : addressToken.addressBase,
    abi: babybonkContractInterface,
  };
  let packContractConfig = {};

  packContractConfig = {
    address:
      chain?.id === 56 ? addressPack.addressBNB : addressPack.addressBase,
    abi: packContractInterface,
  };

  const { data: balance } = useContractRead({
    ...babyBonkContractConfig,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: pairTokenAndBNB1 } = useContractRead({
    ...packContractConfig,
    functionName: "getPriceInfo",
    args: [1],
  });

  const { data: pairTokenAndBNB2 } = useContractRead({
    ...packContractConfig,
    functionName: "getPriceInfo",
    args: [2],
  });
  const { data: pairTokenAndBNB3 } = useContractRead({
    ...packContractConfig,
    functionName: "getPriceInfo",
    args: [3],
  });

  const { data: pairTokenAndBNB4 } = useContractRead({
    ...packContractConfig,
    functionName: "getPriceInfo",
    args: [4],
  });

  //=============Allownce and Approve stable token===========

  const { data: allowanceAmount } = useContractRead({
    ...babyBonkContractConfig,
    functionName: "allowance",
    args: [
      address,
      chain?.id === 56 ? addressPack.addressBNB : addressPack.addressBase,
    ],
  });

  const {
    config: erc20ApproveContractConfig,
    error: erc20ApproveConfigError,
    isError: isErc20ContractConfigError,
  } = usePrepareContractWrite({
    ...babyBonkContractConfig,
    functionName: "approve",
    args: [
      chain?.id === 56 ? addressPack.addressBNB : addressPack.addressBase,
      parseUnits(
        selectedPack.babybonkEther === undefined
          ? ""
          : selectedPack.babybonkEther.toString(),
        18
      ),
    ],
  });

  const {
    data: erc20ApproveReturnData,
    write: approve,
    error: Erc20ApproveError,
    isLoading: approvedLoading,
    isSuccess: approvedSuccess,
  } = useContractWrite(erc20ApproveContractConfig);

  const {
    config: buyPackContractConfig,
    error: buyPackConfigError,
    isError: isBuyPackContractConfigError,
  } = usePrepareContractWrite({
    ...packContractConfig,
    functionName: "buyPack",
    args: [packId, bonkOrBnb],
  });

  const {
    data: buyPackReturnData,
    write: buyPack,
    error: BuyPackError,
    isLoading: buyPackLoading,
    isSuccess: buyPackSuccess,
  } = useContractWrite(buyPackContractConfig);

  useEffect(() => {
    const mainDiv = document.getElementById("root");
    mainDiv.style.transition = "none";
    mainDiv.style.opacity = "1";
    const loadingDiv = document.getElementById("loading");
    loadingDiv.style.zIndex = "-1";
    loadingDiv.style.opacity = "0";
  }, []);

  const handleDetailOpen = (value) => {
    setSelectedPack(value);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const handleReviewOpenBonk = async (packId, method) => {
    console.log("clicked function for buyPack");
    setBonkOrBnb(method);
    setPackId(packId);
    manuallyBuyPack();
  };

  const handleReviewOpenBNB = async (packId, method) => {
    setBonkOrBnb(method);
    setPackId(packId);
    manuallyBuyPack();
  };

  const manuallyBuyPack = async () => {
    await buyPack?.();
  };

  const handleApproveBabyBonk = async () => {
    console.log("clicked buttons for approve");
    await approve?.();
  };

  useEffect(() => {
    if (buyPackReturnData !== undefined) {
      console.log(
        buyPackReturnData,
        "transaction hash when buyPack is successful"
      );
      setDetailOpen(false);
      const homeDiv = document.getElementById("home");
      homeDiv.style.display = "none";
      const mainDiv = document.getElementById("root");
      mainDiv.style.height = "100vh";
      mainDiv.style.width = "100vw";
      mainDiv.style.transition = "all 1s";
      mainDiv.style.opacity = "0";
      const loadingDiv = document.getElementById("loading");
      setTimeout(() => {
        loadingDiv.style.zIndex = "11";
        loadingDiv.style.opacity = "1";

        loadingDiv.play();
      }, 1000);
      loadingDiv.addEventListener("ended", function () {
        setTimeout(() => {
          loadingDiv.style.zIndex = "-1";
          loadingDiv.style.opacity = "0";
          loadingDiv.pause();
        }, 1000);
        navigate(`/review/${buyPackReturnData}`);
      });
    }
  }, [buyPackReturnData]);
  useEffect(() => {
    console.log(packId, bonkOrBnb, erc20ApproveReturnData, "========--------");
  }, [packId, bonkOrBnb, allowanceAmount, approvedSuccess]);

  const nftDatas = [
    {
      id: 1,
      image: "essential",
      title: "ESSENTIAL",
      color: "#1DDA7B",
      babybonkEther: formatUnits(
        pairTokenAndBNB1 === undefined ? 0 : pairTokenAndBNB1[1],
        9
      ),
      babybonk: formatNumber(
        formatUnits(pairTokenAndBNB1 === undefined ? 0 : pairTokenAndBNB1[1], 9)
      ),
      bnb: formatUnits(
        pairTokenAndBNB1 === undefined ? 0 : pairTokenAndBNB1[0],
        18
      ),
      description:
        "The ideal choice for newcomers to Bonk Royale. This basic pack includes 5 Common players (NFTs), providing a solid foundation for building your initial team. It's a great way to start your adventure, introducing you to the game mechanics and setting you on the path to eventually collecting higher rarity characters.",
      rarities: [
        <p>
          <b>Common:</b> 100%
        </p>,
      ],
    },
    {
      id: 2,
      image: "deluxe",
      title: "DELUXE",
      color: "#D3631D",
      babybonkEther: pairTokenAndBNB2 === undefined ? 0 : pairTokenAndBNB2[1],
      babybonk: formatNumber(
        formatUnits(pairTokenAndBNB2 === undefined ? 0 : pairTokenAndBNB2[1], 9)
      ),
      bnb: formatUnits(
        pairTokenAndBNB2 === undefined ? 0 : pairTokenAndBNB2[0],
        18
      ),
      description:
        "An advanced upgrade for those looking to elevate their Bonk Royale gameplay. This pack includes 5 players (NFTs), encompassing a blend of Common and Rare characters. It's an ideal choice for players seeking to enhance their team's competitiveness, providing a variety of skilled characters that can significantly strengthen and diversify your lineup.",
      rarities: [
        <p>
          <b>Common:</b> 71.74%
        </p>,
        <p>
          <b>Rare:</b> 28.26%
        </p>,
      ],
    },
    {
      id: 3,
      image: "supreme",
      title: "SUPREME",
      color: "#E2C81D",
      babybonkEther: pairTokenAndBNB3 === undefined ? 0 : pairTokenAndBNB3[1],
      babybonk: formatNumber(
        formatUnits(pairTokenAndBNB3 === undefined ? 0 : pairTokenAndBNB3[1], 9)
      ),
      bnb: formatUnits(
        pairTokenAndBNB3 === undefined ? 0 : pairTokenAndBNB3[0],
        18
      ),
      description:
        "A powerhouse choice for dominating in Bonk Royale. This formidable pack comes with 5 players (NFTs) and two items, spanning all rarity levels. It's designed for those who aim to outclass the competition, offering a diverse and potent mix of characters and gear that can decisively turn the tide in any battle.",
      rarities: [
        <p>
          <b>Common:</b> 66%
        </p>,
        <p>
          <b>Rare:</b> 26%
        </p>,
        <p>
          <b>Ultra Rare:</b> 6%
        </p>,
        <p>
          <b>Legendary:</b> 2%
        </p>,
      ],
    },
    {
      id: 4,
      image: "elite",
      title: "ELITE",
      color: "#9F40DB",
      babybonkEther: pairTokenAndBNB4 === undefined ? 0 : pairTokenAndBNB4[1],
      babybonk: formatNumber(
        formatUnits(pairTokenAndBNB4 === undefined ? 0 : pairTokenAndBNB4[1], 9)
      ),
      bnb: formatUnits(
        pairTokenAndBNB4 === undefined ? 0 : pairTokenAndBNB4[0],
        18
      ),
      description:
        "This pack stands as the pinnacle of Bonk Royale packs. This ultimate collection includes 5 players (NFTs) and 3 items, with every piece ranging from Rare to Ultra Rare or Legendary. Tailored for those seeking the best, it offers an unparalleled array of high-caliber characters and items, setting the stage for unmatched gameplay and strategic dominance.",
      rarities: [
        <p>
          <b>Rare:</b> 81.25%
        </p>,
        <p>
          <b>Ultra Rare:</b> 18.75%
        </p>,
        <p>
          <b>Legendary:</b> 6.5%
        </p>,
      ],
    },
  ];

  console.log(
    formatUnits(allowanceAmount === undefined ? 0 : allowanceAmount, 9),
    selectedPack.babybonkEther,
    "-=-=--==================================================="
  );

  return (
    <div className={s.root} id="home">
      <div class="overlay"></div>
      <div className="w-[85%] xl:w-[70%] flex flex-col items-start justify-center maincol">
        <div className="text-[38px] lg:text-[64px] font-genotics w-fit items-center">
          BONK ROYALE NFT SHOP
        </div>
        <div className="text-[12px] lg:text-[14px] font-poppins w-fit">
          The perfect packs to build an ultimate team. All NFTs are usable in
          Bonk Royale!
        </div>

        <div className="w-full flex flex-wrap items-center justify-between mt-10">
          {nftDatas.map((data) => (
            <div className="nftwrap">
              <NFTItem
                key={data.image}
                image={data.image}
                color={data.color}
                babybonk={data.babybonk}
                bnb={data.bnb}
                onClick={() => handleDetailOpen(data)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="text-[12px] lg:text-[14px] font-poppins w-fit">
        <br />
        powered by BabyBonk
      </div>
      <Dialog open={detailOpen} onClose={handleDetailClose} id="detailDialog">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full packs">
          <img
            src={`/assets/images/${selectedPack.image}.png`}
            alt={selectedPack.image}
            className="flex sm:hidden w-[300px] packimg"
          />
          <div className="self-start sm:self-center">
            <div class="wrappp">
              <div className="head text-[32px] md:text-[48px] lg:text-[56px] font-genotics w-fit text-white">
                {selectedPack.title} PACK
              </div>
              <div className="whitetxt text-[12px] lg:text-[14px] font-poppins w-fit text-white">
                {selectedPack.description}
              </div>
            </div>

            <div class="wrappp">
              <div className="head text-[28px] md:text-[40px] lg:text-[44px] font-genotics w-fit text-white">
                pack chances
              </div>
              <div className="whitetxt">{selectedPack.rarities}</div>
            </div>

            <div class="wrappp">
              <div className="head text-[28px] md:text-[40px] lg:text-[44px] font-genotics w-fit text-white">
                balance
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src="/assets/images/babybonk.png"
                  alt="babybonk"
                  className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
                />
                <div className="whitetxt text-[12px] md:text-[16px] font-normal text-white">
                  {formatNumber(
                    formatUnits(balance === undefined ? 0 : balance, 9)
                  )}{" "}
                  babybonk
                </div>
              </div>
              <div className="flex gap-2 items-center mt-4">
                <SvgBNB className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" />
                <div className="whitetxt text-[12px] md:text-[16px] font-normal text-white">
                  {Number(data?.formatted).toFixed(4)} {data?.symbol}
                </div>
              </div>
            </div>
          </div>
          <img
            src={`/assets/images/${selectedPack.image}.png`}
            alt={selectedPack.image}
            className="hidden sm:flex w-[160px] md:w-[250px]"
          />
        </div>
        <div className="flex items-center justify-between w-full mt-4 mobuybtn">
          <div
            className="flex items-center justify-center gap-2 sm:gap-4 w-[50%] border border-[#0000003d] py-[16px] bg-[#ffffff0f] hover:bg-[#f37223] cursor-pointer"
            onClick={() => {
              if (
                formatUnits(
                  allowanceAmount === undefined ? 0 : allowanceAmount,
                  9
                ) >= selectedPack?.babybonkEther
              ) {
                handleReviewOpenBonk(selectedPack.id, true);
              } else {
                handleApproveBabyBonk();
              }
            }}
          >
            <img
              src="/assets/images/babybonk.png"
              alt="babybonk"
              className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
            />
            <div className="text-[12px] md:text-[16px] font-normal text-white">
              {formatUnits(
                allowanceAmount === undefined ? 0 : allowanceAmount,
                9
              ) >= selectedPack?.babybonkEther
                ? selectedPack?.babybonk
                : "Approve"}{" "}
              BabyBonk
            </div>
          </div>
          <div
            className="flex items-center justify-center gap-2 sm:gap-4 w-[50%] border border-[#0000003d] py-[16px] bg-[#ffffff0f] hover:bg-[#FFCE00] cursor-pointer"
            onClick={() => {
              handleReviewOpenBNB(selectedPack.id, false);
            }}
          >
            <SvgBNB className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" />
            <div className="text-[12px] md:text-[16px] font-normal text-white">
              {selectedPack.bnb} BNB
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Main;
