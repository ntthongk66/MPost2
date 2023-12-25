import { apiHost } from '../../apiLoc'

export const getAllStaffs = (accessToken) => {
    return (dispatch) => {
        const url = `${apiHost}/api/staffTransactions/getStaffs`
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
                            type: 'STAFFS_FETCHED_SUCCESSFULLY',
                            payload: res.data,
                        })
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: 'STAFFS_FETCH_ERROR',
                })
            })
    }
}
