<template>
        <div class="row">
                <div class="col-12">
                        <BarChart query-name="Weekly-Bridge-to-Ethereum-$"
                                title="Weekly Bridge to Ethereum (US dollars $)" class="border rounded" label="Bridge"
                                :axis="{ x: 'datee', y: 'volume' }" />
                </div>



                <div class="col-12 col-md-4">
                        <DoughnutChart query-name="Bridge-to-Ethereum-in-last-month" label="Bridge to Ethereum in last month"
                                class="border rounded" :some-in-group="{ by: 'symbol', over: 'usd_volume' }" />
                </div>

                <div class="col-12 col-md-8">
                        <DoughnutChart query-name="Total-tokens-Bridge-to-Ethereum"
                                label="Total tokens Bridge to Ethereum" class="border rounded"
                                :some-in-group="{ by: 'symbol', over: 'usd_volume' }" />
                </div>

                <div class="col-12">
                        <BarChart query-name="Total-tokens-Bridge-to-Ethereum-$" :chart-colors="6"
                                title="Total tokens Bridge to Ethereum (US dollars $)" class="border rounded"
                                label="tokens" :axis="{ x: 'symbol', y: 'volume' }" dot-format-date />
                </div>

                <div class="col-12">
                        <BarChart query-name="Bridge-to-Ethereum-in-last-month-$" :chart-colors="6"
                                title="Bridge to Ethereum in last month (US dollars $)" class="border rounded"
                                label="Bridge" :axis="{ x: 'symbol', y: 'volume' }" dot-format-date />
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
                DoughnutChart: () => import("@/components/charts/doughnut.vue"),
        }
}
</script>