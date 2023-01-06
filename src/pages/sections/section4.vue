<template>
    <div class="row">
        <div class="col-12 mb-8">
            <h1 class="mb-1">Section 4</h1>
            <div class="muted-text small">Vesting Schedule</div>
        </div>
        <div class="col-12">
            <h2 class="d-flex px-0 mx-0 align-center">
                <i class="isax isax-lamp-on warning lg solid mr-3"></i>
                <span>Methodology</span>
            </h2>
            <ul class="mt-4">
                <li>First, we explored the Inflow/Outflow for apps to find the Vesting Schedule.</li>
                <li>From the definition, the Vesting Schedule is the period that the primary Luna volume that is given
                    to apps goes out from them. So to find it, we need to find Between the days when the amount in and
                    out are equal. If we draw in and out volume and then draw a horizon line, the average distance
                    between two in and out amounts is the Vesting Schedule. this is shown in the below figure.</li>
                <li>
                    DATEDIFF() function has been used for calculating day's distance. floor() has been used for remoting
                    decimals, and the below code for aligning equals in out volumes days.<br />
                    <code>
                        select avg(DATEDIFF(day, DATE, DATEE))
                        from table 1 a inner join table 2 b
                        on a.AMOUNT_INn=b.AMOUNT_outt
                    </code>
                </li>
                <li>The results have been prepared in both US dollars and Luna volume.</li>
            </ul>

        </div>

        <div class="col-12 col-sm-6 col-md-6 col-lg-5">
            <SingleChart title="Vesting Schedule" name="Days" column="0" query-name='Vesting-Schedule' />
        </div>

        <div class="col-12">
            <LineChart class="border rounded" title="SLuna in and out from Defis" :point-radius="0"
                query-name="Luna-in-and-out-from-Defis" :axis="{ x: 'date', y: '' }"
                :stacked="{ number: 2, column: '', order: ['amount_inn', 'amount_outt'] }" />
        </div>

        <div class="col-12">
            <h2>Observations</h2>
            <p>
                Based on the explanations and definitions in the methodology of section 4: <br />
                The vesting schedule is 135.4! <br />
                Also, the "Luna in/out from DeFi" has been drawn. <br />
                The outage amount of Luna before the 26 June is so little, and it is less than 4000 Luna!

                After this time, the outage amount rises significantly. Today this amount is more than 842K Luna!

                On the opposite of the outage, the entrance of liquidity in DeFi is an upward trend from the beginning!

                The difference between entrance and outage liquidity in this chart s more than 1.1M Luna!

                Today the entrance of the Luna to the DeFi is more than 2.05M Luna!
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
        SingleChart: () => import("@/components/charts/single.vue"),
        LineChart: () => import("@/components/charts/line.vue"),
    }
}
</script>
