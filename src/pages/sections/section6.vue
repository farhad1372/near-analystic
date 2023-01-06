<template>
    <div class="row">
        <div class="col-12 mb-8">
            <h1 class="mb-1">Section 6</h1>
            <div class="muted-text small">Staked LUNA, The percentage of LUNA staked, Distributed Staking rewards in USD
                trend
            </div>

            <div class="col-12 px-0 mt-4">
                <div class="row">
                    <div class="col-6">
                        <SingleChart title="Total number of wallet contracts" name="Wallet Contracts" column="0"
                            query-name='Total-number-of-wallet-contracts' />
                    </div>
                    <div class="col-6">
                        <SingleChart title="Total number of smart contracts" name="Smart Contracts" column="0"
                            query-name='Total-number-of-smart-contracts' />
                    </div>
                </div>
            </div>

            <div class="col-12 mt-6">
                <BarChart class="border rounded" label="Daily number of new wallet contracts deployed"
                    query-name="Daily-number-of-new-wallet-contracts-deployed" :axis="{ x: 'date', y: 'number' }" />
            </div>

            <div class="col-12 mt-6">
                <BarChart :chart-colors="2" class="border rounded" label="Daily number of new smart contracts deployed"
                    query-name="Daily-number-of-new-smart-contracts-deployed" :axis="{ x: 'date', y: 'number' }" />
            </div>

            <div class="col-12 mt-6">
                <BarChart :chart-colors="6" class="border rounded" label="Labeled smart contract types number"
                    query-name="Labeled-smart-contract-types-number" dot-format-date
                    :axis="{ x: 'label_type', y: 'number' }" />
            </div>

            <div class="col-12 col-md-6 ">
                <DoughnutChart class="border rounded" :some-in-group="{ by: 'label_type', over: 'number' }"
                    label="Smart contract types" query-name="Smart-contract-types" />
            </div>

            <div class="col-12">
                <LineChart class="border rounded" title="Cumulative daily number of new wallet contracts deployed"
                    query-name="Cumulative-daily-number-of-ew-wallet-contracts-deployed"
                    :axis="{ x: 'date', y: 'number' }" />
            </div>

            <div class="col-12">
                <LineChart class="border rounded" title="Daily cumulative number of new smart contracts deployed"
                    query-name="Daily-cumulative-number-of-new-smart-contracts-deployed"
                    :axis="{ x: 'date', y: 'numberr' }" />
            </div>


            <div class="col-12">
                <DataTable title="Stable coin supply" query-name="Stable-coin-supply"
                    :haders="['VOLUME', 'STABLE COIN']" :dataNames="['volume', 'stablecoin']" />
            </div>


            <div class="col-12 mt-6">
                <BarChart :chart-colors="6" class="border rounded" label="Stable coin supply"
                    query-name="Stable-coin-supply" dot-format-date :axis="{ x: 'stablecoin', y: 'volume' }" />
            </div>



            <div class="col-12 col-md-6 ">
                <DoughnutChart class="border rounded" :some-in-group="{ by: 'stablecoin', over: 'volume' }"
                    label="Stable coin supply" query-name="Stable-coin-supply" />
            </div>



            <div class="col-12">
                <LineChart class="border rounded" title="daily Stable coins supply trend"
                    query-name="daily-stable-coins-supply-trend" :axis="{ x: 'date', y: 'volume' }"
                    :stacked="{ number: 5, column: '', order: ['USDC', 'AXLUSDTT', 'AXLUSDC', 'USDT', 'UST'] }" />
            </div>
            <!-- :srot="{ by: 'date', type: 'asc' }" -->


        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    components: {
        SingleChart: () => import("@/components/charts/single.vue"),
        BarChart: () => import("@/components/charts/bar.vue"),
        DoughnutChart: () => import("@/components/charts/doughnut.vue"),
        LineChart: () => import("@/components/charts/line.vue"),
        DataTable: () => import("@/components/table.vue"),


    }
}
</script>