import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import {Grid, Fab, Typography} from '@material-ui/core'
import {Add, Pets} from '@material-ui/icons'
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
      <Container>
        <Typography variant="h5" gutterBottom>
          Hello, {this.props.user.firstName} <Pets fontSize="small" />
        </Typography>
        {this.props.user.isAdmin && (
          <Typography color="secondary" variant="button">
            Admin
          </Typography>
        )}
        <Grid
          container
          spacing={3}
          style={{paddingTop: '3em', textAlign: 'center'}}
        >
          <Grid item lg={2} md={2} xs={12}>
            <Typography variant="overline" gutterBottom>
              Monday
            </Typography>
            {activities.monday ? (
              activities.monday.map(activity => (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <ActivityCard activity={activity} />
                  </Grid>
                </Grid>
              ))
            ) : (
              <p>No activities</p>
            )}
            {this.props.user.isAdmin && (
              <Grid
                container
                style={{marginTop: '10px'}}
                alignItems="center"
                justify="center"
              >
                <Fab
                  color="primary"
                  size="medium"
                  aria-label="add"
                  component={Link}
                  to="/add-activity/monday"
                >
                  <Add style={{fill: '#fff'}} />
                </Fab>
              </Grid>
            )}
          </Grid>
          <hr />
          <Grid item lg={2} md={2} xs={12}>
            <Typography variant="overline" gutterBottom>
              Tuesday
            </Typography>
            {activities.tuesday ? (
              activities.tuesday.map(activity => (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <ActivityCard activity={activity} />
                  </Grid>
                </Grid>
              ))
            ) : (
              <p>No activities</p>
            )}
            {this.props.user.isAdmin && (
              <Grid
                container
                style={{marginTop: '10px'}}
                alignItems="center"
                justify="center"
              >
                <Fab
                  color="primary"
                  size="medium"
                  aria-label="add"
                  component={Link}
                  to="/add-activity/tuesday"
                >
                  <Add style={{fill: '#fff'}} />
                </Fab>
              </Grid>
            )}
          </Grid>
          <hr />
          <Grid item lg={2} md={2} xs={12}>
            <Typography variant="overline" gutterBottom>
              Wednesday
            </Typography>
            {activities.wednesday ? (
              activities.wednesday.map(activity => (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <ActivityCard activity={activity} />
                  </Grid>
                </Grid>
              ))
            ) : (
              <p>No activities</p>
            )}
            {this.props.user.isAdmin && (
              <Grid
                container
                style={{marginTop: '10px'}}
                alignItems="center"
                justify="center"
              >
                <Fab
                  color="primary"
                  size="medium"
                  aria-label="add"
                  component={Link}
                  to="/add-activity/wednesday"
                >
                  <Add style={{fill: '#fff'}} />
                </Fab>
              </Grid>
            )}
          </Grid>

          <hr />
          <Grid item lg={2} md={2} xs={12}>
            <Typography variant="overline" gutterBottom>
              Thursday
            </Typography>
            {activities.thursday ? (
              activities.thursday.map(activity => (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <ActivityCard activity={activity} />
                  </Grid>
                </Grid>
              ))
            ) : (
              <p>No activities</p>
            )}
            {this.props.user.isAdmin && (
              <Grid
                container
                style={{marginTop: '10px'}}
                alignItems="center"
                justify="center"
              >
                <Fab
                  color="primary"
                  size="medium"
                  aria-label="add"
                  component={Link}
                  to="/add-activity/thursday"
                >
                  <Add style={{fill: '#fff'}} />
                </Fab>
              </Grid>
            )}
          </Grid>

          <hr />
          <Grid item lg={2} md={2} xs={12}>
            <Typography variant="overline" gutterBottom>
              Friday
            </Typography>
            {activities.friday ? (
              activities.friday.map(activity => (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <ActivityCard activity={activity} />
                  </Grid>
                </Grid>
              ))
            ) : (
              <p>No activities</p>
            )}
            {this.props.user.isAdmin && (
              <Grid
                container
                style={{marginTop: '10px'}}
                alignItems="center"
                justify="center"
              >
                <Fab
                  color="primary"
                  size="medium"
                  aria-label="add"
                  component={Link}
                  to="/add-activity/friday"
                >
                  <Add style={{fill: '#fff'}} />
                </Fab>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
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
