import React from 'react'
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Container,
  FormControl,
  Grid,
  Button
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import MUIRichTextEditor from 'mui-rte'
import {stateToHTML} from 'draft-js-export-html'
import {convertFromHTML, ContentState, convertToRaw} from 'draft-js'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {updateActivity} from '../store/singleActivity'
import theme from '../UI-utils/theme'

const styles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch'
    }
  }
})

class UpdateActivity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      url: '',
      content: '',
      RTEcontent: '',
      weekday: '',
      imageRef: null
    }
  }

  handleChange = evt => {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleRTEChange = data => {
    this.setState({
      content: stateToHTML(data.getCurrentContent()).replace('<p><br></p>', '')
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const activity = {
      id: this.props.match.params.activityId,
      title: this.state.title,
      url: this.state.url,
      imageRef: this.state.imageRef,
      content: this.state.content,
      weekday: this.state.weekday
    }
    this.props.updateActivity(activity)
  }

  render() {
    const {selectedActivity, classes} = this.props
    let content
    if (selectedActivity && selectedActivity.content) {
      const contentHTML = convertFromHTML(this.props.selectedActivity.content)
      const state = ContentState.createFromBlockArray(
        contentHTML.contentBlocks,
        contentHTML.entityMap
      )
      content = JSON.stringify(convertToRaw(state))
    }
    return (
      <Container className={classes.root} style={{margin: '5px'}}>
        <Typography variant="h6">Edit activity</Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                required
                id="standard-required"
                helperText="Required"
                label="Title"
                name="title"
                onChange={this.handleChange}
                defaultValue={this.props.selectedActivity.title}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                label="Content"
                multiline
                rows={7}
                variant="filled"
                type="text"
                name="content"
                onChange={this.handleChange}
                defaultValue={this.props.selectedActivity.content}
              /> */}
              <MUIRichTextEditor
                label="Content"
                name="content"
                onChange={this.handleRTEChange}
                style={{height: '500px'}}
                controls={[
                  'bold',
                  'italic',
                  'underline',
                  'quote',
                  'clear',
                  'numberList',
                  'bulletList'
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              {selectedActivity.activityType === 'video' && (
                <TextField
                  required
                  helperText="Required"
                  label="URL"
                  type="text"
                  name="url"
                  onChange={this.handleChange}
                  defaultValue={this.props.selectedActivity.url}
                />
              )}
            </Grid>
            <Grid item xs={12} style={{paddingLeft: '30px'}}>
              <FormControl style={{minWidth: '220px'}}>
                <InputLabel htmlFor="weekday">Weekday</InputLabel>
                <Select
                  name="weekday"
                  defaultValue={selectedActivity.weekday}
                  onChange={this.handleChange}
                >
                  <MenuItem value="monday">Monday</MenuItem>
                  <MenuItem value="tuesday">Tuesday</MenuItem>
                  <MenuItem value="wednesday">Wednesday</MenuItem>
                  <MenuItem value="thursday">Thursday</MenuItem>
                  <MenuItem value="friday">Friday</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{paddingLeft: '30px'}}>
              {!this.state.title.length ? (
                <Button variant="contained" disabled>
                  Submit
                </Button>
              ) : (
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Container>
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
    updateActivity: activity => dispatch(updateActivity(activity))
  }
}

export default withStyles(styles)(
  connect(mapState, mapDispatch)(UpdateActivity)
)
