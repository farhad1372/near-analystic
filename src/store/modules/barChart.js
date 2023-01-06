
const state = {
  queries: {
    //General
    'Daily-transaction-number': {
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
    'Average-transaction-per-user-per-day': {
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
    'Daily-active-user': {
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
    'Near-Top-Fee-Spenders': {
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
        
        
        select user, sum(fee) as total_fee, sum(ifnull(FEE_USD,0)) as total_FEE_USD, avg(FEE_USD) as avg_FEE_USD,
        row_number() over (order by total_FEE_USD desc) as rank
        from near_txs
        group by 1  
        order by total_FEE_USD desc 
        limit 20`
    },

    'Daily-staking-and-unstacking-number': {
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
    
      group by date`
    },

    'Distribution-of-stakers-based-on-how-near-they-have-on-staking-pools': {
      result: null,
      sql: `with ggg as
      (select 
      sum(case when ACTION='Stake' then STAKE_AMOUNT/1e24 else null end) as staking_volume, 
      sum(case when ACTION='Unstake' then STAKE_AMOUNT/1e24 else null end) as unstaking_volume,   
      TX_SIGNER
        from 
        near.core.dim_staking_actions
         
      group by TX_SIGNER
      )
      , 
        joon as 
      (select 
      case when staking_volume is null then 0 else staking_volume end as staking,
      case when unstaking_volume is null then 0 else unstaking_volume end as unstaking, 
      staking-unstaking as near_locked, 
      TX_SIGNER
      from ggg 
      order by near_locked desc )
      
      
      (select count(*) as number , '0-1' as range 
      from 
      joon
      where 
      near_locked between 0 and 1)
      
      union ALL
      
      (select count(*) as number , '1-10' as range 
      from 
      joon
      where 
      near_locked between 1 and 10)
      
      
      union ALL
      
      (select count(*) as number , '10-100' as range 
      from 
      joon
      where 
      near_locked between 10 and 100)
      
      
      union ALL
      
      (select count(*) as number , '100-1000' as range 
      from 
      joon
      where 
      near_locked between 100 and 1000)
      
      
      union ALL
      
      (select count(*) as number , '1000-10000' as range 
      from 
      joon
      where 
      near_locked between 1000 and 10000)
      
      
      union ALL
      
      (select count(*) as number , '10000-100000' as range 
      from 
      joon
      where 
      near_locked between 10000 and 100000)
      
      
      union ALL
      
      (select count(*) as number , '100000-1000000' as range 
      from 
      joon
      where 
      near_locked between 100000 and 1000000)
      
      
      
      union ALL
      
      (select count(*) as number , '1000000-10000000' as range 
      from 
      joon
      where 
      near_locked between 1000000 and 10000000)
      
      
      union ALL
      
      (select count(*) as number , '10000000-100000000' as range 
      from 
      joon
      where 
      near_locked between 10000000 and 100000000)`
    },

    'NFT-number-per-platform': {
      result: null,
      sql: `select 
       count(*) as number, 
       TX_RECEIVER 
       from 
       near.core.ez_nft_mints
       group by TX_RECEIVER
         order by number desc
       limit 20`
    },

    'Daily-NFT-mint': {
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

    'Weekly-Bridge-to-Ethereum-$': {
      result: null,
      sql: `--SQL credits to abbasian34-8158 GP winner NEAR meta analysis
      WITH bridge_to_near_or_aurora as (
      SELECT
      *
      FROM (
      SELECT
      *
      from ethereum.core.fact_transactions as transactions
      INNER JOIN
      (SELECT
      tx_hash as tx_hash_t,
      contract_address,
      amount_usd,
      raw_amount,
      symbol
      FROM ethereum.core.ez_token_transfers
      ) as transfers
      ON transactions.tx_hash=transfers.tx_hash_t
      WHERE (from_address = '0x23ddd3e3692d1861ed57ede224608875809e127f' 
        OR to_address = '0x23ddd3e3692d1861ed57ede224608875809e127f')
      AND SUBSTRING(INPUT_DATA,0,10) = '0x4a00c629'
       
      
      )
      ),
        money as
      (select
      DATE_TRUNC('day',block_timestamp) as date,
      COUNT(DISTINCT TX_HASH) as number_transactions,
      COUNT(DISTINCT FROM_ADDRESS) as unique_users,
      SUM(amount_usd) as usd_volume,
      symbol,
        CASE WHEN date >= '2022-11-07' THEN 'After' 
            WHEN date < '2022-11-07' THEN 'Before' END AS range
      FROM bridge_to_near_or_aurora
       
      GROUP BY date, symbol)
      
      select sum (usd_volume) as volume , date_trunc('week',date) as datee
      from 
      money
      group by datee order by datee asc`
    },

    'Total-tokens-Bridge-to-Ethereum-$': {
      result: null,
      sql: `--SQL credits to abbasian34-8158 GP winner NEAR meta analysis
      WITH bridge_to_near_or_aurora as (
      SELECT
      *
      FROM (
      SELECT
      *
      from ethereum.core.fact_transactions as transactions
      INNER JOIN
      (SELECT
      tx_hash as tx_hash_t,
      contract_address,
      amount_usd,
      raw_amount,
      symbol
      FROM ethereum.core.ez_token_transfers
      ) as transfers
      ON transactions.tx_hash=transfers.tx_hash_t
      WHERE (from_address = '0x23ddd3e3692d1861ed57ede224608875809e127f' 
        OR to_address = '0x23ddd3e3692d1861ed57ede224608875809e127f')
      AND SUBSTRING(INPUT_DATA,0,10) = '0x4a00c629'
       
      
      )
      ),
        money as
      (select
      DATE_TRUNC('day',block_timestamp) as date,
      COUNT(DISTINCT TX_HASH) as number_transactions,
      COUNT(DISTINCT FROM_ADDRESS) as unique_users,
      SUM(amount_usd) as usd_volume,
      symbol,
        CASE WHEN date >= '2022-11-07' THEN 'After' 
            WHEN date < '2022-11-07' THEN 'Before' END AS range
      FROM bridge_to_near_or_aurora
       
      GROUP BY date, symbol)
      
      select sum (usd_volume) as volume, symbol
      from 
      money
      group by symbol`
    },
    'Bridge-to-Ethereum-in-last-month-$' : {
      result : null,
       sql : `--SQL credits to abbasian34-8158 GP winner NEAR meta analysis
       WITH bridge_to_near_or_aurora as (
       SELECT
       *
       FROM (
       SELECT
       *
       from ethereum.core.fact_transactions as transactions
       INNER JOIN
       (SELECT
       tx_hash as tx_hash_t,
       contract_address,
       amount_usd,
       raw_amount,
       symbol
       FROM ethereum.core.ez_token_transfers
       ) as transfers
       ON transactions.tx_hash=transfers.tx_hash_t
       WHERE (from_address = '0x23ddd3e3692d1861ed57ede224608875809e127f' 
         OR to_address = '0x23ddd3e3692d1861ed57ede224608875809e127f')
       AND SUBSTRING(INPUT_DATA,0,10) = '0x4a00c629'
           AND block_timestamp::date >= CURRENT_DATE - 30
       
       )
       ), 
         coma as
         
       (select
       DATE_TRUNC('day',block_timestamp) as date,
       COUNT(DISTINCT TX_HASH) as number_transactions,
       COUNT(DISTINCT FROM_ADDRESS) as unique_users,
       SUM(amount_usd) as usd_volume,
       symbol,
         CASE WHEN date >= '2022-11-07' THEN 'After' 
             WHEN date < '2022-11-07' THEN 'Before' END AS range
       FROM bridge_to_near_or_aurora
           WHERE block_timestamp::date >= CURRENT_DATE - 30
       GROUP BY date, symbol
       )
       
       
       select 
         sum(usd_volume)  as volume , symbol
         from coma group by symbol`
    }


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
