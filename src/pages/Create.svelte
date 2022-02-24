<script>
  import { Link } from "svelte-routing";
  import { navigate } from "svelte-routing";
  import { getFirestore, collection, addDoc } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  import { firebaseConfig } from "../Store/firebaseConfig";
  import { initializeApp } from "firebase/app";

  initializeApp(firebaseConfig);
  const auth = getAuth();

  const db = getFirestore();

  let error = false;

  let title = "";
  let description = "";
  let isComplete = false;
  let handleSubmit;

  auth.onAuthStateChanged((user) => {
    if (user) {
      handleSubmit = async () => {
        if (title.length > 2) {
          console.log(user);
          const colRef = await addDoc(collection(db, `users/${user.uid}`), {
            title,
            description,
            isComplete,
          });
          navigate("/");
        } else {
          error = true;
        }
      };
    } else {
      console.log("user is not logged in");
    }
  });
</script>

<main>
  <h2>Create task</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <input
      class="name-input"
      type="text"
      placeholder="Name"
      bind:value={title}
    />
    {#if error == true}
      <p>ℹ Enter the task with minimum of 3 characters</p>
    {/if}
    <br />
    <textarea placeholder="Description(optional)" bind:value={description} />
  </form>
  <section>
    <button id="add-btn" on:click={handleSubmit}>Add</button>
    <Link to="/"><button id="cancel-btn">Cancel</button></Link>
  </section>
</main>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
  form,
  section {
    margin: 0 10vw;
  }

  textarea {
    height: 10vh;
  }
  section {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
  p {
    color: #ff0000;
  }

  button {
    background-color: var(--button-color);
    border: 2px solid var(--button-color);
    border-radius: 10px;
    font-family: var(--font);
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    width: 10rem;
    padding: 1rem;
    margin: 0 5px;
  }
  #cancel-btn {
    background-color: #f1fff8;
    border-color: #004221;
  }
  @media only screen and (max-width: 425px) {
    form,
    section {
      margin: 0 6vw;
    }
  }
</style>
