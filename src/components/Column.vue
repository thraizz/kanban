<script setup lang="ts">
import { useBoards } from "@/composables/useBoards";
import { ColumnWithId } from "@/types";
import { ref } from "vue";
import draggableComponent from "vuedraggable";
defineProps<{
  column: ColumnWithId;
}>();

const drag = ref(false);

const { editName, addCard, editColor } = useBoards();
const newCardContent = ref("");
const showAddPopup = ref(false);
</script>

<template>
  <div>
    <h3>{{ column.name }}</h3>
    <div
      class="column"
      :style="{
        'background-color': column.color,
      }"
    >
      <draggableComponent
        group="people"
        :list="column.items"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element }">
          <div class="item">{{ element }}</div>
        </template>
      </draggableComponent>

      <form
        class="flex w-full flex-col gap-4"
        v-if="showAddPopup"
        @submit="
          (e) => {
            e.preventDefault();
            addCard(column, newCardContent);
          }
        "
      >
        <input
          class="input px-4"
          v-model="newCardContent"
          v-show="showAddPopup"
        />
        <button type="submit" class="button primary">Add Card</button>
      </form>

      <button
        v-if="!showAddPopup"
        class="button primary"
        @click="showAddPopup = !showAddPopup"
      >
        Add Card
      </button>
      <button class="button outlined" @click="editColor(column)">
        Change Color
      </button>
    </div>
  </div>
</template>
<style>
.column {
  @apply flex max-w-96 flex-col gap-4 border-2 border-black p-4;
}
.item {
  @apply w-full cursor-grab bg-white bg-opacity-40 p-2 active:cursor-grabbing;
}
</style>
