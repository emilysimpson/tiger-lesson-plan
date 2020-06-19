import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {newActivity} from '../store/activities'

class AddActivity extends React.Component {
  constructor() {
    super()
    this.state = {
      activityType: null,
      title: '',
      url: '',
      imageRef: null,
      content: '',
      weekday: '',
      file: null,
      loading: false
    }
  }

  componentDidMount() {
    const {weekday} = this.props.match.params
    this.setState({weekday: weekday})
  }

  handleFileUpload = event => {
    this.setState({file: event.target.files})
  }

  submitFile = async event => {
    try {
      event.preventDefault()
      this.setState({loading: true})
      const formData = new FormData()
      formData.append('file', this.state.file[0])
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.setState({imageRef: res.data})
      this.setState({loading: false})
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = evt => {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const activity = {
      activityType: this.state.activityType,
      title: this.state.title,
      url: this.state.url,
      imageRef: this.state.imageRef,
      content: this.state.content,
      weekday: this.state.weekday
    }
    this.props.newActivity(activity)
  }

  render() {
    const {weekday} = this.props.match.params
    return (
      <div>
        {!this.state.activityType ? (
          <div>
            <label htmlFor="activityType">Activity type:</label>
            <select
              name="activityType"
              id="activityType"
              onChange={this.handleChange}
            >
              <option>Select one</option>
              <option value="activity">Project</option>
              <option value="video">Video</option>
            </select>
          </div>
        ) : (
          <div>
            <h3>Add activity</h3>
            {this.state.loading ? (
              <p>Loading...</p>
            ) : this.state.imageRef ? (
              <img
                src={`https://lesson-plan-uploads.s3.amazonaws.com/${
                  this.state.imageRef
                }`}
                width="200px"
              />
            ) : (
              <form onSubmit={this.submitFile}>
                <label htmlFor="upload">Upload image</label>
                <input
                  label="upload"
                  type="file"
                  onChange={this.handleFileUpload}
                />
                <button type="submit">Upload</button>
              </form>
            )}
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="title">Title:</label>
              <input type="text" name="title" onChange={this.handleChange} />
              {this.state.activityType === 'video' && (
                <>
                  <label htmlFor="url">URL:</label>
                  <input type="text" name="url" onChange={this.handleChange} />
                </>
              )}
              <label htmlFor="content">Information:</label>
              <textarea
                type="text"
                name="content"
                onChange={this.handleChange}
              />
              <label htmlFor="weekday">Weekday:</label>
              <select
                name="weekday"
                defaultValue={weekday}
                onChange={this.handleChange}
              >
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
              </select>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    newActivity: activity => dispatch(newActivity(activity))
  }
}

export default connect(null, mapDispatch)(AddActivity)
