import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileData : {
        customer_name: '',
        customer_role: 'Select a role',
        customer_company: '',
        customer_company_size: 'Select Company Size',
        customer_country: 'Select Country',
        customer_industry: 'Select Industry',
        customer_email: '',
        customer_mobile : {
            countryCode: 'Code',
            phoneNumber: '',
        }
    }
}

export const profileFormSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileData: (state,action)=>{
            const {field,value} = action.payload;
            if(field==="countryCode" || field==="phoneNumber"){
                state.profileData = {
                    ...state.profileData,
                    customer_mobile: {
                        ...state.profileData.customer_mobile,
                        [field]: value
                    }
                }
            }
            else{
                state.profileData = {
                ...state.profileData,
                [field] : value
            }
            }
        }
    }
})

export const {setProfileData} = profileFormSlice.actions;

export default profileFormSlice.reducer