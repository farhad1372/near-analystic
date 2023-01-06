
const state = {
  queries: {
    // sigles charst season 0 
    'users': {
      result: null,
      sql: `select count(distinct TX_SIGNER) as user_number 
      from 
      near.core.fact_transactions`
    },
    'Total-Spend-Gas-Price-In-$USD': {
      result: null,
      sql: `with near_prices as (
        select date_trunc(hour,TIMESTAMP) as RECORDED_HOUR, SYMBOL, TOKEN_CONTRACT, avg(PRICE_USD) as PRICE_USD
          from near.core.fact_prices
          group by 1,2,3
      ),
      
      near_fees as (
          select TX_HASH, TRANSACTION_FEE/1e24 as TX_FEE, TX_FEE*PRICE_USD as FEE_USD
          from near.core.fact_transactions a 
          join near_prices b
          on date_trunc(hour, a.BLOCK_TIMESTAMP)=date_trunc(hour, b.RECORDED_HOUR) and SYMBOL='wNEAR'
          where a.BLOCK_TIMESTAMP>=CURRENT_DATE-1000
      ),
      
      near_transfers as (
          select a.*, TX_FEE as FEE, FEE_USD
          from (
          select BLOCK_TIMESTAMP, TX_HASH, TRADER as user, AMOUNT_IN as usd_amount
          from near.core.ez_dex_swaps
          where token_in ilike '%usd%' or token_in ilike 'dai'
          union 
          select BLOCK_TIMESTAMP, TX_HASH, TRADER as user, AMOUNT_IN as usd_amount
          from near.core.ez_dex_swaps
          where token_out ilike '%usd%' or token_out ilike 'dai'
          union 
          select BLOCK_TIMESTAMP, TX_HASH, TRADER as user, AMOUNT_IN*PRICE_USD as usd_amount
          from near.core.ez_dex_swaps a 
          join near_prices b
          on date_trunc(hour, a.BLOCK_TIMESTAMP)=date_trunc(hour, b.RECORDED_HOUR) and SYMBOL='wNEAR'
          where token_in='wNEAR'
          union 
          select BLOCK_TIMESTAMP, TX_HASH, TRADER as user, AMOUNT_IN*PRICE_USD as usd_amount
          from near.core.ez_dex_swaps a 
          join near_prices b
          on date_trunc(hour, a.BLOCK_TIMESTAMP)=date_trunc(hour, b.RECORDED_HOUR) and SYMBOL='wNEAR'
          where token_out='wNEAR'
          union
          select BLOCK_TIMESTAMP, TX_HASH, TX_SIGNER as user, (DEPOSIT/1e24)*PRICE_USD  as usd_amount
          from near.core.fact_transfers a 
          join near_prices b
          on date_trunc(hour, a.BLOCK_TIMESTAMP)=date_trunc(hour, b.RECORDED_HOUR) and SYMBOL='wNEAR'
          where STATUS=TRUE) a 
          join near_fees b 
          on a.TX_HASH=b.TX_HASH), 
      
      near_txs as (
          select BLOCK_ID, BLOCK_TIMESTAMP, a.TX_HASH, TX_SIGNER as user, TX_FEE as FEE, FEE_USD, TX_STATUS
          from near.core.fact_transactions a 
          join near_fees b 
          on a.TX_HASH=b.TX_HASH)
        
        select sum(fee) as fee, sum(FEE_USD) as FEE_USD, avg(FEE_USD) as PRICE_USD, 
        (select  div0(sum(FEE_USD),(sum(case when USD_AMOUNT<=500000000 then USD_AMOUNT else 0 end)/1000000)) from near_transfers) as avg_fee_1M
        from near_txs`
    },
    'Total-staking-pools': {
      result: null,
      sql: `select 
      sum(case when ACTION='Stake' then STAKE_AMOUNT/1e24 else null end) as staking_volume, 
      sum(case when ACTION='Unstake' then STAKE_AMOUNT/1e24 else null end) as unstaking_volume,   
        staking_volume-unstaking_volume as Total_near_stacked,
        count(distinct TX_SIGNER) as staker, 
        count(distinct POOL_ADDRESS) as pools
      from 
      near.core.dim_staking_actions`
    },
    'nft': {
      result: null,
      sql: `Select 
      count(*) as number , 
      count(distinct PROJECT_NAME) as project_number, 
      count(distinct TX_SIGNER) as minter_number, 
      sum(NETWORK_FEE) as total_mint_price, 
      avg(NETWORK_FEE) as avg_mint_price,
      number/minter_number avergae_per_minter,
      number/project_number average_per_project
    from 
    near.core.ez_nft_mints`
    }



    //

  }

};

const getters = {
  getQueries(state) {
    return state.queries;
  },
};

const mutations = {
  setQueryResult(state, data) { // data => query, result
    state.queries[data.query].result = data.result;
  },
};



export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
