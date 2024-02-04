import { db } from "@/firebase";
import { Board, ColumnWithId } from "@/types";
import { useUser } from "@/user";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useBoards = defineStore("boards", () => {
  const boards = ref<Record<string, Board>>({});
  const userStore = useUser();

  const selectedBoardId = ref("");
  const uuid = computed(() => userStore.user?.uid);

  watch(
    () => userStore.isLoggedIn,
    (isLoggedIn) => {
      if (isLoggedIn) {
        fetchBoards();
      }
    },
  );
  watch(
    () => boards.value,
    (newBoards) => {
      console.log(newBoards);
    },
  );

  const fetchBoards = async () => {
    if (!userStore.user?.uid) return;
    const boardsCollection = collection(
      db,
      "userdata",
      userStore.user.uid,
      "boards",
    );
    const boardsSnapshot = await getDocs(boardsCollection);
    const boardsList = await boardsSnapshot.docs.reduce(async (acc, doc) => {
      // Fetch nested `colums` collection
      const columnsCollection = collection(boardsCollection, doc.id, "columns");
      // Get documents from `columns` collection
      const columnsSnapshot = await getDocs(columnsCollection);
      const columns = columnsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return { ...acc, [doc.id]: { ...doc.data(), columns } };
    }, {});
    boards.value = boardsList;
  };

  const editName = async (boardId: string, newName: string) => {
    if (uuid.value === undefined) return;
    const boardRef = doc(db, "userdata", uuid.value, "boards", boardId);
    await updateDoc(boardRef, { name: newName });
  };

  const addCard = async (column: ColumnWithId, text: string) => {
    if (uuid.value === undefined || selectedBoardId.value === undefined) return;

    const boardRef = doc(
      db,
      "userdata",
      uuid.value,
      "boards",
      selectedBoardId.value,
      "columns",
      column.id,
    );
    const newItems = [...(column.items || []), text];
    await updateDoc(boardRef, {
      items: newItems,
    });
    fetchBoards();
  };

  const editColor = async (column: ColumnWithId) => {
    if (uuid.value === undefined || selectedBoardId.value === undefined) return;

    console.log(
      "userdata",
      uuid.value,
      "boards",
      selectedBoardId.value,
      "columns",
      column.id,
    );
    const boardRef = doc(
      db,
      "userdata",
      uuid.value,
      "boards",
      selectedBoardId.value,
      "columns",
      column.id,
    );
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    await updateDoc(boardRef, {
      color: newColor,
    });
    fetchBoards();
  };

  const selectedBoard = computed<Board | undefined>(() => {
    return boards.value?.[selectedBoardId.value];
  });
  return {
    editName,
    addCard,
    editColor,
    boards,
    fetchBoards,
    selectedBoard,
    selectedBoardId,
  };
});
