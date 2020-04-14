<template>
    <section style="margin-top:35px;">

        <nav class="level">
            <div class="level-item has-text-centered">
                <div>
                    <p class="subtitle">Last Update</p>
                    <p class="subtitle">{{new Date(new Date(globalData.updated).getTime()).toLocaleString()}}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Total Global Case</p>
                    <p class="title">{{globalData.cases.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Total Global Death</p>
                    <p class="title">{{globalData.deaths.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Total Global Recovered</p>
                    <p class="title">{{globalData.recovered.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}}</p>
                </div>
            </div>
        </nav>
    </section>
</template>

<script>
    import axios from "axios";
    const globalDataApiUrl = "https://corona.lmao.ninja/all";
    let worldDataUrl = "https://corona.lmao.ninja/v2/countries?yesterday=false";
    export default {
        name: "latestGlobalData",
        created() {
            this.getWorldData();
            this.getGlabalData();
        },
        data() {
            return {
                globalData: [],
                data:[],
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
            async getWorldData() {
                try {
                    const response = await axios.get(worldDataUrl);
                    this.data.push(["Country","Confirmed Cases"]);
                    for (let index in response.data) {
                        if(response.data[index].country === "UK")
                            this.data.push(["United Kingdom",response.data[index].cases]);
                        else if(response.data[index].country === "USA")
                            this.data.push(["United States",response.data[index].cases]);
                        else if(response.data[index].country === "Libyan Arab Jamahiriya")
                            this.data.push(["Libya",response.data[index].cases]);
                        else
                            this.data.push([response.data[index].country,response.data[index].cases]);
                    }

                    localStorage.setItem('mapData', JSON.stringify(this.data));
                } catch (error) {
                    console.log(error)
                }
            },

        },

    }
</script>

