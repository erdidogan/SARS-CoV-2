<template>
    <section>
        <div class="tile is-horizontal is-parent">
            <div class="tile is-child box">
                <p class="title">Global</p>
                <p>Total Case: <b>{{globalData.cases}}</b></p>
                <p>Death: {{globalData.deaths}}</p>
                <p>Revocered: {{globalData.recovered}}</p>
            </div>
            <div class="tile is-child box" v-for="(data,index) in localData" v-bind:key="index"
                 v-show="data.country === country">
                <b-tooltip label="Current Location" type="is-dark" position="is-right" always>
                    <p class="title">{{country}}</p>
                </b-tooltip>
                <p>Total Case: <b>{{data.cases}}</b></p>
                <p>Death: {{data.deaths}}</p>
                <p>Revocered: {{data.recovered}}</p>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from "axios";

    const locationApiUrl = "http://ip-api.com/json"
    const localDataApiUrl = "https://corona.lmao.ninja/countries/"
    const globalDataApiUrl = "https://corona.lmao.ninja/all"

    export default {
        name: "homepageInfo",
        created() {
            this.getLocation();
            this.getLocalData();
            this.getGlabalData();

        },
        data() {
            return {
                country: '',
                localData: [],
                globalData: [],
                compareData: [],
            };
        },
        methods: {
            async getLocation() {
                try {
                    const response = await axios.get(locationApiUrl);
                    this.country = response.data.country
                } catch (error) {
                    console.log("Error");
                }
            },
            async getLocalData() {
                try {
                    const response = await axios.get(localDataApiUrl);
                    this.localData = response.data

                } catch (error) {
                    this.$buefy.snackbar.open({
                        message: 'Local Data Feth Error. Try Again Later!',
                        position: 'is-bottom',
                    });
                    console.log("Error");
                }
            },
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


