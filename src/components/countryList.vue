<template>
  <section class="container is-max-desktop">
    <div class="columns is-multiline">
      <div v-for="(data,index) in filteredlist" v-bind:key="index" class="column is-3">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="data.countryInfo.flag" alt="Flag">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ data.country }}</p>
              </div>
            </div>
            <div class="content">
              <p style="color: yellow"> Cases: {{ new String(data.cases).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") }}</p>
              <p style="color: red"> Deaths: {{ new String(data.deaths).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") }}</p>
              <p> Today Cases: {{ new String(data.todayCases).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") }}</p>
              <p> Today Deaths: {{ new String(data.todayDeaths).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") }}</p>
              <p> Critical Per Million: {{ data.criticalPerOneMillion }}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

const localDataApiUrl = "https://disease.sh/v3/covid-19/countries?yesterday=true&sort=cases&allowNull=false"

export default {
  created() {
    this.getLocalData();
  },
  data() {
    return {
      stats: [],
    };
  },
  methods: {
    async getLocalData() {
      try {
        const response = await axios.get(localDataApiUrl);
        this.stats = response.data
      } catch (error) {
        this.$buefy.snackbar.open({
          message: 'Data Feth Error. Try Again Later!',
          position: 'is-bottom',
        });
      }
    },
  },
  computed: {
    filteredlist() {
      return this.stats.filter((data) => {
        return data.cases > 100000;
      });
    }
  }
}
</script>


