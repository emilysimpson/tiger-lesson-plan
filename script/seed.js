'use strict'

const db = require('../server/db')
const {User, Activity} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Dog',
      isAdmin: true
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Dog'
    })
  ])

  const activities = await Promise.all([
    Activity.create({
      activityType: 'video',
      url: 'https://www.youtube.com/watch?v=DtMuKjvhz5g',
      title: 'Educational Video',
      weekday: 'tuesday'
    }),
    Activity.create({
      activityType: 'activity',
      imageRef: 'bucketFolder/1592508029515-lg.png',
      content:
        'Materials: 1. this 2. something else 3. another thing Process: Take the thing and add another thing to it.',
      title: 'Fun Activity',
      weekday: 'tuesday'
    }),
    Activity.create({
      activityType: 'video',
      url: 'https://www.youtube.com/watch?v=DtMuKjvhz5g',
      title: 'Fun Video',
      weekday: 'wednesday'
    }),
    Activity.create({
      activityType: 'activity',
      imageRef: 'bucketFolder/1592508029515-lg.png',
      content:
        'Materials: 1. this 2. something else 3. another thing Process: Take the thing and add another thing to it.',
      title: 'Fun Activity',
      weekday: 'thursday'
    }),
    Activity.create({
      activityType: 'video',
      url: 'https://www.youtube.com/watch?v=DtMuKjvhz5g',
      title: 'Video',
      weekday: 'thursday'
    }),
    Activity.create({
      activityType: 'video',
      url: 'https://www.youtube.com/watch?v=DtMuKjvhz5g',
      title: 'Educational Video',
      weekday: 'thursday'
    }),
    Activity.create({
      activityType: 'video',
      url: 'https://www.youtube.com/watch?v=DtMuKjvhz5g',
      title: 'Fun Video',
      weekday: 'friday'
    }),
    Activity.create({
      activityType: 'activity',
      imageRef: 'bucketFolder/1592508029515-lg.png',
      content:
        'Materials: 1. this 2. something else 3. another thing Process: Take the thing and add another thing to it.',
      title: 'Educational Activity',
      weekday: 'monday'
    }),
    Activity.create({
      activityType: 'video',
      url: 'https://www.youtube.com/watch?v=DtMuKjvhz5g',
      title: 'Video',
      weekday: 'monday'
    }),
    Activity.create({
      activityType: 'activity',
      imageRef: 'bucketFolder/1592508029515-lg.png',
      content:
        'Materials: 1. this 2. something else 3. another thing Process: Take the thing and add another thing to it.',
      title: 'Fun Activity',
      weekday: 'monday'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${activities.length} activities`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
