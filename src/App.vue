<template>
    <section>
        <section class="section">
            <latest-global-data/>
            <global-list/>
        </section>
        <footer class="footer notification ">
            <div class="content has-text-centered">
                <p>
                    <strong>SARS-COV-2</strong> by <a target="_blank" rel="noopener noreferrer" href="https://erdidogan.com">Erdi Doğan</a>. License:
                    <a target="_blank" rel="noopener noreferrer" href="http://opensource.org/licenses/mit-license.php">MIT</a>.
                    The data is provided by open-source public APIs. You can find project source code on
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/erdidogan/SARS-CoV-2"> Github</a>.
                </p>
            </div>
        </footer>
    </section>
</template>

<script>
    import LatestGlobalData from "./components/latestGlobalData";
    import GlobalList from "./components/globalList";

    export default {
        name: 'App',
        components: {
            GlobalList,
            LatestGlobalData,
        },
    };
</script>



