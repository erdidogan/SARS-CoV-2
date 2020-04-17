<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                Cases In Global
            </p>
        </header>
        <div class="card-content">
            <div class="content">
                <geo-chart :data="this.data" style="height: 450px;"/>
            </div>
        </div>
    </div>


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
            };
        },
        methods: {
            async getWorldData() {
                try {
                    const response = await axios.get(worldDataUrl);
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
                } catch (error) {
                    console.log(error)
                }
            },

        },

    }
</script>

