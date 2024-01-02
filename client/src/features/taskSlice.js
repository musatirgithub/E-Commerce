import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",

  initialState: {
    loading: true,
    error: false,
    tasks: null,
    task: null,
    isModalOpen:false,
    isSidebarOpen: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    // getSuccess: (state, { payload: { data, url } }) => {
    //   state.loading = false;
    //   state[url] = data;
    // },

    getTasksSuccess: (state, { payload }) => {
      state.loading = false;
      state.tasks = payload;
    },
    getSingleTaskSuccess: (state, { payload }) => {
      state.loading = false;
      state.task = payload;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const {
  fetchStart,
  getTasksSuccess,
  getSingleTaskSuccess,
  fetchFail,
  openModal,
  closeModal,
  openSidebar,
  closeSidebar,
} = taskSlice.actions;
export default taskSlice.reducer;
