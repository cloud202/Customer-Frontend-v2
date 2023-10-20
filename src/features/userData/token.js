const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    idToken: '',
    accessToken: '',
    userInfo : {
        email: '',
        userName: ''
    },
    customerId: '',
    customerQc: '',
    isMember: false
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

        setMember: (state,action)=>{
            state.isMember = action.payload;
        },

        setCustomerQc: (state,action)=>{
            state.customerQc = action.payload;
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

export const {setIdToken,setAccessToken,setUserInfo,setCustomerId,setMember,resetCustomerId,resetState,setCustomerQc} = tokenSlice.actions;

export default tokenSlice.reducer