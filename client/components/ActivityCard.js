import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {deleteActivity} from '../store/activities'

const ActivityCard = props => {
  const {activity, user} = props
  return (
    <div>
      <h4>{activity.title}</h4>
      {activity.content && <p>{activity.content}</p>}
      {activity.url && <a href={activity.url}>{activity.title}</a>}
      {user.isAdmin && (
        <button
          onClick={() => props.deleteActivity(activity.id, activity.weekday)}
        >
          delete
        </button>
      )}
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    deleteActivity: activityId => dispatch(deleteActivity(activityId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(ActivityCard))
