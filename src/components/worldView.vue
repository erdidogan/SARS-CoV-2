<template>
<section>
    <div class="columns is-gapless">
        <div class="column">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Test Counts Per Million
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                        <pie-chart :data="this.tests"></pie-chart>
                    </div>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Cases In Global
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                        <geo-chart :data="this.data"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>

</template>

<script>
    import axios from "axios";
    const worldDataUrl = "https://corona.lmao.ninja/v2/countries?yesterday=false";
    export default {
        name: "worldView",
        created() {
            this.getWorldData();
        },
        data() {
            return {
                data:[],
                tests:[],
            };
        },
        methods: {
            async getWorldData() {
                try {
                    const response = await axios.get(worldDataUrl);
                    for (let index in response.data) {
                        if(response.data[index].country === "UK"){
                            this.data.push(["United Kingdom",response.data[index].cases]);
                            this.tests.push(["United Kingdom",response.data[index].testsPerOneMillion]);
                        }else if(response.data[index].country === "USA") {
                            this.data.push(["United States", response.data[index].cases]);
                            this.tests.push(["United States",response.data[index].testsPerOneMillion]);
                        }else if(response.data[index].country === "Libyan Arab Jamahiriya") {
                            this.data.push(["Libya", response.data[index].cases]);
                        }else{
                            this.data.push([response.data[index].country,response.data[index].cases]);
                            if(response.data[index].country === "Turkey" || response.data[index].country === "Germany" ||
                                response.data[index].country === "France" || response.data[index].country === "Iran"||
                                response.data[index].country === "Italy" || response.data[index].country === "Spain" ||
                                response.data[index].country === "China" || response.data[index].country === "S. Korea") {
                                this.tests.push([response.data[index].country, response.data[index].testsPerOneMillion]);
                            }
                        }

                    }
                } catch (error) {
                    console.log(error)
                }
            },

        },

    }
</script>

