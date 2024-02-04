<script setup lang="ts">
import Board from "@/components/Board.vue";
import BoardSelector from "@/components/BoardSelector.vue";
import { useBoards } from "@/composables/useBoards";

const boardStore = useBoards();
boardStore.fetchBoards();
</script>
<template>
  <div class="m-4 flex flex-col gap-6 *:w-full">
    <BoardSelector />
    <Board v-if="boardStore.selectedBoard" :board="boardStore.selectedBoard" />
  </div>
</template>
