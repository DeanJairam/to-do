<script>
  import { Link } from "svelte-routing";
  import { db, auth } from "../Store/firebaseConfig";
  import {
    collection,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
  } from "firebase/firestore";

  let colRef;
  let tasks = [];
  let unsubscribe;
  let isLoggedIn = true;

  auth.onAuthStateChanged((user) => {
    if (user) {
      isLoggedIn = true;
      colRef = collection(db, "tasks");
      const userData = query(
        collection(db, "tasks"),
        where("uid", "==", user.uid)
      );
      unsubscribe = onSnapshot(userData, (querySnapshot) => {
        let storedTasks = [];
        querySnapshot.forEach((doc) => {
          let task = { ...doc.data(), id: doc.id };
          storedTasks = [task, ...storedTasks];
        });
        tasks = storedTasks.sort((value) => (value.isComplete ? 1 : -1));
      });
    } else {
      isLoggedIn = false;
      tasks = [];
      unsubscribe && unsubscribe();
    }
  });

  const taskCompleted = async (task) => {
    await updateDoc(doc(db, "tasks", task.id), {
      isComplete: !task.isComplete,
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };
</script>

<main>
  <h2>Tasks</h2>
  {#each tasks as task}
    <div class:complete={task.isComplete} class="task">
      <section class="section1">
        <div class="left-sec">
          <span
            class="checkbox"
            on:click={() => taskCompleted(task)}
            class:checked={task.isComplete}
          />
          <h4>{task.title}</h4>
        </div>
        {#if task.description.length > 0}
          <div class="below-sec">
            <p>{task.description}</p>
          </div>
        {/if}
      </section>
      <section>
        <img
          src="icons/delete.svg"
          alt="delete"
          on:click={() => handleDelete(task.id)}
        />
      </section>
    </div>
  {:else}
    {#if !isLoggedIn}
      <img src="icons/signIn.svg" class="logIn" alt="" />
      <h2>Sign in and create tasks</h2>
    {/if}
  {/each}
</main>
{#if isLoggedIn}
  <Link to="create" title="Create">
    <a href="create" class="float">
      <img src="icons/createSymbol.svg" class="my-float" alt="Create" />
    </a>
  </Link>
{/if}

<style>
  .task {
    background-color: #fff;
    margin: 20px 0px;
    padding: 0 10px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .complete {
    background-color: #81ffc0;
    text-decoration: line-through;
  }

  .logIn {
    display: block;
    margin: auto;
    width: 20rem;
    height: auto;
  }

  .left-sec {
    display: flex;
    align-items: center;
    margin: 0;
  }
  .below-sec {
    margin: 0 10px;
  }
  .checkbox {
    width: 0.7rem;
    height: 0.7rem;
    margin: 10px;
    border: 1px solid #004221;
    background-color: #fff;
    border-radius: 2px;
  }
  .checkbox:hover {
    cursor: pointer;
  }
  .checked {
    background-color: #004221;
  }
  .float {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 60px;
    right: 60px;
    background-color: #81ffc0;
    border-radius: 50px;
    text-align: center;
  }
  .my-float {
    width: 50%;
    height: auto;
  }
  @media only screen and (max-width: 425px) {
    .float {
      right: 40px;
      bottom: 40px;
    }
  }
</style>
