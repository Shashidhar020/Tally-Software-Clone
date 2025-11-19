// src/redux/dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stockGroups: 0,
  stockItems: 0,
  ledgers: 0,
  groups: 0,
  sales: 0,
  totalAmount:0,
  totalQunatity:0,
  showMenu:false,
  showMaster:false,
  showTransaction:false,
  showOthers:false,
  show:false,
  allSalesRecord:[],
  backgroundColor:[]
};

const dashboardSlice = createSlice({
  initialState,
  name: 'dashboard',
  reducers: {
    setStockGroups: (state, ac) => { state.stockGroups = ac.payload },
    setStockItems: (state, action) => { state.stockItems = action.payload },
    setLedgers: (state, action) => { state.ledgers = action.payload },
    setGroups: (state, action) => { state.groups = action.payload },
    setSales: (state, action) => { state.sales = action.payload },
    setTotalAmount:(state,action) =>{state.totalAmount=action.payload},
    setTotalQuantity:(state,action)=>{state.totalQunatity=action.payload},
    setAllSalesRecord:(state,action)=>{state.allSalesRecord=action.payload},
    setShowMenu:(state,action)=>{state.showMenu=action.payload},
    setShowMaster:(state,action)=>{state.showMaster=action.payload},
    setShowTransaction:(state,action)=>{state.showTransaction=action.payload},
    setShowOthers:(state,action)=>{state.showOthers=action.payload},
    setShow:(state,action)=>{state.show=action.payload},
    setBackGroundColor:(state,action) =>{state.backgroundColor=action.payload}
  }
},
);
export const { setStockGroups, setStockItems, setLedgers, setGroups, setSales,setTotalAmount,setTotalQuantity,setAllSalesRecord,setShowMenu,setShowMaster,setShowTransaction,setShowOthers,setShow,setBackGroundColor} = dashboardSlice.actions;
export default dashboardSlice.reducer;
