<template>
    <div>
        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <SingleChart query-name="users" column="0" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="numberr" title="Weekly avergae fee per transcation (US dollars$) " label="" :axis="{x:'date', y:'agfees' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="numberr" title="Weekly gas used" label="" :axis="{x:'date', y:'gas' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="numberr" title="Weekly average gas price (US dollars)" label="" :axis="{x:'date', y:'avggasprice' }" />
        </div>
        
        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <LineChart class="border rounded" query-name="number" title="Cumulative transaction fee $" :point-radius="0" :axis="{x:'date', y:'cumulative_fees' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <LineChart class="border rounded" query-name="number" title="Cumulative gas used" :point-radius="0" :axis="{x:'date', y:'cumulative_gas_used' }" />
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
        LineChart: () => import("@/components/charts/line.vue"),
        // MixedChart: () => import("@/components/charts/mixed.vue"),
        SingleChart: () => import("@/components/charts/single.vue")
    }
}
</script>