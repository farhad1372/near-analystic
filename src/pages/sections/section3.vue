<template>
    <div class="row">
        <div class="col-12 mb-8">
            <h1 class="mb-1">Section 3</h1>
            <div class="muted-text small">Richlist (Top 100)</div>
        </div>
        <div class="col-12">
            <h2 class="d-flex px-0 mx-0 align-center">
                <i class="isax isax-lamp-on warning lg solid mr-3"></i>
                <span>Methodology</span>
            </h2>
            <ul class="mt-4">
                <li>The table ez_transfers has been used for finding Rich list.</li>
                <li>We calculated the inflow and outflow for each wallet address, and the balance of each address was
                    calculated by subtracting the inflow from the outflow, so now we have a balance list.</li>
            </ul>
        </div>
        <div class="col-12">
            <DataTable title="Rich list" query-name="rich-list" :haders="['RECEIVE', 'USER', 'BALANCE']"
                :dataNames="['receivee', 'user', 'balance']" />
        </div>

        <div class="col-12">
            <BarChart class="border rounded" label="Balance" title="Rich list (Top 100)" query-name="Rich-list-top-100"
                dot-format-date :axis="{ x: 'user', y: 'balance' }" hide-x-axis />
        </div>

        <div class="col-12">
            <h2>Observations</h2>
            <p>
                In this section, the rich list (Top 100) of the Terra ecosystem is represented. <br />
                As is evident, there are three wallets with a notable amount of liquidity. <br />
                Here's the top 5 of the rich list with their balance. <br />
            </p>
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
        DataTable: () => import("@/components/table.vue"),
        BarChart: () => import("@/components/charts/bar.vue"),
    }
}
</script>

<style >

</style>