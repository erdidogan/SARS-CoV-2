<template>
    <section>
        <div class="card is-light">
            <header class="card-header">
                <p class="card-header-title">
                    Confirmed Cases
                </p>
            </header>

            <div class="card-content">
                <div class="content">
                    <line-chart label="Confirmed Case Graph" xtitle="Days" ytitle="Confirmed Cases"  :curve="true" :messages="{empty: 'No data'}" :data="this.confirmedGraph"></line-chart>
                </div>
            </div>

        </div>

        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    Compare Deaths In Countries
                </p>
            </header>

            <div class="card-content">
                <div class="content">
                    <b-field label="">
                        <b-taginput
                                v-model="tags"
                                :data="filteredTags"
                                autocomplete
                                :allow-new="allowNew"
                                :open-on-focus="openOnFocus"
                                :maxtags="5"
                                field="name"
                                placeholder="Type a country name"
                                @typing="getFilteredTags">
                        </b-taginput>
                    </b-field>
                    <line-chart label="Death Graph" xtitle="Days" ytitle="Deaths" :messages="{empty: 'No data'}" :data="this.tags"></line-chart>
                </div>
            </div>

        </div>

    </section>

</template>

<script>
    import axios from "axios";
    let timelineApiUrl = "https://pomber.github.io/covid19/timeseries.json"

    export default {
        name: "compare",
        created() {
            this.getTimeline();

        },
        data() {
            return {
                deathGraph:[],
                confirmedGraph:[],

                filteredTags: this.deathGraph,
                isSelectOnly: false,
                tags: [],
                allowNew: false,
                openOnFocus: false



            };
        },
        methods: {
            async getTimeline() {
                try {
                    const response = await axios.get(timelineApiUrl);
                    this.drawGraph(await response.data)

                } catch (error) {
                    console.log(error)
                }
            },

            drawGraph(input){
                let death = [];
                let confirmedCases = [];
                for(let index in input){
                    for(let index2 in input[index]){
                        let date = input[index][index2].date.toString().split("-")
                        if(date[1]<10)
                            date[1] = "0"+date[1]
                        if(date[2]<10)
                            date[2] = "0"+date[2]
                        date = date.join("-")
                        let info = input[index][index2].deaths;
                        let cases = input[index][index2].confirmed;
                        death.push([date,info])
                        confirmedCases.push([date,cases])
                    }
                    if(index === "US")
                        index = "United States"
                    this.deathGraph.push({"name":index, "data":death});
                    if(index === "United States" || index === "United Kingdom" || index === "Italy" || index === "Spain" || index === "China"
                        || index === "Turkey"|| index === "Germany"|| index === "Iran"|| index === "Russia"){
                        this.confirmedGraph.push({"name":index, "data":confirmedCases});
                    }

                    death = [];
                    confirmedCases= [];
                }
            },
            getFilteredTags(text) {
                this.filteredTags = this.deathGraph.filter((option) => {
                    return option.name
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >= 0
                })
            }

        },
    }
</script>

