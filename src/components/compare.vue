<template>
    <section>
        <div class="tile is-parent">
            <div class="tile is-child box">
                <p class="title">Compare Country Data</p>
                <b-field>
                    <b-taginput
                            v-model="tags"
                            :data="filteredTags"
                            autocomplete
                            :allow-new="allowNew"
                            :open-on-focus="openOnFocus"
                            field="country"
                            :maxtags="4"
                            placeholder="Pick 4 Countries"
                            @typing="getFilteredTags">
                    </b-taginput>

                </b-field>
                <section>
                    <div class="tile is-horizontal is-parent is-10">
                        <section v-for="(tag,index) in tags" v-bind:key="index">
                            <div class="tile is-parent">
                                <article class="tile is-child notification is-light" >
                                    <div class="content">
                                        <p><b>{{tag.country}}</b></p>
                                        <p class="subtitle">Cases</p>
                                        <div class="content" v-for="(cases,index) in tag.info" v-bind:key="index" >
                                            <p v-if="cases.confirmed !== 0"> <b>{{getFormattedData(cases.date)}}</b>:{{cases.confirmed}} </p>
                                        </div>

                                    </div>
                                </article>
                            </div>
                        </section>
                    </div>
                </section>
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

                compareData:[],
                filteredTags: this.compareData,
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
                    for(let index in response.data){
                        this.compareData.push({"country": index, "info": response.data[index]});
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            getFilteredTags(text) {
                this.filteredTags = this.compareData.filter((option) => {
                    return option.country
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toString().toLowerCase()) >= 0
                })
            },
            getFormattedData(date){
                date = date.split("-").reverse().join("/");
                return date;
            }
        },
    }
</script>

