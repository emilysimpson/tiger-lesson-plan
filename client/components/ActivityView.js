import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {fetchActivities} from '../store/activities'
import {ActivityCard} from '../components'

class ActivityView extends React.Component {
  componentDidMount() {
    this.props.fetchActivities()
  }

  render() {
    const activities = {}
    if (this.props.activities.length) {
      this.props.activities.map(activity => {
        if (activities[activity.weekday]) {
          return activities[activity.weekday].push(activity)
        } else {
          return (activities[activity.weekday] = [activity])
        }
      })
    }
    return (
      <div>
        <h2>Hello, {this.props.user.firstName}</h2>
        <h3>Monday</h3>
        {activities.monday ? (
          activities.monday.map(activity => (
            <ActivityCard activity={activity} />
          ))
        ) : (
          <p>No activities</p>
        )}
        <hr />

        <h3>Tuesday</h3>
        {activities.tuesday ? (
          activities.tuesday.map(activity => (
            <ActivityCard activity={activity} />
          ))
        ) : (
          <p>No activities</p>
        )}
        <hr />

        <h3>Wednesday</h3>
        {activities.wednesday ? (
          activities.wednesday.map(activity => (
            <ActivityCard activity={activity} />
          ))
        ) : (
          <p>No activities</p>
        )}
        <hr />

        <h3>Thursday</h3>
        {activities.thursday ? (
          activities.thursday.map(activity => (
            <ActivityCard activity={activity} />
          ))
        ) : (
          <p>No activities</p>
        )}
        <hr />
        <h3>Friday</h3>
        {activities.friday ? (
          activities.friday.map(activity => (
            <ActivityCard activity={activity} />
          ))
        ) : (
          <p>No activities</p>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    activities: state.activities,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchActivities: () => dispatch(fetchActivities())
  }
}

export default withRouter(connect(mapState, mapDispatch)(ActivityView))
