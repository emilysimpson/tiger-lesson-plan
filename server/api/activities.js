const router = require('express').Router()
const {Activity} = require('../db/models')
module.exports = router

const checkAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    res.status(401).end()
  }
}

router.get('/', async (req, res, next) => {
  try {
    let activities = await Activity.findAll()
    res.json(activities)
  } catch (error) {
    next(error)
  }
})

router.get('/:activityId', async (req, res, next) => {
  try {
    let activity = await Activity.findByPk(req.params.activityId)
    res.json(activity)
  } catch (error) {
    next(error)
  }
})

router.post('/', checkAdmin, async (req, res, next) => {
  try {
    const newActivity = {
      activityType: req.body.activityType,
      title: req.body.title,
      weekday: req.body.weekday,
      ...(req.body.url && {url: req.body.url}),
      ...(req.body.imageRef && {imageRef: req.body.imageRef}),
      ...(req.body.content && {content: req.body.content})
    }
    const activity = await Activity.create(newActivity)
    res.json(activity)
  } catch (error) {
    next(error)
  }
})

router.put('/:activityId', checkAdmin, async (req, res, next) => {
  try {
    const updatedActivity = {
      ...(req.body.title && {title: req.body.title}),
      ...(req.body.weekday && {weekday: req.body.weekday}),
      ...(req.body.content && {content: req.body.content}),
      ...(req.body.imageRef && {imageRef: req.body.imageRef})
    }
    const activity = await Activity.findByPk(req.params.activityId)
    await activity.update(updatedActivity)
    res.json(activity)
  } catch (error) {
    next(error)
  }
})

router.delete('/:activityId', checkAdmin, async (req, res, next) => {
  try {
    await Activity.destroy({
      where: {
        id: req.params.activityId
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
