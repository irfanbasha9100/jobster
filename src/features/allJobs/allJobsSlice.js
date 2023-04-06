import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch,{checkForUnauthorizedResponse} from '../../utilis/axios';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
    'allJobs/getJobs',
    async (_, thunkAPI) => {
        const { page, search, searchStatus, searchType, sort } =
        thunkAPI.getState().allJobs;
  
      let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
      if (search) {
        url = url + `&search=${search}`;
      }
    try {
        const resp = await customFetch.get(url ,{
        headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
        });
        
        return resp.data;
    } 
    catch (error) {
        return checkForUnauthorizedResponse(error,thunkAPI);
    }
    }   
);
export const showStats = createAsyncThunk(
    'allJobs/showStats',
    async(_,thunkAPI)=>{
        try {
            const resp = await customFetch.get('/jobs/stats', {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
                },
                })
                console.log(resp.data)
        return resp.data
        } catch (error) {
            return checkForUnauthorizedResponse(error,thunkAPI);
        }
    }
)

const allJobsSlice = createSlice({
    name:'allJobs',
    initialState,
    reducers:{
        showLoading:(state)=>{
            state.isLoading=true;
        },
        hideLoading:(state)=>{
            state.isLoading=false;
        },
        handleChange:(state,{payload:{name,value}})=>{
            state.page=1
            state[name]= value
        },
        clearFilters:(state)=>{
            return {...state,...initialFiltersState}
        },
        changePage:(state,{payload})=>{
            state.page=payload;
        },
        clearAllJobsState:(state)=>initialState
    },
    extraReducers: {
        [getAllJobs.pending]: (state) => {
        state.isLoading = true;
        },
        [getAllJobs.fulfilled]: (state, {payload}) => {
        state.isLoading = false;
        state.jobs=payload.jobs;
        state.numOfPages=payload.numOfPages;
        state.totalJobs=payload.totalJobs
        
        },
        [getAllJobs.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
        },
        [showStats.pending]: (state) => {
        state.isLoading = true;
        },
        [showStats.fulfilled]: (state, {payload}) => {
        state.isLoading = false;
        state.stats=payload.defaultStats;
        state.monthlyApplications=payload
        },
        [showStats.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
        },
    }
});
export const {clearAllJobsState,changePage,clearFilters,showLoading,hideLoading,handleChange,} = allJobsSlice.actions;
export default allJobsSlice.reducer;