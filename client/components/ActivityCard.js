import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {deleteActivity} from '../store/activities'

const ActivityCard = props => {
  const {activity, user} = props
  let youtubeCode
  if (activity.url) {
    if (activity.url.length) {
      youtubeCode = activity.url.slice(activity.url.indexOf('=') + 1)
    }
  }
  return (
    <div>
      <Link to={`/activity/${activity.id}`}>
        <h4>{activity.title}</h4>
      </Link>
      {activity.imageRef && (
        <img
          width="300px"
          src={`https://lesson-plan-uploads.s3.amazonaws.com/${
            activity.imageRef
          }`}
        />
      )}
      {activity.url && (
        <img
          width="300px"
          src={`http://img.youtube.com/vi/${youtubeCode}/0.jpg`}
        />
      )}
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
