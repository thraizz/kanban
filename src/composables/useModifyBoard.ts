import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Ref, inject, ref } from "vue";

export const useModifyBoard = () => {
  const user = getUser();
  const selectedBoard = inject<Ref<string>>("selectedBoard") || ref("");

  const editName = async (boardId: string, newName: string) => {
    const boardRef = doc(db, "userdata", user, "boards", boardId);
    await updateDoc(boardRef, { name: newName });
  };

  const addCard = async (boardId: string, newCard: any) => {
    const boardRef = doc(db, "userdata", user, "boards", boardId);
    await updateDoc(boardRef, { items: newCard });
  };

  const editColor = async (boardId: string, newColor: string) => {
    console.log("userdata", user, "boards", boardId);
    const boardRef = doc(db, "userdata", user, "boards", boardId);
    console.log(boardRef);
    await updateDoc(boardRef, { color: newColor });
  };
  return {
    editName,
    addCard,
    editColor,
  };
};

// TODO: Replace this with a proper auth system
const getUser = () => "public";
