const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    idToken: '',
    accessToken: '',
    userInfo : {
        email: '',
        userName: ''
    },
    customerId: ''
}
const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setIdToken: (state,action)=>{
            state.idToken=action.payload
        },

        setAccessToken : (state,action)=>{
            state.accessToken = action.payload
        },

        setUserInfo: (state,action)=>{
            const {value1,value2} = action.payload;

            state.userInfo ={
                email : value1,
                userName: value2
                }
        },

        setCustomerId: (state,action)=>{
            state.customerId = action.payload
        },

        resetCustomerId: (state,action)=>{
            state.customerId = initialState.customerId
        },
        
        resetState: (state) => {
            // Reset the state to its initial state
            Object.assign(state, initialState);
            console.log("Sate is ",state);
          },
        
    }
})

export const {setIdToken,setAccessToken,setUserInfo,setCustomerId,resetCustomerId,resetState} = tokenSlice.actions;

export default tokenSlice.reducer