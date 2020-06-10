<template>
    <section>
        <div class="tile notification is-full is-dark is-vertical">
            <!-- Main container -->
            <nav class="level">
                <!-- Left side -->
                <div class="level-left">
                    <div class="level-item">
                        <p class="subtitle is-5">
                          Search:
                        </p>
                    </div>
                    <div class="level-item">
                        <div class="field has-addons">
                            <p class="control">
                                <input class="input" type="text" v-model="search" placeholder="Type A Country Name">
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Right side -->
                <div class="level-right">
                    <p class="level-item"> <b-button @click="makeNegative" type="is-light">All</b-button></p>
                    <p class="level-item"> <b-button @click="makePositive" type="is-success">Good Ones</b-button></p>
                </div>
            </nav>
        </div>
        <b-notification :active.sync="isActive" aria-close-label="Close notification">
            Green color indicates that pandemic is under control in that country.
        </b-notification>
        <div class="columns is-variable bd-klmn-columns is-3 is-multiline">
            <div class="column is-4 "  v-for="(data,index) in filteredlist" v-bind:key="index" >
                <div class="notification is-dark"  :class="{'is-success': data.recovered / data.cases >= 0.80 }">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <img :src="data.countryInfo.flag" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">{{data.country}}</p>
                        </div>
                    </div>
                    <div class="content">
                        <p class="subtitle is-6">Total Stats</p>
                        <nav class="level is-mobile">
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Cases</p>
                                    <p class="subtitle"> <b>{{data.cases.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}}</b></p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Deaths</p>
                                    <p class="subtitle"> <b>{{data.deaths.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}}</b></p>
                                </div>
                            </div>

                        </nav>
                    </div>
                    <div class="content">
                        <p class="subtitle is-6">Recent Stats</p>
                        <nav class="level is-mobile">
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Cases</p>
                                    <p class="subtitle"><b>{{data.todayCases.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1.")}}</b></p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Deaths</p>
                                    <p class="subtitle"><b>{{data.todayDeaths.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1.")}}</b></p>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import axios from "axios";
    const localDataApiUrl = "https://disease.sh/v2/countries?yesterday=true&sort=cases&allowNull=false"

    export default {
        created() {
            this.getLocalData();
        },
        data() {
            return {
                stats: [],
                search: '',
                good: false,
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
            makePositive(){
               this.good = true;
            },
            makeNegative(){
                this.good = false;
            }
        },
        computed: {
            filteredlist(){
                return this.stats.filter((cases) => {
                    if(this.search.toLowerCase() === "united kingdom")
                        this.search = 'UK'
                    else if(this.search.toLowerCase() === "england")
                        this.search = 'UK'
                    else if(this.search.toLowerCase() === "united states")
                        this.search = 'USA'
                    else if(this.search.toLowerCase() === "america")
                        this.search = 'USA'

                    if(this.good)
                        return (cases.recovered / cases.cases >= 0.80)


                    return cases.country.toLowerCase().includes(this.search.toLowerCase());
                });
            }

        }
    }
</script>


