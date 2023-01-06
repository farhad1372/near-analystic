<template>
    <div class="row">
        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
            <SingleChart query-name="users" title="Total users" column="0" />
        </div>

        <div class="col-12">
            <LineChart class="border rounded" title="Price $" query-name="Price-$" :axis="{ x: 'date', y: 'price' }" />
        </div>

        <div class="col-12">
            <BarChart class="border rounded" label="Daily transactions" title="Daily transaction number"
                query-name="Daily-transaction-number" :axis="{ x: 'date', y: 'number' }" />
        </div>

        <div class="col-12">
            <LineChart class="border rounded" title="Cumulative transaction number" query-name="Cumulative-transaction-number" :axis="{ x: 'date', y: 'cumulative_transactions' }" />
        </div>
        <div class="col-12">
            <LineChart class="border rounded" title="Success rate" query-name="Cumulative-transaction-number" :axis="{ x: 'date', y: 'success_rate' }" />
        </div>

        <div class="col-12">
            <BarChart class="border rounded" label="Average transaction" title="Average transaction per user per day"
                query-name="Average-transaction-per-user-per-day" :axis="{ x: 'date', y: 'transaction_per_user' }" />
        </div>

        <div class="col-12">
            <BarChart class="border rounded" label="Users" title="Daily active users"
                query-name="Daily-active-user" :axis="{ x: 'date', y: 'daily_active_user' }" />
        </div>
f
        <div class="col-12">
            <BarChart class="border rounded" label="Transaction fee" title="Daily transaction fee"
                query-name="Daily-active-user" :axis="{ x: 'date', y: 'transaction_feee' }" />
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
        // DoughnutChart: () => import("@/components/charts/doughnut.vue"),
        LineChart: () => import("@/components/charts/line.vue"),
        // MixedChart: () => import("@/components/charts/mixed.vue"),
        SingleChart: () => import("@/components/charts/single.vue")
    }
}
</script>