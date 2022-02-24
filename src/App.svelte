<script>
  import Navbar from "./pages/Navbar.svelte";
  import Home from "./pages/Home.svelte";
  import Create from "./pages/Create.svelte";
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
</Router>

<style>
</style>
