<script>
  import { Link } from "svelte-routing";
  import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
  } from "firebase/auth";
  import { firebaseConfig } from "../Store/firebaseConfig";
  import { initializeApp } from "firebase/app";

  initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  let isLoggedIn = false;
  let userImg;

  const signIn = () => signInWithPopup(auth, provider);

  const logOut = () => signOut(auth);

  auth.onAuthStateChanged((user) => {
    if (user) {
      isLoggedIn = true;
      userImg = user.photoURL;
    } else {
      isLoggedIn = false;
    }
  });

  let hideAcc = false;
  let hideLogOut = true;

  const handleAccount = () => {
    hideAcc = true;
    hideLogOut = false;
  };
</script>

<navbar>
  <Link to="/"><h1>to-do</h1></Link>
  {#if isLoggedIn == true}
    <img
      hidden={hideAcc}
      src={userImg}
      alt="userImage"
      on:click={() => handleAccount()}
    />
    <div hidden={hideLogOut}>
      <button on:click={() => logOut()}>Log out</button>
      <button on:click={() => {
        hideAcc = false;
        hideLogOut = true;
        }}>&times</button>
    </div>
  {:else}
    <button on:click={() => signIn()}>Sign in</button>
  {/if}
</navbar>

<style>
  navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  button {
    background: none;
    border: none;
    font-family: var(--font);
    font-weight: bold;
    font-size: 24px;
  }

  button:hover {
    cursor: pointer;
  }

  img {
    width: 2.5rem;
    border: 2px solid #004221;
    border-radius: 10px;
  }
  img:hover {
    cursor: pointer;
  }
</style>
