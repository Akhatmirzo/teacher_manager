import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

export const GetModules = createAsyncThunk("data/getModules", async () => {
    const querySnapshot = await getDocs(collection(db, "modules"));
    const modulDocs = [];
  
    querySnapshot.forEach((doc) => {
      modulDocs.push({ id: doc.id, ...doc.data() });
    });
  
    return modulDocs; // Ma'lumotlarni qaytarish
  });
  
  export const GetModul = createAsyncThunk("data/getModul", async (uid) => {
    const classUid = uid;
  
    const docRef = doc(db, "modules", classUid);
    const docSnap = await getDoc(docRef);
  
    return docSnap.data();
  });

const modulSlice = createSlice({
  name: "modul",
  initialState: {
    modules: [],
    modul: {},
    isLoading: false,
    error: null,
    message: null,
    modal: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(GetModules.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
     .addCase(GetModules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.modules = action.payload;
      })
     .addCase(GetModules.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
     .addCase(GetModul.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
     .addCase(GetModul.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.modul = action.payload;
      })
      .addCase(GetModul.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const {  } = modulSlice.actions;

export default modulSlice.reducer;