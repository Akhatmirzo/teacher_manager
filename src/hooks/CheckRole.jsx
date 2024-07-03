import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

export default function CheckRole(uid) {
  const checkRole = async (uid) => {
    try {
      const userRoles = await getDoc(doc(db, 'roles', uid))
      
      if (userRoles.exists()) {
        return userRoles.data().role;
      }else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return checkRole(uid);
}
