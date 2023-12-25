const initState = {
    staffs: null,
    error: null,
}

const staffTransactionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'STAFFS_FETCHED_SUCCESSFULLY':
            return {
                ...state,
                staffs: action.payload,
                error: null,
            }

        case 'STAFFS_FETCH_ERROR':
            return {
                ...state,
                staffs: null,
                error: 'Something went wrong !',
            }

        default:
            return state
    }
}

export default staffTransactionReducer
