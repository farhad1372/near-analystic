<template>
    <div class="row">
        <div class="col-12 mb-8">
            <h1 class="mb-1">Section 2</h1>
            <div class="muted-text small">Staked LUNA, The percentage of LUNA staked, Distributed Staking rewards in USD
                trend
            </div>
        </div>

        <div class="col-12">
            <h2 class="d-flex px-0 mx-0 align-center">
                <i class="isax isax-lamp-on warning lg solid mr-3"></i>
                <span>Methodology</span>
            </h2>
            <ul class="mt-4">
                <li>ez_staking has been used for finding staking details, and ez_transfers tables have been used for
                    finding rewards.</li>
                <li>To find rewards in USD, we had to find the luna 2 price from crosschain.core.fact_hourly_pricethen
                    table, then multiplied it to Luna volume.</li>
                <li>
                    We can find reward transactions in ez_transfers with the below condition:<br />
                    <code>MESSAGE_VALUE['@type'] ='/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward'</code>
                </li>
                <li>The results have been prepared in both US dollars and Luna volume.</li>
            </ul>
        </div>

        <div class="col-12">
            <BarChart class="border rounded" label="action" title="Daily staking action number"
                :stacked="{ number: 3, column: 'action', order: ['Delegate', 'Redelegate', 'Undelegate'] }"
                :stacked-order="['Redelegate', 'Undelegate', 'Delegate']" query-name="daily-staking-action"
                :groupBy="{ by: 'date', type: 'asc' }" :axis="{ x: 'date', y: 'number' }" />
        </div>

        <div class="col-12">
            <BarChart class="border rounded" label="action" title="Daily staking action volume"
                :stacked="{ number: 3, column: 'action', order: ['Redelegate', 'Undelegate', 'Delegate'] }"
                :groupBy="{ by: 'date', type: 'asc' }" 
                query-name="daily-staking-action" :axis="{ x: 'date', y: 'volume' }" />
        </div>


        <div class="col-12">
            <div class="row">
                <div class="col-12 col-md-6 ">
                    <DoughnutChart class="border rounded" :some-in-group="{ by: 'action', over: 'number' }"
                        label="Total staking action number" query-name="total-staking-action-number" />
                </div>
                <div class="col-12 col-md-6 ">
                    <DoughnutChart class="border rounded" :some-in-group="{ by: 'action', over: 'volume' }"
                        label="Total staking action volume" query-name="total-staking-action-number" />
                </div>
            </div>
        </div>

        <div class="col-12">
            <LineChart class="border rounded" title="Staking action volume (Cumulative)" :point-radius="0"
                query-name="staking-action-volume" :axis="{ x: 'date', y: 'volume' }"
                :srot="{ by: 'date', type: 'asc' }"
                :stacked="{ number: 3, column: '', order: ['stakee', 'unstakee', 'net_floww'] }" />
        </div>

        <div class="col-12">
            <MixedChart :charts="mixChartType" title="Daily staking reward (In dollars)"
                label="Daily staking reward (In dollars)" class="border rounded" :axis="{ x: 'date', y: 'dollar' }"
                query-name="daily-staking-reward-in-dollar" />
        </div>

        <div class="row">
            <div class="col-4">
                <SingleChart title="The percentage of staked LUNA" name="%" column="0" type="percentage"
                    query-name='the-percentage-of-staked-LUNA' />
            </div>
            <div class="col-4">
                <SingleChart title="Total staking reward in dollars" name="$" column="0"
                    query-name='total-staking-reward-in-dollars' />
            </div>

            <div class="col-4">
                <SingleChart title="Number of reward transaction" name="rewards"
                    query-name='Number-of-reward-transaction' />
            </div>

            <div class="col-6">
                <SingleChart title="Number of reward reciever" name="Total" column="1"
                    query-name='Number-of-reward-reciever-average-reward' />
            </div>
            <div class="col-6">
                <SingleChart title="Average reward per staker (In dollars)" name="$" column="2"
                    query-name='Number-of-reward-reciever-average-reward' />
            </div>

            <div class="col-12">
                <BarChart class="border rounded" label="Daily average" title="Daily staking action number"
                    query-name="Daily-averag-reward-volume-per-transaction" :axis="{ x: 'date', y: 'average' }" />
            </div>

            <div class="col-12">
                <BarChart class="border rounded" label="Reward transaction" title="Number of reward transaction per day"
                    query-name="Number-of-reward-transaction-per-day" :axis="{ x: 'date', y: 'number' }" />
            </div>

            <div class="col-12">
                <BarChart class="border rounded" label="Wallets" title="Luna balance distribution"
                    query-name="Luna-balance-distribution" dot-format-date
                    :axis="{ x: 'balance_range', y: 'wallet_number' }" />
            </div>

            <div class="col-12">
                <BarChart class="border rounded" label="Distribution" title="Distribution of reward receivers"
                    query-name="Distribution-of-reward-receivers" dot-format-date
                    :axis="{ x: 'reward_range', y: 'number' }" />
            </div>

            <div class="col-12">
                <BarChart class="border rounded" label="Distribution" title="Distribution of rewards $"
                    query-name="Distribution-of-rewards-$" dot-format-date :axis="{ x: 'reward_range', y: 'number' }" />
            </div>

            <div class="col-12">
                <h2>Observations</h2>
                <p class="mb-1">
                    "The Daily staking action number" diagram has been visualized here.<br />
                    This diagram consists of three different processes.<br />
                </p>
                <ul class="mt-0 pt-0">
                    <li>Delegate</li>
                    <li>Undelegate</li>
                    <li>Redelagate</li>
                </ul>
                <p>
                    As it is evident on the chart, 90.8% (654641)of this metric is related to the "Delegate" process.

                    Also, the delegation over time increase significantly, and the general trend of this metric over
                    time is up-warding!

                    The second-ranking in this diagram belongs to the "Undelegate"

                    Clearly, this item is related to 4.75% (34227) of total staking.

                    By taking a close look at the trend of this item, it can be found that its trend is decreased.

                    The third process is "Redelegate" by having 4.41% (31786) share in this chart.

                    The amount of this metric is decreased from the beginning to date.
                </p>
                <p>
                    In the next chart, the "Daily staking action volume" is shown. <br />
                </p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            mixChartType: [
                {
                    type: 'line',
                    label: 'Cumulative staking rewards',
                    value: 'cumulative_staking_rewards'
                },
                {
                    type: 'bar',
                    label: 'Staking rewards USD',
                    value: 'staking_rewards_usd'
                },

            ]
        }
    },
    components: {
        BarChart: () => import("@/components/charts/bar.vue"),
        DoughnutChart: () => import("@/components/charts/doughnut.vue"),
        LineChart: () => import("@/components/charts/line.vue"),
        MixedChart: () => import("@/components/charts/mixed.vue"),
        SingleChart: () => import("@/components/charts/single.vue")
    }
}
</script>

<style scoped>

</style>