import axios from 'axios'
import history from '../history'

/** ACTION TYPES */
const SET_ACTIVITIES = 'SET_ACTIVITIES'
const ADD_ACTIVITY = 'ADD_ACTIVITY'
const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY'

/** INITIAL STATE */
const defaultActivities = {}

/** ACTION CREATORS */
const setActivities = activities => ({type: SET_ACTIVITIES, activities})
const addActivity = activity => ({type: ADD_ACTIVITY, activity})
const removeActivity = activityId => ({
  type: REMOVE_ACTIVITY,
  activityId
})

/** THUNK CREATORS */
export const fetchActivities = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/activities')
      const activities = res.data
      dispatch(setActivities(activities))
    } catch (error) {
      console.log(error)
    }
  }
}

export const newActivity = activity => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/activities', activity)
      const newActivity = res.data
      dispatch(addActivity(newActivity))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteActivity = activityId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/activities/${activityId}`)
      dispatch(removeActivity(activityId))
    } catch (error) {
      console.log(error)
    }
  }
}

/** REDUCER */
const activitiesReducer = (state = defaultActivities, action) => {
  switch (action.type) {
    case SET_ACTIVITIES:
      return action.activities
    case ADD_ACTIVITY:
      return action.activity
    case REMOVE_ACTIVITY:
      return state.filter(activity => activity.id !== action.activityId)

    default:
      return state
  }
}

export default activitiesReducer
