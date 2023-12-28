import { apiHost } from '../../apiLoc'

export const getAllDepartments = (accessToken) => {
    return (dispatch) => {
        const url = `${apiHost}/api/admin/getDepartments`
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
                            type: 'DEPARTMENTS_FETCHED_SUCCESSFULLY',
                            payload: res.data,
                        })
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: 'DEPARTMENTS_FETCH_ERROR',
                })
            })
    }
}