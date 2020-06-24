import axios from 'axios'
import history from '../history'

const SELECT_ACTIVITY = 'SELECT_ACTIVITY'
const EDIT_ACTIVITY = 'EDIT_ACTIVITY'

const selectActivity = activity => ({type: SELECT_ACTIVITY, activity})
const editActivity = activity => ({type: EDIT_ACTIVITY, activity})

export const fetchSingleActivity = activityId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/activities/${activityId}`)
      dispatch(selectActivity(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}
export const updateActivity = activity => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/activities/${activity.id}`, activity)
      const updatedActivity = res.data
      dispatch(editActivity(updatedActivity))
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }
}

const selectedActivityReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_ACTIVITY:
      return action.activity
    case EDIT_ACTIVITY:
      return action.activity
    default:
      return state
  }
}

export default selectedActivityReducer
