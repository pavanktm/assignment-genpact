import axios from 'axios';
export const clearData = () => dispatch => {
    dispatch({
        type: 'CLEAR_DETAILS',
        payload: {  }
    })
}

const userDetailsFetching = (fetching) => dispatch => {
    dispatch({
        type: 'GET_USER_DETAILS',
        payload: { fetching}
    })
}

const userDetailsFetchSuccess = (userDetails) => dispatch =>  {
    dispatch({
        type: 'GET_USER_DETAILS_SUCCESS',
        payload: { userDetails}
    })
}

const userDetailsFetchFailure = (failure) => dispatch => {
    dispatch({
        type: 'GET_USER_DETAILS_FAILURE',
    })
}

export const getUserDetails = (userId) => dispatch => {
    dispatch(userDetailsFetching(true));
    let url = `https://reqres.in/api/users/${userId}`;
    axios.get(url)
        .then((response) => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }
            dispatch(userDetailsFetching(false));

            return response;
        })
        .then((response) => dispatch(userDetailsFetchSuccess(response.data.data)))
        .catch(() => dispatch(userDetailsFetchFailure(true)));
}