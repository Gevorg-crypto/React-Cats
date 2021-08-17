const initialState = {
    cats: [],
}

export const catsStore = ( state = initialState, action = {} ) => {
    switch (action.type) {
        case 'GET_CATS':
            return state.cats = action.payload
        default:
            return state.cats
    }
}