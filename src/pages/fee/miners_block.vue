<template>
    <div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="blocks_miners" title="Weekly average transaction per block" label="" :axis="{x:'date', y:'average_per_block' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="blocks_miners" title="Weekly total difficalty per block" label="" :axis="{x:'date', y:'total_difficulty_per_block' }" />
</div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="blocks_miners" title="Weekly average gas used per block" label="" :axis="{x:'date', y:'gas_used_per_block' }" />
        </div>

       <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="blocks_miners" title="Weekly average gas limit per block" label="" :axis="{x:'date', y:'gas_limit_per_block' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="blocks_miners" title="Weekly active miner number" label="" :axis="{x:'date', y:'miner_number' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="blocks_miners" title="Weekly gas used per miner" label="" :axis="{x:'date', y:'per_miner' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="miners" title="Monthly miners tip (ETH)" label="" :axis="{x:'date', y:'miners_tip' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="miners" title="Monthly ETH burn as base fee" label="" :axis="{x:'date', y:'eth_burn' }" />
        </div>
    
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    components : {
         BarChart: () => import("@/components/charts/bar.vue"),
        // DoughnutChart: () => import("@/components/charts/doughnut.vue"),
        // LineChart: () => import("@/components/charts/line.vue"),
        // MixedChart: () => import("@/components/charts/mixed.vue"),
        //SingleChart: () => import("@/components/charts/single.vue")
    }
}
</script>