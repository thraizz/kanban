<script lang="ts" setup>
// Get all boards for this user from firestore
import Dropdown from "@/components/Dropdown.vue";
import { DocumentData } from "firebase/firestore";
import { inject, ref } from "vue";

const selectedBoard = inject<string>("selectedBoard") || ref("");

defineProps<{
  boards: Record<string, DocumentData>;
}>();
</script>

<template>
  <Dropdown
    :options="Object.keys(boards)"
    label="Select a board"
    placeholder="Select a board"
    v-model="selectedBoard"
  />
</template>
