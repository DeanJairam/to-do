<script>
  import { Link } from "svelte-routing";
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { firebaseConfig } from "../Store/firebaseConfig";
  import { initializeApp } from "firebase/app";

  initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  let isLoggedIn = false;
  let userName;

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        user.emailVerified ? (isLoggedIn = true) : (isLoggedIn = false);
        userName = user.displayName;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
</script>

<navbar>
  <Link to="/"><h1>to-do</h1></Link>
  {#if isLoggedIn == true}
    <h3>{userName}</h3>
  {:else}
    <button on:click={signIn}>Sign in</button>
  {/if}
</navbar>

<style>
  navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
