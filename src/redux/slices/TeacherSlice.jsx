import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../Firebase/Firebase";

const initialState = {
  teachers: [],
  me: {},
  isLoading: false,
  error: null,
  message: null,
};

export const GetTeachers = createAsyncThunk("data/getTeachers", async () => {
  const querySnapshot = await getDocs(collection(db, "teachers"));
  const teachersDocs = [];

  querySnapshot.forEach((doc) => {
    teachersDocs.push({ id: doc.id, ...doc.data() });
  });

  return teachersDocs; // Ma'lumotlarni qaytarish
});

export const GetMe = createAsyncThunk("data/getMe", async () => {
  const user = auth.currentUser.uid;

  const docRef = doc(db, "teachers", user);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
});

const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    toogleLoading: (state, action) => {
      state.isLoading = action.payload; // Loadingni tiklash va toqlaytirish
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetTeachers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null; // Xato xabarini o'chirish
        state.message =
          action.payload.length > 0
            ? "Teacherlar yuklandi"
            : "Malumotlar topilmadi!"; // Xato xabarini saqlash
        state.teachers = [...action.payload]; // Yuklangan ma'lumotlarni saqlash
      })
      .addCase(GetTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Xato xabarini saqlash
      });

    // GetMe
    builder
      .addCase(GetMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null; // Xato xabarini o'chirish
        state.me = action.payload; // Yuklangan ma'lumotlarni saqlash
      })
      .addCase(GetMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Xato xabarini saqlash
      });
  },
});

export const { toogleLoading } = teacherSlice.actions;

export default teacherSlice.reducer;
