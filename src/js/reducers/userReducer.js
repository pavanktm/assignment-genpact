export default (state = {
    fetchingUserDetails: false,
    fetchingUserDetailsSuccess: true,
    userData: {}
}, action) => {
    switch (action.type) {
        case 'GET_USER_DETAILS':
            return { ...state, fetchingUserDetails: action.payload.fetching, userData: {} }
        case 'GET_USER_DETAILS_SUCCESS':
            return { ...state, userData: action.payload.userDetails, fetchingUserDetails: false, fetchingUserDetailsSuccess: true }
        case 'GET_USER_DETAILS_FAILURE':
            return { ...state, fetchingUserDetails: false, fetchingUserDetailsSuccess: false, userData: {} }
        case 'CLEAR_DETAILS':
            return { ...state, fetchingUserDetails: false, fetchingUserDetailsSuccess: true, userData: {} }
        default:
            return state;
    }
}