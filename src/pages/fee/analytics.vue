<template>
    <div class="row">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <SingleChart title="Total Spend Gas Price In USD" name="USD" column="1"
                query-name='Total-Spend-Gas-Price-In-$USD' />
        </div>

        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <SingleChart title="Average Gas Price USD" name="USD" column="2"
                query-name='Total-Spend-Gas-Price-In-$USD' />
        </div>


        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <SingleChart title="Average Gas Price Per 1M $USD Transfer" name="USD" column="3"
                query-name='Total-Spend-Gas-Price-In-$USD' />
        </div>

        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <SingleChart title="Total Spend Gas Price In near" name="USD" column="0"
                query-name='Total-Spend-Gas-Price-In-$USD' />
        </div>

        <div class="col-12">
            <LineChart class="border rounded" title="Near Hourly Chain Token Price Over Time" :chart-colors="1"
                query-name="Near-Hourly-Gas-Price-vs-Chain-Token-Price-Over-Time" force-stacked
                :axis="{ x: 'date', y: 'price_usd' }" />
        </div>


        <div class="col-12">
            <LineChart class="border rounded"  title="Near Hourly Gas Price Over Time" :chart-colors="1"
                query-name="Near-Hourly-Gas-Price-vs-Chain-Token-Price-Over-Time" force-stacked
                :axis="{ x: 'date', y: 'fee_usd' }" />
        </div>


        <div class="col-12">
            <LineChart class="border rounded" title="Near Hourly Gas Fee (In $NEAR) Over Time" :chart-colors="1"
                query-name="Near-Hourly-Gas-Fee-In-$NEAR-Over-Time" force-stacked :axis="{ x: 'date', y: 'fee' }" />
        </div>

        <div class="col-12">
            <DataTable query-name="Near-Top-Fee-Spenders"
                :haders="['User', 'TOTAL_FEE', 'TOTAL_FEE_USD', 'AVG_FEE_USD', 'RANK']"
                :dataNames="['user', 'total_fee', 'total_fee_usd', 'avg_fee_usd', 'rank']"
                title="Near Top Fee Spenders" />
        </div>

       
        <div class="col-12">
                <BarChart class="border rounded" label="Fee" title="Near Top Fee Spenders" dot-format-date
                    query-name="Near-Top-Fee-Spenders" :axis="{ x: 'user', y: 'total_fee_usd' }" :chart-colors="6" />
            </div>

        <!-- <div class="col-12">
            <LineChart class="border rounded" title="Near Hourly Gas Price vs. Chain Token Price Over Time"
                :chart-colors="2" query-name="Near-Hourly-Gas-Price-vs-Chain-Token-Price-Over-Time" force-stacked
                :axis="{ x: 'date', y: 'fee' }" :stacked="{ number: 2, column: '', order: ['fee_usd', 'price_usd'] }" />
        </div> -->

        <!-- <div class="col-12">
            <LineChart class="border rounded" title="Near Hourly Gas Fee (In $NEAR) Over Time"
                :chart-colors="2" query-name="Near-Hourly-Gas-Price-vs-Chain-Token-Price-Over-Time" force-stacked
                :axis="{ x: 'date', y: 'fee' }" :stacked="{ number: 2, column: '', order: ['fee_usd', 'price_usd'] }" />
        </div> -->





    </div>
</template>


<script>

export default {
    data() {
        return {

        }
    },
    components: {
        BarChart: () => import("@/components/charts/bar.vue"),
        // DoughnutChart: () => import("@/components/charts/doughnut.vue"),
        LineChart: () => import("@/components/charts/line.vue"),
        // MixedChart: () => import("@/components/charts/mixed.vue"),
        SingleChart: () => import("@/components/charts/single.vue"),
        DataTable: () => import("@/components/table.vue")
    }
}
</script>