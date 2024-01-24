import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref } from "vue";

export const useFetchBoard = () => {
  const boards = ref({});
  const fetchBoards = async () => {
    const boardsCollection = collection(db, "userdata", "public", "boards");
    const boardsSnapshot = await getDocs(boardsCollection);
    const boardsList = boardsSnapshot.docs.reduce(
      (acc, doc) => ({ ...acc, [doc.id]: doc.data() }),
      {},
    );
    boards.value = boardsList;
  };
  return { boards, fetchBoards };
};
