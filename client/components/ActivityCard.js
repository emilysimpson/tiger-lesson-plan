import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import withWidth from '@material-ui/core/withWidth'
import {deleteActivity} from '../store/activities'

const ActivityCard = props => {
  const {activity, user, width} = props
  let youtubeCode
  if (activity.url) {
    if (activity.url.length) {
      youtubeCode = activity.url.slice(activity.url.indexOf('=') + 1)
    }
  }
  let linkLocation
  if (width === 'sm' || width === 'xs') {
    linkLocation = `/activity/${activity.id}`
  } else {
    linkLocation = {
      pathname: `/activity/${activity.id}`,
      state: {background: props.location}
    }
  }
  return (
    <Card style={{textAlign: 'left'}}>
      <Link to={linkLocation}>
        <CardActionArea>
          {activity.imageRef && (
            <CardMedia
              style={{height: '100px'}}
              image={`https://lesson-plan-uploads.s3.amazonaws.com/${
                activity.imageRef
              }`}
              title={activity.title}
            />
          )}
          {activity.url && (
            <CardMedia
              style={{height: '120px'}}
              image={`http://img.youtube.com/vi/${youtubeCode}/0.jpg`}
              title={activity.title}
            />
          )}

          <Typography gutterBottom variant="body1" style={{padding: '5px'}}>
            {activity.title}
          </Typography>
        </CardActionArea>
      </Link>
      {user.isAdmin && (
        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => props.deleteActivity(activity.id, activity.weekday)}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
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

export default withWidth()(
  withRouter(connect(mapState, mapDispatch)(ActivityCard))
)
