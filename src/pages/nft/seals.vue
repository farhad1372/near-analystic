<template>
    <div class="row">
       
        <div class="col-12 col-md-4">
        <SingleChart query-name="NFTseals" name="" title="Number of marketplaces" column="0" />
        </div>

         <div class="col-12 col-md-4">
        <SingleChart query-name="NFTseals" name="" title="Number of users" column="1" />
        </div>

         <div class="col-12 col-md-4">
        <SingleChart query-name="NFTseals" name="" title="Total unique NFT number" column="2" />
        </div>

         <div class="col-12 col-md-6">
        <SingleChart query-name="NFTseals" name="US dollars $" title="Average seals price per NFT $" column="3" />
        </div>

         <div class="col-12 col-md-6">
        <SingleChart query-name="NFTseals" name="US dollars $" title="Seals volume per marketplace $" column="4" />
        </div>
    <div class="col-12 col-md-12">
        <BarChart class="border rounded" query-name="dailyseals" title="Weekly NFT seals number" label="" :axis="{x:'date', y:'number' }" />
          </div>

        <div class="col-12 col-md-12">
        <BarChart class="border rounded" query-name="dailyseals" title="Weekly NFT selsa volume" label="" :axis="{x:'date', y:'volume' }" />
</div>

         <div class="col-12 col-md-12">
        <LineChart class="border rounded" query-name="daily_seals" title="Cumulative weekly NFT seals volume (ETH)" :point-radius="0" :axis="{x:'date', y:'c_volume' }" />
        </div>

    

        <div class="col-12 col-md-12">
        <BarChart class="border rounded" dot-format-date query-name="platform" title="Number of NFT seals per market  " label="" :axis="{x:'platform_name', y:'number' }" />
        </div>

        <div class="col-12 col-md-12">
        <BarChart class="border rounded" dot-format-date query-name="platform" title="Volume of NFT seals per market  (US dollars)" label="" :axis="{x:'platform_name', y:'volume' }" />
        </div>
        
        <div class="col-12 col-md-6">
        <DoughnutChart class="border rounded" query-name="seals" label="Number of NFT seals per market  "  :some-in-group="{ by: 'platform_name', over: 'number' }"  />
       </div>

       <div class="col-12 col-md-6">
        <DoughnutChart  class="border rounded" query-name="seals" label="Volume of NFT seals per market  (US dollars)" :some-in-group="{ by: 'platform_name', over: 'volume' }"  />
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
        DoughnutChart: () => import("@/components/charts/doughnut.vue"),
        LineChart: () => import("@/components/charts/line.vue"),
        // MixedChart: () => import("@/components/charts/mixed.vue"),
        SingleChart: () => import("@/components/charts/single.vue")
    }
}
</script>