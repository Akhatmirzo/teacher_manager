import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

export default function UpdateModul(modul) {
  const updModul = async (modul) => {
    try {
      await updateDoc(doc(db, "modules", modul.uid), modul);

      return true
    } catch (error) {
      console.log(error);
    }
  };
  return updModul(modul);;
}
