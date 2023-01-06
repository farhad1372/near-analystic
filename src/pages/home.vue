<template>
  <div class="row">
    <div calss="col-12">
      <img class="rounded" src="@/assets/images/near.webp" style="width: 100%" />
      <h2 class="mt-10">NEAR Protocols Origin and Purpose?</h2>
      <p>
        NEARs founders are Alexander Skidanov and Illia Polosukhin, who hail from Ukraine and were educated in computer
        science and mathematics. They have been working on NEAR Protocol since 2017 after contributing to Ethereums
        open-source code. NEAR mainnet came online in August 2020.<br />
        Polosukhin also worked on Tensor Flow, an open source machine learning library. They based the company in San
        Francisco, which is typical for most developers pushing the software envelope. Skidanov and Polosukhin aimed to
        create a better Ethereum, without relying on Layer 2 scalability.<br />
        In contrast, NEAR Protocol relies on making the mainchain (Layer 1) scalable. As such, it offers
        enterprise-grade performance from the get-go, offering up to 100,000 transactions per second once its fully
        upgraded. As a result, it has gained popularity across all continents to mainstream dApp/Web3 deployment,
        attracting 1,700 monthly active developers. <br />
        Venture capitalists backed NEAR to the tune of $566M so far, led by Andreessen Horowitz, DCG, Coinbase Ventures,
        Tiger Global, Accomplice, Pantera Capital, Electric Capital, Blockchange, Dragonfly Capital, Blockchain.com, and
        others.
      </p>

      <h2>NEAR Protocols Impressive Performance</h2>
      <p>
        NEAR Protocol network has 18M wallets and daily transactions, 400,000 transfers at 2.4s finality, and a
        remarkable $0.01 fee. Although NEARs daily transaction count is three times lower than Ethereums, it completes
        transactions five times faster. Most importantly, the protocols fees are comparable to Ethereums Layer 2
        Arbitrum or Polygon networks.

        On paper, this makes NEAR more streamlined, less complicated, and ready for mass DeFi adoption. The question is,
        how is this scaling possible without taking advantage of Layer 2 networks to spread the traffic load, the key
        driver for Ethereums high gas fees?

        It turns out, the same technology Ethereum will implement in its Surge upgrade following The Merge — sharding.
        But, before delving deeper into sharding, it is important to understand the problem all blockchain networks
        face.
      </p>

      <h2>Decentralization Compromise</h2>
      <p>
        The key distinction between Web2 and web3 is centralization. Case in point, a Web2 company like Google can offer
        lightning-fast services because it has full control over its server farms.<br />
        Each server node is geared for performance, and controlled by Google. In turn, Google can grant or revoke access
        to its cloud services at will. With public and permissionless blockchain networks, it is possible to offer
        Google-like services but without the centralization baggage. <br />
        Thats possible because everyone can turn their computer into a network node, which then syncs up with other
        nodes to validate transactions and store the blockchains entire transaction history — a public ledger. Because
        validators need to confirm transactions across other nodes, this makes blockchains less efficient unless they
        are equally centralized as Googles server farms.<br />
        In short, all blockchain networks have to find ways to optimize network traffic, so their performance is close
        to or equal to a centralized computer network. NEAR Protocol accomplishes this optimization through sharding.[1]
      </p>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    //  BarChart: () => import("@/components/charts/bar.vue"),
    // DoughnutChart: () => import("@/components/charts/doughnut.vue"),
    // LineChart: () => import("@/components/charts/line.vue"),
    // MixedChart: () => import("@/components/charts/mixed.vue"),
    // SingleChart: () => import("@/components/charts/single.vue")
  },
};
</script>
