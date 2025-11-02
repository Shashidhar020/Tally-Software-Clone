import { createSlice } from '@reduxjs/toolkit';

 const intialState = {
counter:0
}

const counterSlice = createSlice(
{
 initialState:intialState,
 name:'counter',
 reducers:{
    setIncreament:(state)=>{state.counter+=1},
    setDecrement:(state)=>{state.counter-=1}
 }
}
)
export  const {setDecrement,setIncreament} =  counterSlice.actions;
export default counterSlice.reducer;