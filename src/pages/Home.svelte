<script>
  import { Link } from "svelte-routing";
  import { firebaseConfig } from "../Store/firebaseConfig";
  import { initializeApp } from "firebase/app";
  import {
    getFirestore,
    collection,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore();

  const colRef = collection(db, "tasks");

  let tasks = [];

  const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
    let storedTasks = [];
    querySnapshot.forEach((doc) => {
      let task = { ...doc.data(), id: doc.id };
      storedTasks = [task, ...storedTasks];
    });
    console.table(storedTasks);
    tasks = storedTasks;
  });

  const taskCompleted = async (task) => {
    await updateDoc(doc(db, "tasks", task.id), {
      isComplete: !task.isComplete,
    });
  };

  const handleDelete = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, "tasks", id));
  };
</script>

<main>
  <h2>Tasks</h2>
  {#each tasks as task}
    <div class="task">
      <section class="section1">
        <div class="left-sec">
          <input type="checkbox" on:click={() => taskCompleted(task)} />
          <h4>{task.title}</h4>
        </div>
        {#if task.description.length > 0}
          <div class="below-sec">
            <p>{task.description}</p>
          </div>
        {/if}
      </section>
      <section>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          on:click={() => handleDelete(task.id)}
        >
          <rect
            x="6"
            y="8.5"
            width="18"
            height="17"
            rx="1"
            stroke="#004221"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <path
            d="M6 4.5C5.44772 4.5 5 4.94772 5 5.5C5 6.05228 5.44772 6.5 6 6.5V4.5ZM24 6.5C24.5523 6.5 25 6.05228 25 5.5C25 4.94772 24.5523 4.5 24 4.5V6.5ZM16 4V3H14V4H16ZM6 6.5H15V4.5H6V6.5ZM15 6.5H24V4.5H15V6.5ZM14 4V5.5H16V4H14Z"
            fill="#004221"
          />
          <path d="M15 12.5V20.5" stroke="#004221" stroke-width="2" />
          <path d="M10 12.5V20.5" stroke="#004221" stroke-width="2" />
          <path d="M20 12.5V20.5" stroke="#004221" stroke-width="2" />
        </svg>
      </section>
    </div>
  {:else}
    <h2>There are no tasks. Create task</h2>
  {/each}
</main>
<Link to="create" title="Create">
  <a href="create" class="float">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="#004221"
      class="my-float"
    >
      <path
        d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
      />
    </svg>
  </a>
</Link>

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
  .left-sec {
    display: flex;
    align-items: center;
    margin: 0;
  }
  .below-sec {
    margin: 0 10px;
  }
  input {
    margin: 0 10px;
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
</style>
