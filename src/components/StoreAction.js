export const storeAction = (dispatch, payload) => {
    dispatch({
        type: 'GET_CATS',
        payload
    })
}