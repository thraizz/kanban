<script setup lang="ts">
import { db } from "@/firebase";
import { useUser } from "@/user";
import { collection, doc, setDoc } from "firebase/firestore";

const userStore = useUser();
const createBoard = async () => {
  if (!userStore.user) {
    return;
  }
  const boardsCollection = collection(
    db,
    "userdata",
    userStore.user.uid,
    "boards",
  );
  const newBoard = {
    name: "New Board",
  };
  await setDoc(doc(boardsCollection), newBoard);
};
</script>

<template>
  we create boards here.
  <!-- <button @click="createBoard" class="button primary">Create Board</button> -->
</template>
