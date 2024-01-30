import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, bsc, goerli, baseGoerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// import { PhantomConnector } from "phantom-wagmi-connector";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import "@rainbow-me/rainbowkit/styles.css";

const { chains, publicClient } = configureChains(
  [bsc, baseGoerli],
  [
    // alchemyProvider({ apiKey: 'ZbcJUctTzRg0qySTHx0jmolpmxP-5V3g' }),
    publicProvider(),
  ]
  // [
  //   jsonRpcProvider({
  //     rpc: (chain) => ({
  //       https: `https://data-seed-prebsc-1-s1.binance.org:8545`,
  //     }),
  //   }),
  // ]
);
const { connectors } = getDefaultWallets({
  appName: "Pack",
  projectId: "a1dd57ddaed16cfb376bd7066679449f",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  // connectors: [new PhantomConnector({ chains })],
});
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        coolMode
        theme={midnightTheme({
          accentColor: "#ffe300",
          accentColorForeground: "black",
          borderRadius: "medium",
        })}
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </BrowserRouter>
  // </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
