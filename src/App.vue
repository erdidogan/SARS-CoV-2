<template>
  <section>
    <section class="hero is-small is-dark is-bold">
      <div class="hero-body">
        <h1 class="title">
          SARS-CoV-2
        </h1>
        <h2 class="subtitle">
          Analytics
          <latest-global-data/>
        </h2>
      </div>
    </section>
    <local-analytics/>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Cases In Global
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <div id="regions_div" style="height: 500px;"></div>
        </div>
      </div>
    </div>

<!--    <world-data/>-->
    <compare/>
    <section>
      <footer class="footer ">
        <div class="content has-text-centered">
          <p>
            <strong>SARS-COV-2</strong> by <a href="https://www.linkedin.com/in/doganerdi">Erdi Doğan</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            The data is provided by open-source public APIs. You can find project source code on
            <a href="https://github.com/erdidogan/SARS-CoV-2"> Github</a>.
          </p>
        </div>
      </footer>
    </section>
  </section>
</template>

<script>

  import LatestGlobalData from "./components/latestGlobalData";
  import LocalAnalytics from "./components/localAnalytics";
  import Compare from "./components/compare";

  export default {
    name: 'App',
    components: {
      Compare,
      LocalAnalytics,
      LatestGlobalData,
    }
  }

</script>


