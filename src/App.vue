<template>
  <section>
    <section>
      <latest-global-data/>
      <global-list/>
    </section>
    <br>
    <section>
      <footer class="footer notification ">
        <div class="content has-text-centered">
          <p>
            <strong>SARS-COV-2</strong> by <a href="https://erdidogan.com" target="_blank">Erdi
            Doğan</a>.
            The data is provided by open-source public APIs. You can find project source code on
            <a href="https://github.com/erdidogan/SARS-CoV-2" rel="noopener noreferrer" target="_blank"> Github</a>.
          </p>
        </div>
      </footer>
    </section>

  </section>
</template>

<script>
import LatestGlobalData from "./components/latestData";
import GlobalList from "./components/countryList";

export default {
  name: 'App',
  components: {
    GlobalList,
    LatestGlobalData,
  },
};
</script>



