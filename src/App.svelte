<script>
  import Navbar from "./components/Navbar.svelte";
  import Home from "./components/Home.svelte";
  import Create from "./components/Create.svelte";
  import Footer from "./components/Footer.svelte";
  import { Router, Route } from "svelte-routing";
</script>

<Router>
  <Navbar />
  <Route path="/">
    <Home />
  </Route>
  <Route path="create">
    <Create />
  </Route>
  <Footer />
</Router>

<style>
</style>
