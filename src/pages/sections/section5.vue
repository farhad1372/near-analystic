<template>
    <div class="row">
        <div class="col-12 mb-8">
            <h1 class="mb-1">Section 5-1</h1>
            <div class="muted-text small">The percentage of LUNA IBC-ed out</div>
        </div>

        <div class="col-12">
            <h2 class="d-flex px-0 mx-0 align-center">
                <i class="isax isax-lamp-on warning lg solid mr-3"></i>
                <span>Methodology</span>
            </h2>
            <ul class="mt-4">
                <li>ez_transfers table has been used. the “bridge out” transaction could be found by the below condition
                    <br />
                    <code>MESSAGE_TYPE='/ibc.applications.transfer.v1.MsgTransfer' and CURRENCY='uluna'</code>
                </li>
                <li>To find rewards in USD, we had to find the luna 2 price from crosschain.core.fact_hourly_pricethen
                    table, then multiplied it to Luna volume.</li>
                <li>
                    The bridged-out destination could be from destination wallet addresses by the below code:<br />
                    <code>case <br/>
                        when SUBSTR(receiverr, 0, 4) = 'osmo' then 'osmo' <br/>
                        when SUBSTR(receiverr, 0, 4) = 'axel' then 'axelar' <br/>
                        when SUBSTR(receiverr, 0, 4) = 'grav' then 'GRAV' <br/>
                        when SUBSTR(receiverr, 0, 4) = 'secr' then 'secret' <br/>
                        when SUBSTR(receiverr, 0, 4) = 'terr' then 'terra' <br/>
                        when SUBSTR(receiverr, 0, 3) = 'cre' then 'CRE'<br/>
                        when SUBSTR(receiverr, 0, 3) = 'sif' then 'SIF'<br/>
                        when SUBSTR(receiverr, 0, 4) = 'kuji' then 'kujira'<br/>
                        when SUBSTR(receiverr, 0, 4) = 'cosm' then 'cosmos'<br/>
                        when SUBSTR(receiverr, 0, 4) = 'evmo' then 'evmos'<br/>
                        when SUBSTR(receiverr, 0, 4) = 'stri' then 'STRI'<br/>
                        when SUBSTR(receiverr, 0, 4) = 'juno' then 'juno'<br/>
                        else null end as blockchain</code>
                </li>

            </ul>
        </div>

        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
            <SingleChart title="The total volume of bridged out Luna" name="Luna" column="1"
                query-name='the-total-volume-of-bridged-out-Luna' />
        </div>

        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
            <SingleChart title="The total transaction number of bridge out" name="Transactions" column="0"
                query-name='The-total-transaction-number-of-bridge-out' />
        </div>

        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
            <SingleChart title="The total active users in bridge out" name="Users" column="2"
                query-name='The-total-transaction-number-of-bridge-out' />
        </div>
        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
            <SingleChart title="The average of bridged out Luna per transaction" name="Luna" column="3"
                query-name='The-total-transaction-number-of-bridge-out' />
        </div>

        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
            <SingleChart title="The average of bridged out Luna per user" name="Luna" column="4"
                query-name='The-total-transaction-number-of-bridge-out' />
        </div>

        <div class="col-12">
            <MixedChart :charts="mixChartType" title="Daily bridged out Luna" label="Daily staking reward (In dollars)"
                class="border rounded" :axis="{ x: 'date', y: '' }" query-name="Daily-bridged-out-Luna" />
        </div>

        <div class="col-12">
            <LineChart class="border rounded"
                title="The ratio of bridge out Luna volume to the circulating supply (Percent)" :point-radius="0"
                query-name="The-ratio-of-bridge-out-Luna-volume-to-the-circulating-supply-percent"
                :sortDate="{ by: 'date', type: 'asc' }"
                :axis="{ x: 'date', y: 'cumulative_volume*100/circulating_supply' }" />
        </div>


        <div class="col-12">
            <BarChart class="border rounded" label="Luna Token Number"
                title="Distribution of bridgers based their bridged out Luna number"
                query-name="Distribution-of-bridgers-based-their-bridged-out-Luna-number" dot-format-date
                :axis="{ x: 'bridge_range', y: 'number' }" :axis-titles="{ x: 'Luna Token Number' }" />
        </div>

        <div class="col-12">
            <BarChart class="border rounded" label="Luna Token Number Range"
                title="Distribution of bridging out transaction base of their volume range"
                query-name="Distribution-of-bridging-out-transaction-base-of-their-volume-range" dot-format-date
                :axis="{ x: 'bridge_range', y: 'number' }" :axis-titles="{ x: 'Luna Token Number Range' }" />
        </div>

        <div class="col-12">
            <DataTable title="The top 20 addresses with the most bridged out Luna"
                query-name="The-top-20-addresses-with-the-most-bridged-out-Luna" :haders="['Volume', 'Senderr']"
                :dataNames="['volume', 'senderr']" />
        </div>


        <div class="col-12">
            <BarChart class="border rounded" label="Addresses"
                title="The top 20 addresses with the most bridged out Luna"
                query-name="The-top-20-addresses-with-the-most-bridged-out-Luna" dot-format-date hide-x-axis
                :axis="{ x: 'senderr', y: 'volume' }" :axis-titles="{ x: 'Address' }" />
        </div>


        <div class="col-12">
            <BarChart class="border rounded" label="Bridge out" title="The average bridged out of Luna"
                query-name="The-average-bridged-out-of-Luna" :axis="{ x: 'date', y: 'd' }"
                :axis-titles="{ x: 'Date' }" />
        </div>
        <div class="col-12">
            <h2>Observations</h2>
        </div>

        <div class="col-12">
            <h2>section 5.2</h2>
        </div>

        <div class="col-12">
            <BarChart class="border rounded" label="action" title="Daily staking action number"
                :stacked="{ number: 13, column: 'blockchain', order: ['axelar', 'STRI', 'kujira', 'SIF', 'CRE', 'evmos', 'terra', 'GRAV', 'osmo', 'juno', 'cosmos', 'secret'] }"
                :stacked-order="['axelar', 'STRI', 'kujira']" query-name="Daily-bridge-out-active-users"
                :axis="{ x: 'date', y: 'number' }" />
        </div>

        <div class="col-12">
            <BarChart class="border rounded" label="action" title="Daily staking action number"
                :stacked="{ number: 13, column: 'blockchain', order: ['axelar', 'STRI', 'kujira', 'SIF', 'CRE', 'evmos', 'terra', 'GRAV', 'osmo', 'juno', 'cosmos', 'secret'] }"
                :stacked-order="['axelar', 'STRI', 'kujira']" query-name="Daily-Luna-bridged-out-volume-by-chains"
                :axis="{ x: 'date', y: 'number' }" />
        </div>

        <div class="col-12">
            <BarChart class="border rounded" label="Volume" title="Daily staking action number"
                :someInGroup="{ by: 'blockchain', over: 'volume' }"
                :stacked="{ number: 13, column: 'blockchain', order: ['axelar', 'STRI', 'kujira', 'SIF', 'CRE', 'evmos', 'terra', 'GRAV', 'osmo', 'juno', 'cosmos', 'secret'] }"
                :stacked-order="['axelar', 'STRI', 'kujira']" query-name="Daily-Luna-bridged-out-volume-by-chains"
                :axis="{ x: 'date', y: 'number' }" />
        </div>

        <div class="col-12">
            <DoughnutChart class="border rounded" :some-in-group="{ by: 'blockchain', over: 'volume' }"
                label="Total staking action volume" query-name="Luna-bridged-out-volume-by-chains" />
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
                    label: 'Cumulative Volume',
                    value: 'cumulative_volume'
                },
                {
                    type: 'bar',
                    label: 'Volume',
                    value: 'volume'
                },

            ]
        }
    },
    components: {
        SingleChart: () => import("@/components/charts/single.vue"),
        MixedChart: () => import("@/components/charts/mixed.vue"),
        LineChart: () => import("@/components/charts/line.vue"),
        BarChart: () => import("@/components/charts/bar.vue"),
        DataTable: () => import("@/components/table.vue"),
        DoughnutChart: () => import("@/components/charts/doughnut.vue")
    }
}
</script>