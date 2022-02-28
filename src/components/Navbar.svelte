<script>
  import { Link } from "svelte-routing";
  import { navigate } from "svelte-routing";
  import { signInWithPopup, signOut } from "firebase/auth";
  import { auth, provider } from "../Store/firebaseConfig";

  let isLoggedIn = true;
  let userImg;
  let imgClick = false;

  const signIn = () => {
    signInWithPopup(auth, provider);
    imgClick = false;
  };

  const logOut = () => {
    signOut(auth);
    navigate("/");
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      isLoggedIn = true;
      userImg = user.photoURL;
    } else {
      isLoggedIn = false;
    }
  });

  const handleImgClick = () => {
    imgClick = !imgClick;
  };
</script>

<navbar>
  <Link to="/"><h1>to-do</h1></Link>
  {#if isLoggedIn}
    {#if !imgClick}
      <img src={userImg} alt="" on:click={() => handleImgClick()} />
    {:else}
      <div>
        <button on:click={() => logOut()}>Log out</button>
        <button on:click={() => handleImgClick()}
          ><strong>&times;</strong></button
        >
      </div>
    {/if}
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
    color: #004221;
    border: 1px solid 004221;
    border-radius: 10px;
    padding: 5px 10px;
    font-family: var(--font);
    font-weight: bold;
    font-size: 24px;
  }
  button:hover {
    cursor: pointer;
  }
  strong {
    color: red;
  }

  img {
    width: 2.5rem;
    border-radius: 10px;
  }
  img:hover {
    cursor: pointer;
  }
  img:active {
    filter: grayscale(5);
  }
</style>
