<script setup lang="ts">
import { DocumentData } from "firebase/firestore";
import { Ref, inject, ref } from "vue";
import Column from "./Column.vue";

const selectedBoard = inject<Ref<string>>("selectedBoard") || ref("");
defineProps<{
  boards: Record<string, DocumentData>;
}>();
</script>
<template>
  <div v-if="selectedBoard !== ''">
    <div class="grid grid-flow-col gap-4">
      <Column
        v-for="(column, name) in $props.boards[selectedBoard]"
        :column="column"
        :name="name"
      />
    </div>
  </div>
  <p v-else>
    Select a board from the dropdown above to see the board in action.
  </p>
</template>
