<template>
    <div class="row">
        <div class="col-12 mb-8">
            <h1 class="mb-1">Section 1</h1>
            <div class="muted-text small">total supply and circulating supply</div>
        </div>
        <div class="col-12 ">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4">
                    <SingleChart title="The total supply of LUNA" name="Luna" query-name="total-supply" />
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <SingleChart title="The total circulating supply" name="Luna" query-name='total-circulating' />
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <SingleChart title="The ratio of circulating supply to the total supply (Percent)" name="%"
                        column="1" type="percentage" query-name='ratio-of-c/t' />
                </div>
            </div>



        </div>
        <div class="col-12 mt-10">
            <LineChart class="border rounded" label="ratio by day" :slice="200" :point-radius="0"
                :axis="{ x: 'date', y: 'ratio' }" :y-scale="{ min: 0, max: 20 }" :sort="{ by: 'ratio', type: 'asc' }"
                :height="230" query-name="ratio-of-c/t"
                title="The ratio of the circulating supply to the total supply (Percent)" />
        </div>

        <div class="col-12 mt-8">
            <h2> Observations</h2>
            <p class="mt-3">
                he total supply of Luna is <span class="fw-500 dashed">1,043 B</span> Luna! <br />
                The total circulating supply is <span class="dashed fw-500">193 M</span> Luna! <br />
                Dividing the <span class="fw-500 dashed">"total circulating supply of Luna"</span> by the <span
                    class="fw-500 dashed">"total Luna supply" </span> reveals that the circulating
                supply is 18.5% of the total Luna supply.
                This metric has been visualized over time.<br />
                All values are given in percent.<br />
                The upward trend of this metric shows the fluctuation in circulating supply versus total supply from
                <span class="fw-500 dashed">Aug 14 to date</span>.<br />
                Three strong jumps are in the periods <span class="fw-500 dashed">[20.-21. August]</span>, <span
                    class="fw-500 dashed">[26.-27. August]</span> and <span class="fw-500 dashed">[8.-9. September]
                </span> can be seen.

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
        SingleChart: () => import("../../components/charts/single.vue"),
        LineChart: () => import("../../components/charts/line.vue")
    }
}
</script>