<template>
    <div class="row">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <SingleChart title="Total staking pools" name="" column="4" query-name='Total-staking-pools' />
        </div>

        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <SingleChart title="Total Near unstaked" name="" column="1" query-name='Total-staking-pools' />
        </div>


        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <SingleChart title="Total Near staked" name="" column="0" query-name='Total-staking-pools' />
        </div>

        <!-- <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <SingleChart title="Total Volume Near unstaked" name="" column="2" query-name='Total-staking-pools' />
        </div> -->

        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <SingleChart title="Total staker numbers" name="" column="3" query-name='Total-staking-pools' />
        </div>

        <div class="col-12">
            <BarChart class="border rounded" label="Reward transaction" title="Daily staking and unstacking number"
                query-name="Daily-staking-and-unstacking-number" :axis="{ x: 'date', y: 'number' }"
                :stacked="{ number: 2, column: '', order: ['staking_number', 'unstaking_number'] }" />
        </div>

        <div class="col-12">
            <BarChart class="border rounded" label="Reward transaction" title="Daily staking and unstacking amount"
                query-name="Daily-staking-and-unstacking-number" :axis="{ x: 'date', y: 'amount' }"
                :stacked="{ number: 2, column: '', order: ['staking_volume', 'unstaking_volume'] }" />
        </div>

        <div class="col-12">
            <LineChart class="border rounded" title="Net flow" query-name="Net-flow"
                :axis="{ x: 'date', y: 'net_flow' }" />
        </div>


        <div class="col-12">
            <LineChart class="border rounded" title="Cumulative Daily staking and unstacking amount" :point-radius="0"
                query-name="Cumulative-Daily-staking-and-unstacking-amount" :axis="{ x: 'date', y: 'volume' }"
                :srot="{ by: 'date', type: 'asc' }"
                :stacked="{ number: 2, column: '', order: ['c_staking_volume', 'c_unstaking_volume'] }" />
        </div>

        <div class="col-12 col-md-6 ">
            <DoughnutChart class="border rounded" :some-in-group="{ by: 'range', over: 'number' }"
                label="Distribution of stakers based on how near they have on staking pools"
                query-name="Distribution-of-stakers-based-on-how-near-they-have-on-staking-pools" />
        </div>

        <div class="col-12">
            <BarChart class="border rounded" label="Distribution" dot-format-date
                title="Distribution of stakers based on how near they have on staking pools"
                query-name="Distribution-of-stakers-based-on-how-near-they-have-on-staking-pools"
                :axis="{ x: 'range', y: 'number' }" :chart-colors="6" />
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
        LineChart: () => import("@/components/charts/line.vue"),
        DoughnutChart: () => import("@/components/charts/doughnut.vue"),




    }
}
</script>