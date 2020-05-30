<template>
    <section>
        <div class="columns is-gapless">
            <div class="column">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Cases In Country
                        </p>
                    </header>
                    <div class="card-content">
                        <b-field>
                            <b-select placeholder="Select a Country" v-model="selectedConfirmed">
                                <option
                                        v-for="option in confirmedGraph"
                                        :value="option.data"
                                        :key="option.name">
                                    {{ option.name}}
                                </option>
                            </b-select>
                        </b-field>
                        <div class="content">
                            <line-chart label="Case" xtitle="Days" ytitle="Cases" thousands="," :curve="true"
                                        :messages="{empty: 'No data'}" :data="selectedConfirmed"></line-chart>
                        </div>
                    </div>

                </div>
            </div>


        </div>

        <div class="columns is-gapless">
            <div class="column">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Deaths In Country
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <b-field>
                                <b-select placeholder="Select a Country" v-model="selected">
                                    <option
                                            v-for="option in deathGraph"
                                            :value="option.data"
                                            :key="option.name">
                                        {{ option.name}}
                                    </option>
                                </b-select>
                            </b-field>
                            <line-chart label="Death" xtitle="Days" ytitle="Deaths" thousands=","
                                        :messages="{empty: 'No data'}" :data="this.selected"></line-chart>
                        </div>
                    </div>

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
        mounted() {
            this.getTimeline();

        },
        data() {
            return {
                deathGraph: [],
                confirmedGraph: [],
                selected: [],
                selectedConfirmed: [],

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
                        if (cases !== 0) {
                            confirmedCases.push([date, cases]);
                        }

                    }
                    if (index === "US") {
                        index = "United States";
                    }
                    if (index === localStorage.getItem("country")) {
                        this.selected = death
                        this.selectedConfirmed = confirmedCases
                    }
                    this.deathGraph.push({"name": index, "data": death});
                    this.confirmedGraph.push({"name": index, "data": confirmedCases});

                    death = [];
                    confirmedCases = [];

                }
            },
        },
    }
</script>

