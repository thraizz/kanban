<script setup lang="ts">
import { useModifyBoard } from "@/composables/useModifyBoard.ts";
const props = defineProps<{
  name: string;
  column: {
    name: string;
    items: string[];
    color: string;
  };
}>();
import { ref } from "vue";
import draggableComponent from "vuedraggable";

const drag = ref(false);

const { editName, addCard, editColor } = useModifyBoard();

const randomColor = (column: {
  name: string;
  items: string[];
  color: string;
}) => {
  console.log(props.name);
  editColor(
    props.name,
    `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  );
};
</script>

<template>
  <div>
    {{ name }}
    <h3>{{ column.name }}</h3>
    <draggableComponent
      group="people"
      :list="column.items"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      :style="{
        'background-color': column.color,
      }"
      class="column"
    >
      <template #item="{ element }">
        <div class="item">{{ element }}</div>
      </template>
      <template #footer>
        <button @click="addCard(name, column)">Add Card</button>
        <button @click="randomColor(column)">Change Color</button>
      </template>
    </draggableComponent>
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
