<template>
    <section>
        <div class="columns is-variable bd-klmn-columns is-4 is-multiline">
            <div class="column is-4 " v-bind:key="index" v-for="(data,index) in filteredlist">
                <div class="notification is-dark">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <img :src="data.countryInfo.flag" alt="Placeholder image">
                            </figure>
                            <p class="title is-4">{{data.country}}</p>
                        </div>
                        <div class="media-content">
                            <p class="heading has-text-centered"> Total Cases</p>
                            <p class="subtitle has-text-centered">
                                {{data.cases.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}}</p>
                        </div>
                        <div class="media-right">
                            <p class="heading has-text-centered">Travel</p>
                            <p class="subtitle has-text-centered" style="color: green"
                               v-show="data.recovered / data.cases >= treshHold">Safe</p>
                            <p class="subtitle has-text-centered" style="color: red"
                               v-show="data.recovered / data.cases < treshHold">Risky</p>
                        </div>
                    </div>
                    <div class="content">
                        <p class="subtitle"></p>
                        <div class="columns">
                            <div class="column">
                                <p class="heading">Deaths</p>
                            </div>
                            <div class="column">
                                <p class="subtitle">{{data.deaths.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
                                    "$1.")}}</p>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <p class="heading">Intensive Care</p>
                            </div>
                            <div class="column">
                                <p class="subtitle">{{data.critical.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
                                    "$1.")}}</p>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <p class="heading">Recent Cases</p>
                            </div>
                            <div class="column">
                                <p class="subtitle">{{data.todayCases.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
                                    "$1.")}}</p>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <p class="heading">Recent Deaths</p>
                            </div>
                            <div class="column">
                                <p class="subtitle">{{data.todayDeaths.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,
                                    "$1.")}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import axios from "axios";

    const localDataApiUrl = "https://disease.sh/v3/covid-19/countries?yesterday=true&sort=cases&allowNull=false"

    export default {
        created() {
            this.getLocalData();
        },
        data() {
            return {
                stats: [],
                treshHold: 0.85
            };
        },
        methods: {
            async getLocalData() {
                try {
                    const response = await axios.get(localDataApiUrl);
                    this.stats = response.data
                } catch (error) {
                    this.$buefy.snackbar.open({
                        message: 'Data Feth Error. Try Again Later!',
                        position: 'is-bottom',
                    });
                }
            },
        },
        computed: {
            filteredlist() {
                return this.stats.filter((cases) => {
                    return cases.cases > 1000;
                });
            }
        }
    }
</script>


