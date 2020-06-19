import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {fetchSingleActivity} from '../store/singleActivity'

class SingleActivity extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchSingleActivity(this.props.match.params.activityId)
  }

  render() {
    const selectedActivity = this.props.selectedActivity
    return (
      <div>
        <h2>{selectedActivity.title}</h2>
        {selectedActivity.url && (
          <ReactPlayer width="450px" url={selectedActivity.url} />
        )}
        {selectedActivity.imageRef && (
          <img
            width="450px"
            src={`https://lesson-plan-uploads.s3.amazonaws.com/${
              selectedActivity.imageRef
            }`}
          />
        )}
        <p>{selectedActivity.content}</p>
      </div>
    )
  }
}

const mapState = state => {
  return {
    selectedActivity: state.selectedActivity
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleActivity: activityId => {
      dispatch(fetchSingleActivity(activityId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleActivity))
