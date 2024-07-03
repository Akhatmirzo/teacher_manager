import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

export const GetStudents = createAsyncThunk("data/GetStudents", async () => {
  const querySnapshot = await getDocs(collection(db, "students"));
  const studentDocs = [];

  querySnapshot.forEach((doc) => {
    studentDocs.push({ id: doc.id, ...doc.data() });
  });

  return studentDocs; // Ma'lumotlarni qaytarish
});

export const GetStudent = createAsyncThunk("data/GetStudent", async (uid) => {
  const studentUid = uid;

  const docRef = doc(db, "students", studentUid);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
});

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    student: {},
    isLoading: false,
    error: null,
    message: null,
    modal: false,
  },
  reducers: {
    toggleModal: (state) => {
      state.modal = !state.modal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetStudents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.students = action.payload;
      })
      .addCase(GetStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(GetStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.student = action.payload;
      })
      .addCase(GetStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleModal } = studentSlice.actions;

export default studentSlice.reducer;
