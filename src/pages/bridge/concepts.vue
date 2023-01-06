<template>
  <div class="row">
    <div calss="col-12">
    <img class="rounded" src="@/assets/images/bridge.png" style="width: 100%" />
      <h2 class="mt-10">What Are Blockchain Bridges and How Do They Work?</h2>
      <p>
        A blockchain bridge is a tool that lets you port assets from one blockchain to
        another, solving one of the main pain points within blockchains   a lack of
        interoperability.<br />
        Since blockchain assets are often not compatible with one another, bridges create
        synthetic derivatives that represent an asset from another blockchain.<br />
        If you use a bridge to send one Solana coin to an Ethereum wallet, that wallet
        will receive a token that has been “wrapped” by the bridge converted to a token
        based on the target <br />
        blockchain. In this case, the Ethereum wallet would receive a "bridge" version of
        Solana that has been converted to an ERC-20 token the generic token standard for
        fungible tokens on <br />
        the Ethereum blockchain. <br />
        While bridges open up new markets and work toward a brighter multi-chain future,
        they come with their own security challenges, as proven by a huge $326 million
        exploit on the nascent <br />
        Wormhole bridge in February 2022.<br />
      </p>
      <h2 class="mt-10">Types of blockchain bridges</h2>
      <p>
        Some bridges, known as unidirectional or one-way bridges, allow you to port assets
        only to the target blockchain and not the other way around. For instance, Wrapped
        Bitcoin allows you<br />
        to send bitcoin to the Ethereum blockchain to convert BTC to an ERC-20 stablecoin
        but it doesn't let you send ether to the Bitcoin blockchain.<br />
        Other bridges like Wormhole and Multichain are bidirectional, or two-way, meaning
        you can freely convert assets to and from blockchains. Just as you can send Solana
        to Ethereum's <br />
        blockchain, you can send ether to Solana.<br />
        Bridges are either custodial (also known as centralized or trusted) or
        noncustodial (decentralized or trustless). The difference explains who controls
        the tokens that are used to create the <br />
        bridged assets. All wrapped bitcoin (WBTC) is held in custody by BitGo, making it
        a centralized bridge. Conversely, bridged assets on Wormhole are held by the
        protocol, meaning it is <br />
        more decentralized.<br />
        While hardline advocates of decentralization might venture that the custodial
        nature of WBTC makes it less secure than decentralized alternatives, bridges that
        decentralize custody over<br />
        bridged assets aren't necessarily safer, as shown by the Wormhole bridge
        exploit.<br />
      </p>
      <h2 class="mt-10">Why use a blockchain bridge?</h2>
      <p>
        Porting assets from one blockchain to another blockchain comes with a myriad of
        benefits. First, the blockchain onto which you port assets might be cheaper and
        faster than its native <br />
        blockchain. This is certainly true for Ethereum, where high transaction fees and
        slow throughput make it difficult for newcomers to get involved in decentralized
        finance (DeFi).<br />
        If investors ported assets to a layer 2 network a faster blockchain that sits atop
        the Ethereum blockchain, like Arbitrum or Polygon they could trade ERC-20 tokens
        for a fraction of the<br />
        cost without sacrificing exposure to Ethereum tokens.<br />
        Other investors might use bridges to make the most of markets that exist only on
        another blockchain. For instance, the DeFi protocol Orca is available only on
        Solana, but supports a <br />
        wrapped version of ETH.<br />
        Bridges are becoming easier to use. Many DeFi protocols have integrated bridges to
        let their users swap tokens from different protocols without having to leave the
        platform. This makes <br />
        the process of converting tokens through bridges less cumbersome.<br />
      </p>

      <h2 class="mt-10">What are the biggest blockchain bridges?</h2>
      <p>
        According to DeFi Llama, there was $21.8 billion worth of crypto locked in bridges
        as of March 2022. The largest blockchain bridge is Wrapped Bitcoin, accounting for
        almost half of the <br />
        bridge market, with $10.2 billion in total value locked (TVL). DeFi Llama pegs
        Multichain as the largest cross-chain bridge, with about $7 billion in TVL.<br />
        A dashboard on Dune Analytics shows that the Avalanche Bridge is the largest
        Ethereum bridge, with about $6 billion in TVL, followed by Polygon ($5 billion
        TVL) and the Fantom <br />
        Anyswap Bridge ($4.2 billion TVL).<br />
      </p>
    </div>
  </div>
</template>
