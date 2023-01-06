<template>
    <div class="row">
        <div class="col-12">
            <BarChart label="Transaction" query-name="Weekly-transaction-number" title="Weekly transaction number"
                :axis="{ x: 'date', y: 'number' }" />
        </div>

        <div class="col-12">
            <LineChart label="Transaction" query-name="Daily-Luna2-price-$" title="Weekly transaction number"
                :axis="{ x: 'date', y: 'price' }" />
        </div>

        <div class="col-12">
            <BarChart label="Transaction" query-name="Cumulative-daily-fee-$" title="Cumulative daily fee $"
                :axis="{ x: 'date', y: 'summ' }"  :sortDate="{ by: 'date', type: 'asc' }" />
        </div>

        <div class="col-12">
            <BarChart label="Transaction" query-name="Daily-fee-$" title="Daily fee $"
                :axis="{ x: 'date', y: 'feeusd' }"  :sortDate="{ by: 'date', type: 'asc' }" />
        </div>

        <div class="col-12">
            <BarChart label="Transaction" query-name="Average-Transaction-Fee-per-transaction-per-week-$" title="Daily fee $"
                :axis="{ x: 'doty', y: 'avg(feeusd)' }"  :sortDate="{ by: 'date', type: 'asc' }" />
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
        BarChart: () => import("@/components/charts/bar.vue"),
        LineChart: () => import("@/components/charts/line.vue"),

    }
}
</script>