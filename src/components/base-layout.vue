<template>

    <div id="page-wrapper" :class="{ 'page-collapsed': reduce }">
        <div @click="reduce = !reduce" class="overlay"></div>
        <vs-sidebar top="100px" notShadow square :open="open" fixed :reduce="reduce" :hoverExpand="reduce">
            <template #logo>
                <div class="mb-14">
                    <!-- <img src="@/assets/images/near3.png" /> -->
                </div>
            </template>

            <div v-for="item in items" :key="item.to" :id="item.to" :to="{ name: item.to }">

                <vs-sidebar-group v-if="item.children">
                    <template #header>
                        <vs-sidebar-item arrow>
                            <template #icon>
                                <i :class='item.icon'></i>
                            </template>
                            {{ item.text }}
                        </vs-sidebar-item>
                    </template>
                    <div>
                        <vs-sidebar-item v-for="innerItem in item.children" :key="innerItem.to"
                            :to="{ name: innerItem.to }" :id="innerItem.to"
                            :class="{ 'active': $route.name === innerItem.to }">

                            <template #icon>
                                <i class="aside-inner" :class='innerItem.icon'></i>
                                <!-- <i class='isax isax-chart-21'></i> -->
                                <!-- <i class='isax isax-lamp-on'></i> -->

                            </template>
                            <span class="smaller">{{ innerItem.text }}</span>
                        </vs-sidebar-item>
                    </div>

                </vs-sidebar-group>

                <div v-else>
                    <vs-sidebar-item :class="{ 'active': $route.name === item.to }" class="mb-1"
                        :to="{ name: item.to }">
                        <template #icon>
                            <i :class="item.icon" class="aside-icon"></i>
                        </template>
                        <span>{{ item.text }}</span>
                    </vs-sidebar-item>
                </div>

            </div>

        </vs-sidebar>

        <vs-navbar square fixed notShadow color="#fff" padding-scroll center-collapsed>
            <template #left>
                <div class="d-flex align-center pl-1 pl-lg-2">
                    <button @click="reduce = !reduce" class="toggle-sidebar-btn mt-1">
                        <i class="isax isax-menu-1 lg"></i>
                        <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="#f0f" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z"
                                fill="#292D32" />
                            <path
                                d="M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z"
                                fill="#292D32" />
                            <path
                                d="M21 17.75H3C2.59 17.75 2.25 17.41 2.25 17C2.25 16.59 2.59 16.25 3 16.25H21C21.41 16.25 21.75 16.59 21.75 17C21.75 17.41 21.41 17.75 21 17.75Z"
                                fill="#292D32" />
                        </svg> -->
                    </button>

                    <h6 class="ml-3 sidebar-title">NEAR Analytics</h6>
                </div>
            </template>
            <!-- <vs-navbar-item :active="active == 'guide'" id="guide">
                Guide
            </vs-navbar-item>
            <vs-navbar-item :active="active == 'docs'" id="docs">
                Documents
            </vs-navbar-item>
            <vs-navbar-item :active="active == 'components'" id="components">
                Components
            </vs-navbar-item>
            <vs-navbar-item :active="active == 'license'" id="license">
                license
            </vs-navbar-item> -->


            <template #right>
                <div class="d-flex align-center pr-1 pr-lg-3 ">
                    <img src="@/assets/images/near-logo.png" class="d-none d-sm-block" style="max-width: 100px; height : auto;" />
                    <!-- <vs-button flat>Login</vs-button> -->
                    <!-- <vs-button>Get Started</vs-button> -->
                </div>
            </template>
        </vs-navbar>
        <main class="pt-13">
            <Layout>
                <template v-slot:heading>
                    <div class="page-heading ">
                        <div class="container">
                            <div class="row">
                                <div class="col-12 py-5 py-sm-8 py-md-10 py-lg-16">
                                    <h1 class="d-flex align-center">
                                        <span v-for="(item, i) in $route.meta.title" :key="i"
                                            class="d-flex align-center">
                                            <span :class="{ 'muted-text fw-500 normal mt-1': i != 0 }">
                                                {{ item }}
                                            </span>
                                            <i v-if="i < $route.meta.title.length - 1"
                                                class="isax isax-arrow-right-3 mx-2 md muted mt-1"></i>
                                        </span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Layout>
            <div class="container pt-8">
                <vue-page-transition name="fade-in-up">
                    <router-view />
                </vue-page-transition>
                <HomeFooter />
            </div>

        </main>
    </div>
</template>

<script>

export default {

    data() {
        return {
            active: "home",
            reduce: true,
            open: true,
            items: [
                { text: "Introduction", to: "Home", icon: "isax isax-home" },
                {
                    text: "General", icon: "isax isax-buy-crypto", children: [
                        { text: "Concenpts", to: "general.concepts", icon: 'isax isax-lamp-on' },
                        { text: "Analytics", to: "general.analytics", icon: 'isax isax-chart-21' },
                    ]
                },
                // { text: "General", to: "General", icon: "isax isax-buy-crypto" },
                {
                    text: "Fee", to: "Section-1", icon: "isax isax-money-remove", children: [
                        { text: "Concenpts", to: "fee.concepts", icon: 'isax isax-lamp-on' },
                        { text: "Analytics", to: "fee.analytics", icon: 'isax isax-chart-21' },
                        // { text: "miners and blocks", to: "fee.minersblock", icon: 'isax isax-chart-21' },
                    ]
                },
                {
                    text: "Stake and Unstake", to: "Section-2", icon: "isax isax-coin-1", children: [
                        { text: "Concenpts", to: "stake-unstake.concepts", icon: 'isax isax-lamp-on' },
                        { text: "Analytics", to: "stake-unstake.analytics", icon: 'isax isax-chart-21' },
                    ]
                },
                {
                    text: "NFT", to: "Section-3", icon: "isax isax-card-coin", children: [
                        { text: "Concenpts", to: "nft.concepts", icon: 'isax isax-lamp-on' },
                        { text: "NFT Mint", to: "nft.mint", icon: "isax isax-money-4" },
                        // { text: "NFT Seals", to: "nft.seals", icon: "isax isax-money-3" },
                    ]
                },
                {
                    text: "Bridge", to: "Section-4", icon: "isax isax-arrow-swap-horizontal", children: [
                        { text: "Concenpts", to: "bridge.concepts", icon: 'isax isax-lamp-on' },
                        { text: "Analytics", to: "bridge.analytics", icon: 'isax isax-chart-21' },
                    ]
                },

                { text: "Refrences", to: "refrences", icon: "isax isax-share" },
                { text: "Resources", to: "resources", icon: "isax isax-shield-search" },
            ]
        };
    },
    components: {
        HomeFooter: () => import("../components/footer.vue")
    },
    methods: {
        resizeHandler() {
            if (window.innerWidth > 1200) {
                // this.reduce = true;
            } else {
                // this.reduce = true;
            }
        }
    },
    mounted() {
        // dEventListener("resize", this.resizeHandler);
    },
    beforeMount() {
        this.resizeHandler();
    }
}
</script>

<style scoepd>

</style>