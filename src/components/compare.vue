<template>
    <section>
        <div class="card is-light">
            <header class="card-header">
                <p class="card-header-title">
                    Compare Cases In Countries
                </p>
            </header>

            <div class="card-content">
                <div class="content">
                    <b-field label="">
                        <b-taginput
                                v-model="tagsConfirmed"
                                :data="filteredTagsConfirmed"
                                autocomplete
                                :allow-new="allowNew"
                                :open-on-focus="openOnFocus"
                                :maxtags="10"
                                field="name"
                                placeholder="Type a country name"
                                @typing="getFilteredTags4Confirmed">
                        </b-taginput>
                    </b-field>
                    <line-chart  xtitle="Days" ytitle="Confirmed Cases" :messages="{empty: 'No data'}" :data="this.tagsConfirmed"></line-chart>
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
                                :maxtags="10"
                                field="name"
                                placeholder="Type a country name"
                                @typing="getFilteredTags">
                        </b-taginput>
                    </b-field>
                    <line-chart label="Death Graph" xtitle="Days" ytitle="Deaths"  :messages="{empty: 'No data'}" :data="this.tags"></line-chart>
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

            drawGraph(input){
                let death = [];
                let confirmedCases = [];
                let count = 1;
                let dayCount = this.getDays();
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

                            if(count !== 1 && count !== dayCount){
                                if(count % 10 === 0){
                                        death.push([date,info])
                                        confirmedCases.push([date,cases])
                                }
                            }else{
                                    death.push([date,info])
                                    confirmedCases.push([date,cases])
                            }
                            count ++;

                    }
                    count = 1;
                    if(index === "US")
                        index = "United States";
                    this.deathGraph.push({"name":index, "data":death});
                    this.confirmedGraph.push({"name":index, "data":confirmedCases});
                    if(  index === localStorage.getItem("country") || index === "China"){
                       this.tagsConfirmed.push({"name":index, "data":confirmedCases});
                       this.tags.push({"name":index, "data":death});
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
            },
            getFilteredTags4Confirmed(text) {
                this.filteredTagsConfirmed = this.confirmedGraph.filter((option) => {
                    return option.name
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >= 0
                })
            },
            getDays(){
                return Math.round((this.parseDate(new Date().toLocaleDateString("en-EN"))-this.parseDate("1/22/2020"))/(1000*60*60*24));
            },
            parseDate(str) {
                let mdy = str.split('/');
                return new Date(mdy[2], mdy[0]-1, mdy[1]);
            }





        },
    }
</script>

