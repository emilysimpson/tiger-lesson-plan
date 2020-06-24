/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as ActivityView} from './ActivityView'
export {default as ActivityCard} from './ActivityCard'
export {default as AddActivity} from './AddActivity'
export {default as SingleActivity} from './SingleActivity'
export {default as UpdateActivity} from './UpdateActivity'

export {Login, Signup} from './auth-form'
