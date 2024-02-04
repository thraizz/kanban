<script setup lang="ts">
import { useBoards } from "@/composables/useBoards";
import Column from "./Column.vue";

const boardStore = useBoards();
</script>
<template>
  <div v-if="boardStore.selectedBoardId !== ''">
    <div class="grid grid-flow-col gap-4">
      <Column
        v-for="column in boardStore.selectedBoard?.columns"
        :model-value="column"
        @update:model-value="(value) => boardStore.editColumn(value)"
      />
    </div>
  </div>
  <p v-else>
    Select a board from the dropdown above to see the board in action.
  </p>
</template>
