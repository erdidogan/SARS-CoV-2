<template>
  <section>
    <section class="hero is-small is-dark is-bold">
      <div class="hero-body">
        <h1 class="title">
          SARS-CoV-2
        </h1>
        <h2 class="subtitle">
          Information Dashboard
        </h2>
      </div>
    </section>

    <GeneralInfo/>
    <CompareData/>

      <footer class="footer ">
        <div class="content has-text-centered">
          <p>
            <strong>SARS-COV-2</strong> by <a href="https://www.linkedin.com/in/doganerdi">Erdi Doğan</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            The data is updated three times a day by using open-source public APIs.
          </p>
        </div>
      </footer>

  </section>
</template>

<script>
  import GeneralInfo from './components/homepageInfo.vue'
  import CompareData from './components/compare.vue'

  export default {
    name: 'App',
    components: {
      GeneralInfo,
      CompareData
    }
  }

</script>


