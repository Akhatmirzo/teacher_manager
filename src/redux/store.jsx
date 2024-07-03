import { configureStore } from "@reduxjs/toolkit";
import TeacherSlice from "./slices/TeacherSlice";
import StudentSlice from "./slices/StudentSlice";
import ClassSlice from "./slices/ClassSlice";
import ModulSlice from "./slices/ModulSlice";
import LessonSlice from "./slices/LessonSlice";

export const store = configureStore({
  reducer: {
    teachers: TeacherSlice,
    classes: ClassSlice,
    students: StudentSlice,
    modules: ModulSlice,
    lessons: LessonSlice
  },
});
