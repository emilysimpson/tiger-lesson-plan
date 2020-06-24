import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  ActivityView,
  AddActivity,
  SingleActivity,
  UpdateActivity
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin, location, width} = this.props
    let background = location.state && location.state.background
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {!isLoggedIn && (
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
        {isLoggedIn && (
          <>
            <Switch location={background || location}>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/" component={ActivityView} />
              <Route path="/activity/:activityId" component={SingleActivity} />

              {isAdmin && (
                <Switch>
                  <Route
                    path="/add-activity/:weekday"
                    component={AddActivity}
                  />
                  <Route
                    path="/update-activity/:activityId"
                    component={UpdateActivity}
                  />
                </Switch>
              )}
            </Switch>

            {background && (
              <Route path="/activity/:activityId" component={SingleActivity} />
            )}
          </>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isAdmin: state.user.isAdmin,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
