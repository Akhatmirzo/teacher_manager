import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

export default function UpdateLesson(updateData) {
  async function updateLesson() {
    try {
      await updateDoc(doc(db, "lessons", updateData.uid), {
        ...updateData,
      });
      return 0; // if update is successful
    } catch (error) {
      console.log(error);
      return 1;
    }
  }

  const fnValue = updateLesson();

  return fnValue;
}
