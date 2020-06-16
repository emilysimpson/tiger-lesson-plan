const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activity', {
  activityType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    isUrl: true
  },
  imageRef: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  },
  weekday: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Activity
