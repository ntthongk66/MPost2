import { apiHost } from '../../apiLoc'

export const getAllDeliveryAgents = (accessToken) => {
    return (dispatch) => {
        const url = `${apiHost}/api/admin/getDeliveryAgents`
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((res) => {
                        dispatch({
                            type: 'DELIVERY_AGENT_FETCHED_SUCCESSFULLY',
                            payload: res.data,
                        })
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: 'DELIVERY_AGENT_FETCH_ERROR',
                })
            })
    }
}