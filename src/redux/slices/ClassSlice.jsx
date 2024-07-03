import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../Firebase/Firebase";

export const GetClasses = createAsyncThunk("data/getClasses", async () => {
  const teacherId = auth.currentUser.uid;
  const querySnapshot = await getDocs(collection(db, "classes"));
  const classDocs = [];

  querySnapshot.forEach((doc) => {
    const classDoc = doc.data();

    if (classDoc.teacherId === teacherId) {
      classDocs.push({ id: doc.id, ...doc.data() });
    }
  });

  return classDocs; // Ma'lumotlarni qaytarish
});

export const GetClass = createAsyncThunk("data/getClass", async (uid) => {
  const classUid = uid;

  const docRef = doc(db, "classes", classUid);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
});

const classSlice = createSlice({
  name: "classes",
  initialState: {
    classes: [],
    class: {},
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
      .addCase(GetClasses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.classes = action.payload;
      })
      .addCase(GetClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(GetClass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.class = action.payload;
      })
      .addCase(GetClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleModal } = classSlice.actions;

export default classSlice.reducer;
