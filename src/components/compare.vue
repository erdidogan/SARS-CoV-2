<template>
    <section>
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
                                :maxtags="10"
                                field="name"
                                placeholder="Type a country name"
                                @typing="getFilteredTags">
                        </b-taginput>
                    </b-field>
                    <line-chart label="Death Graph" xtitle="Days"  ytitle="Deaths"  thousands=","
                                :messages="{empty: 'No data'}" :data="this.tags"></line-chart>
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
                deathGraph: [],
                confirmedGraph: [],

                filteredTags: this.deathGraph,
                tags: [],
                filteredTagsConfirmed: this.confirmedGraph,
                tagsConfirmed: [],
                allowNew: false,
                openOnFocus: false,
                isSelectOnly: false,
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

            drawGraph(input) {
                let death = [];
                let confirmedCases = [];
                for (let index in input) {
                    for (let index2 in input[index]) {
                        let date = input[index][index2].date.toString().split("-");
                        if (date[1] < 10)
                            date[1] = "0" + date[1];
                        if (date[2] < 10)
                            date[2] = "0" + date[2];
                        date = date.join("-")
                        let deaths = input[index][index2].deaths;
                        let cases = input[index][index2].confirmed;
                        if (deaths !== 0)
                            death.push([date, deaths]);
                        if (cases !== 0)
                            confirmedCases.push([date, cases]);
                    }
                    if (index === "US")
                        index = "United States";
                    this.deathGraph.push({"name": index, "data": death});
                    this.confirmedGraph.push({"name": index, "data": confirmedCases});
                    if (index === localStorage.getItem("country") || index === "Italy" || index === "France" || index === "United States") {
                        this.tagsConfirmed.push({"name": index, "data": confirmedCases});
                        this.tags.push({"name": index, "data": death});
                    }
                    death = [];
                    confirmedCases = [];

                }
            },
            getFilteredTags(text) {
                this.filteredTags = this.deathGraph.filter((option) => {
                    return option.name
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >= 0
                })
            },
            getFilteredTags4Confirmed(text) {
                this.filteredTagsConfirmed = this.confirmedGraph.filter((option) => {
                    return option.name
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >= 0
                })
            },
        },
    }
</script>

