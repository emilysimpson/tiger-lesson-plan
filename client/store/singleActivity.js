import axios from 'axios'
import history from '../history'

const EDIT_ACTIVITY = 'EDIT_ACTIVITY'

const editActivity = activtiy => ({type: EDIT_ACTIVITY, activity})

export const updateActivity = activity => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/activities/${activity.id}`, activity)
      const updatedActivity = res.data
      dispatch(editActivity(updatedActivity))
      history.push(`/activity/${activity.id}`)
    } catch (error) {
      console.log(error)
    }
  }
}

export default (selectedActivityReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_ACTIVITY:
      return action.activity
    default:
      return state
  }
})
