const initState = {
	departments: null,
	error: null,
}

const departmentReducer = (state = initState, action) => {
	switch (action.type) {
		case 'DEPARTMENTS_FETCHED_SUCCESSFULLY':
			return {
				...state,
				departments: action.payload,
				error: null,
			}
		case 'DEPARTMENTS_FETCH_ERROR':
			return {
				...state,
				departments: null,
				error: 'Something went wrong !',
			}

		default:
			return state
	}
}

export default departmentReducer
