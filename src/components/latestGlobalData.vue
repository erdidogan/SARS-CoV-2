<template>
        <div class="tile notification is-full is-dark is-vertical">
            <nav class="level">
                <div class="level-item has-text-centered">
                    <div>
                        <p class="subtitle">Last Update</p>
                        <p class="subtitle">{{new Date(new Date(globalData.updated).getTime()).toLocaleString()}}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Global Case</p>
                        <p class="title">{{globalData.cases.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Global Death</p>
                        <p class="title">{{globalData.deaths.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Global Recovered</p>
                        <p class="title">{{globalData.recovered.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
                            "$1.")}}</p>
                    </div>
                </div>
            </nav>
        </div>

</template>

<script>
    import axios from "axios";

    const globalDataApiUrl = "https://disease.sh/v3/covid-19/all?yesterday=false&allowNull=false";
    export default {
        name: "latestGlobalData",
        created() {
            this.getGlabalData();
        },
        data() {
            return {
                globalData: []
            };
        },
        methods: {
            async getGlabalData() {
                try {
                    const response = await axios.get(globalDataApiUrl);
                    this.globalData = response.data;
                } catch (error) {
                    this.$buefy.snackbar.open({
                        message: 'Global Data Feth Error. Try Again Later!',
                        position: 'is-bottom',
                    });
                    console.log("Error")
                }
            },
        },

    }
</script>

