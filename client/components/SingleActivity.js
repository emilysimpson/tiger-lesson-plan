import React from 'react'
import {Container, Typography, Fab, Modal, Box, Grid} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import {withStyles} from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import {Markup} from 'interweave'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {fetchSingleActivity} from '../store/singleActivity'
import history from '../history'

const style = theme => ({
  paper: {
    position: 'absolute',
    top: '10%',
    left: '25%',
    width: '60vw',
    height: '600px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    outline: 'none',
    overflow: 'scroll',
    padding: theme.spacing(2, 4, 3)
  }
})

class SingleActivity extends React.Component {
  componentDidMount() {
    this.props.fetchSingleActivity(this.props.match.params.activityId)
  }

  render() {
    const {selectedActivity, isAdmin, classes, width} = this.props
    return (
      <>
        {width === 'sm' || width === 'xs' ? (
          <Container>
            <Typography variant="h4">{selectedActivity.title}</Typography>
            {selectedActivity.url && (
              <ReactPlayer width="100%" url={selectedActivity.url} />
            )}
            {selectedActivity.imageRef && (
              <img
                width="100%"
                src={`https://lesson-plan-uploads.s3.amazonaws.com/${
                  selectedActivity.imageRef
                }`}
              />
            )}

            <Markup content={selectedActivity.content} />

            {isAdmin && (
              <Grid container style={{paddingTop: '20px'}}>
                <Fab
                  color="secondary"
                  size="medium"
                  aria-label="edit"
                  component={Link}
                  to={`/update-activity/${selectedActivity.id}`}
                >
                  <EditIcon style={{fill: '#fff'}} />
                </Fab>
              </Grid>
            )}
          </Container>
        ) : (
          <Container style={{background: 'rgba(0, 0, 0, 0.15)'}}>
            <Modal open={true} onClose={() => history.goBack()}>
              <Container
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                className={classes.paper}
              >
                <Typography variant="h4">{selectedActivity.title}</Typography>

                <Box style={{marginTop: '20px'}}>
                  {selectedActivity.url && (
                    <ReactPlayer width="60vw" url={selectedActivity.url} />
                  )}
                  {selectedActivity.imageRef && (
                    <Box
                      style={{
                        position: 'relative',
                        width: '60vw',
                        height: '300px',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        style={{
                          position: 'absolute',
                          top: '-9999px',
                          left: '-9999px',
                          right: '-9999px',
                          bottom: '-9999px',
                          margin: 'auto'
                        }}
                        width="100%"
                        src={`https://lesson-plan-uploads.s3.amazonaws.com/${
                          selectedActivity.imageRef
                        }`}
                      />
                    </Box>
                  )}
                  <Box style={{padding: '30px', width: '100%'}}>
                    <Markup content={selectedActivity.content} />
                  </Box>
                </Box>
                {isAdmin && (
                  <Grid container>
                    <Fab
                      style={{
                        position: 'fixed',
                        top: '75%',
                        left: '80%',
                        marginTop: '10px'
                      }}
                      color="secondary"
                      size="medium"
                      aria-label="edit"
                      component={Link}
                      to={`/update-activity/${selectedActivity.id}`}
                    >
                      <EditIcon style={{fill: '#fff'}} />
                    </Fab>
                  </Grid>
                )}
              </Container>
            </Modal>
          </Container>
        )}
      </>
    )
  }
}

const mapState = state => {
  return {
    isAdmin: !!state.user.isAdmin,
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

export default withStyles(style)(
  withWidth()(withRouter(connect(mapState, mapDispatch)(SingleActivity)))
)
