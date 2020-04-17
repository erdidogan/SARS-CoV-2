<template>
    <section>

        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <b-tooltip label="Current Location" type="is-dark" position="is-right" always>
                        <p class="title is-4">{{local.country_name}}</p>
                        </b-tooltip>
                    </div>
                </div>
                <div class="content">
                    <nav class="level">
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Total Cases</p>
                                <p class="title">{{localData.cases.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Total Death</p>
                                <p class="title">{{localData.deaths.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="heading">Total Recovered</p>
                                <p class="title">{{localData.recovered.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}}</p>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
    import axios from "axios";

    const locationApiUrl = "https://geoip.edelkrone.com/json/"
    const localDataApiUrl = "https://corona.lmao.ninja/v2/countries/"

    export default {
        name: "homepageInfo",
        created() {
            this.getLocation();
        },
        data() {
            return {
                local: [],
                localData: [],

            };

        },
        methods: {
            async getLocation() {
                try {
                    const response = await axios.get(locationApiUrl);
                    this.local = response.data
                    localStorage.setItem('country', this.local.country_name);
                    await this.getLocalData(this.local.country_name)
                } catch (error) {
                    console.log("Error");
                }
            },
            async getLocalData(country) {
                try {
                    const response = await axios.get(localDataApiUrl+country);
                    this.localData = response.data

                } catch (error) {
                    this.$buefy.snackbar.open({
                        message: 'Local Data Feth Error. Try Again Later!',
                        position: 'is-bottom',
                    });
                    console.log("Error");
                }
            },

        },

    }
</script>


