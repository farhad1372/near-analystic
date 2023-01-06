<template>
  <div class="row">
    <div calss="col-12">
      <img src="@/assets/images/gasfee.png" style="width: 100%" />
      <h2 class="mt-10">Gas Fee</h2>
      <p class="mb-2">
        When you send a transaction to the NEAR network different validators process it using their own
        infrastructure.<br />
        Maintaining the infrastructure up and running is important to keep the network healthy, but represents a
        significant cost for the validator. <br />

        As many other networks, NEAR pays the validators for their job. Also like many other networks, users have to pay
        a small fee (aka gas fee) on every transaction. But instead of giving the gas fee to the validators, validators
        receive their reward independent from the gas fees. This topic is discussed in more details in the validators
        section.<br />
        In addition, NEAR implements two unique features with respect to gas fees:<br />
      </p>

      <ul>
        <li>Gas as a Developer Incentive <br />
          Something unique to NEAR is that the GAS is not used to pay validators. In transactions where calling a
          contract would incur a gas fee, the fee is actually divided as follows: <br />
          30% goes to the smart contract.<br />
          70% is burned.<br />
          In this way, NEAR uses the gas to also incentive development of dApps in the ecosystem.<br />

        </li>
        <li>
          Free Transactions <br />
          Another unique feature of NEAR is that it allows to call read-only methods in smart contracts for free,
          without even needing a NEAR account.<br />
          In such case, it is the validators who absorb the gas cost.<br />
        </li>
      </ul>

      <h2 class="mt-16">Gas Units & Gas Price</h2>
      <p class="mb-6">On every transaction NEAR users get charged a small $NEAR fee, which has to be paid upfront. However,
        transaction fees are not computed directly in $NEAR.</p>

      <h3>Gas Units</h3>
      <p class="mb-6">Internally, the computation is done using gas units which are deterministic, meaning that a given operation
        will always cost the same amount of gas.</p>

      <h3>Gas Price</h3>
      <p>To determine the actual $NEAR fee the gas of all operations done by the transaction are added up are multiplied
        by a gas price. <br />
        The gas price is not fixed: it is recalculated each block depending on network demand. If the previous block is
        more than half full the price goes up, otherwise it goes down. <br />
        The price cannot change by more than 1% each block and bottoms out at a price that's configured by the network
        (currently 100 million yocto NEAR[2].<br />
      </p>
    </div>
  </div>
</template>
