
const state = {
  //General
  queries: {
    'Price-$': {
      result: null,
      sql: `select avg(CLOSE) as price, 
      date_trunc('day',RECORDED_HOUR) as date 
      from 
      crosschain.core.fact_hourly_prices
      where 
      ID='near'
      group by date order by date asc`
    },
    'Cumulative-transaction-number': {
      result: null,
      sql: `select 
      sum(TRANSACTION_FEE/1e24) as transaction_feee, 
      count(*) as number ,
      avg(TRANSACTION_FEE/1e24) as average_transaction_fee,
      count(distinct TX_SIGNER) as daily_active_user, 
      sum(GAS_USED) as gas , 
      avg(GAS_USED) ,
      count(case when TX_STATUS='Success' then 1 else null end)*100/number as success_rate, 
      date_trunc('day',BLOCK_TIMESTAMP) as date,
      number/daily_active_user as transaction_per_user,
      sum(number) over (order by date) as cumulative_transactions,
      sum(transaction_feee) over (order by date) as cumulative_fees,  
      sum(gas) over (order by date) as cumulative_gas_used
   
   from 
   near.core.fact_transactions
   group by date order by date asc`
    },
    'Success-rate': {
      result: null,
      sql: `select 
      sum(TRANSACTION_FEE/1e24) as transaction_feee, 
      count(*) as number ,
      avg(TRANSACTION_FEE/1e24) as average_transaction_fee,
      count(distinct TX_SIGNER) as daily_active_user, 
      sum(GAS_USED) as gas , 
      avg(GAS_USED) ,
      count(case when TX_STATUS='Success' then 1 else null end)*100/number as success_rate, 
      date_trunc('day',BLOCK_TIMESTAMP) as date,
      number/daily_active_user as transaction_per_user,
      sum(number) over (order by date) as cumulative_transactions,
      sum(transaction_feee) over (order by date) as cumulative_fees,  
      sum(gas) over (order by date) as cumulative_gas_used
   
   from 
   near.core.fact_transactions
   group by date order by date asc`
    },
    'Near-Hourly-Gas-Price-vs-Chain-Token-Price-Over-Time': {
      result: null,
      sql: `with near_prices as (
        select date_trunc(hour,TIMESTAMP) as RECORDED_HOUR, SYMBOL, TOKEN_CONTRACT, avg(PRICE_USD) as PRICE_USD
          from near.core.fact_prices
          group by 1,2,3
      ),
      
      near_fees as (
          select TX_HASH, TRANSACTION_FEE/1e24 as TX_FEE, TX_FEE*PRICE_USD as FEE_USD, PRICE_USD as PRICE
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
          select BLOCK_ID, BLOCK_TIMESTAMP, a.TX_HASH, TX_SIGNER as user, TX_FEE as FEE, FEE_USD, PRICE, TX_STATUS
          from near.core.fact_transactions a 
          join near_fees b 
          on a.TX_HASH=b.TX_HASH)
        
        select date_trunc(hour, BLOCK_TIMESTAMP) as date, sum(fee) as fee, sum(FEE_USD) as FEE_USD, avg(PRICE) as PRICE_USD
        from near_txs
        group by  1  order by date asc`
    },
    'Near-Hourly-Gas-Fee-In-$NEAR-Over-Time': {
      result: null,
      sql: `with near_prices as (
        select date_trunc(hour,TIMESTAMP) as RECORDED_HOUR, SYMBOL, TOKEN_CONTRACT, avg(PRICE_USD) as PRICE_USD
          from near.core.fact_prices
          group by 1,2,3
      ),
      
      near_fees as (
          select TX_HASH, TRANSACTION_FEE/1e24 as TX_FEE, TX_FEE*PRICE_USD as FEE_USD, PRICE_USD as PRICE
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
          select BLOCK_ID, BLOCK_TIMESTAMP, a.TX_HASH, TX_SIGNER as user, TX_FEE as FEE, FEE_USD, PRICE, TX_STATUS
          from near.core.fact_transactions a 
          join near_fees b 
          on a.TX_HASH=b.TX_HASH)
        
        select date_trunc(hour, BLOCK_TIMESTAMP) as date, sum(fee) as fee, sum(FEE_USD) as FEE_USD, avg(PRICE) as PRICE_USD
        from near_txs
        group by  1  order by date asc`
    },
    'Net-flow': {
      result: null,
      sql: `select 
      date_trunc('day',BLOCK_TIMESTAMP ) as date,
    sum(case when ACTION='Stake' then STAKE_AMOUNT/1e24 else null end) as staking_volume, 
    sum(case when ACTION='Unstake' then STAKE_AMOUNT/1e24 else null end) as unstaking_volume,   
    count(case when ACTION='Stake' then 1 else null end) as staking_number, 
    count(case when ACTION='Unstake' then 1 else null end) as unstaking_number,  
    sum(staking_volume) over (order by date) as c_staking_volume, 
      sum(unstaking_volume) over (order by date) as c_unstaking_volume, 
      c_staking_volume-c_unstaking_volume as net_flow
    from 
    near.core.dim_staking_actions
    
      group by date order by date asc`
    },
    'Cumulative-Daily-staking-and-unstacking-amount': {
      result: null,
      sql: `select 
      date_trunc('day',BLOCK_TIMESTAMP ) as date,
    sum(case when ACTION='Stake' then STAKE_AMOUNT/1e24 else null end) as staking_volume, 
    sum(case when ACTION='Unstake' then STAKE_AMOUNT/1e24 else null end) as unstaking_volume,   
    count(case when ACTION='Stake' then 1 else null end) as staking_number, 
    count(case when ACTION='Unstake' then 1 else null end) as unstaking_number,  
    sum(staking_volume) over (order by date) as c_staking_volume, 
      sum(unstaking_volume) over (order by date) as c_unstaking_volume, 
      c_staking_volume-c_unstaking_volume as net_flow
    from 
    near.core.dim_staking_actions
    
      group by date order by date asc`
    },
    'Cumulative-Daily-NFT-mint': {
      result: null,
      sql: `select 
      count(*) as number, 
      date_trunc('day',BLOCK_TIMESTAMP) as DATE
      , 
      sum(number) over (order by date) as cumulative_number 
      from 
      near.core.ez_nft_mints
      
      group by date 
      order by date asc`
    },
    


  },

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
