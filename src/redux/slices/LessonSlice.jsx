import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

export const GetLessons = createAsyncThunk("data/GetLessons", async () => {
  const querySnapshot = await getDocs(collection(db, "lessons"));
  const lessonDocs = [];

  querySnapshot.forEach((doc) => {
    lessonDocs.push({ id: doc.id, ...doc.data() });
  });

  return lessonDocs; // Ma'lumotlarni qaytarish
});

export const GetLesson = createAsyncThunk("data/GetLesson", async (uid) => {
  const lessonUid = uid;

  const docRef = doc(db, "lessons", lessonUid);
  const docSnap = await getDoc(docRef);

  return docSnap.data(); // Ma'lumotlarni qaytarish
});

const lessonSlice = createSlice({
  name: "lesson",
  initialState: {
    lessons: [],
    lesson: {},
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetLessons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetLessons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null; // Xato xabarini o'chirish
        state.lessons = action.payload;
      })
      .addCase(GetLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Xato xabarini saqlash
      });

    builder
      .addCase(GetLesson.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.lesson = action.payload; // Ma'lumotlarni qaytarish
      })
      .addCase(GetLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Xato xabarini saqlash
      });
  },
});

export default lessonSlice.reducer;
