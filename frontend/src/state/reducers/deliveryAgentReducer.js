const initState = {
    deliveryAgents: null,
    error: null,
}

const deliveryAgentsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DELIVERY_AGENT_FETCHED_SUCCESSFULLY':
            return {
                ...state,
                deliveryAgents: action.payload,
                error: null,
            }
        case 'DELIVERY_AGENT_FETCH_ERROR':
            return {
                ...state,
                deliveryAgents: null,
                error: 'Something went wrong !',
            }

        default:
            return state
    }
}

export default deliveryAgentsReducer
