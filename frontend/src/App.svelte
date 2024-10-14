<script>
  import user from "./store/user.js";
  import Login from "./lib/CreateUser.svelte";
  import Poll from "./lib/Polls.svelte";
  import CreatePoll from "./lib/CreatePoll.svelte";

  $: isLoggedIn = $user !== null;

  const logout = ()  => {
    user.set(null);
  }
</script>

<div class="content">
  <div>
  {#if isLoggedIn}
    <h1>Hello, {$user.username}</h1>
    <p>As a logged in user you can create a poll.</p>
    <CreatePoll/>
    <Poll/>
    <input type="button" value="Logout" on:click={logout}>
  {:else}
    <h1>
      Welcome to Smart Voting App!👋🏽
    </h1>
    <h2>Please log in to create a Poll!</h2>
    <Login/>
  {/if}
  </div>
</div>
