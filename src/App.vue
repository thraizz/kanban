<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
import Board from "./components/Board.vue";
import BoardSelector from "./components/BoardSelector.vue";
import { useFetchBoard } from "./components/fetchBoard";

provide("selectedBoard", ref(""));

const { fetchBoards, boards } = useFetchBoard();
onMounted(() => {
  fetchBoards();
});
</script>
<template>
  <div class="m-4 flex flex-col gap-6 *:w-full">
    <BoardSelector :boards="boards" />
    <Board v-if="boards" :boards="boards" />
  </div>
</template>
