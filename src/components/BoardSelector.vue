<script lang="ts" setup>
// Get all boards for this user from firestore
import Dropdown from "@/components/Dropdown.vue";
import { useBoards } from "@/composables/useBoards";

const boardStore = useBoards();
</script>

<template>
  <Dropdown
    :options="Object.keys(boardStore.boards)"
    label="Select a board"
    placeholder="Select a board"
    v-model="boardStore.selectedBoardId"
  />
</template>
