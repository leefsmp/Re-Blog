import ServiceManager from 'SvcManager'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_NAVBAR_STATE = 'SET_NAVBAR_STATE'
export const SAVE_APP_STATE = 'SAVE_APP_STATE'

// ------------------------------------
// Actions
// ------------------------------------
export function saveAppState () {
  return {
    type    : SAVE_APP_STATE
  }
}

export function setNavbarState (state) {
  return {
    type    : SET_NAVBAR_STATE,
    payload : state
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

  [SAVE_APP_STATE] : (state, action) => {

    const storageSvc = ServiceManager.getService(
      'StorageSvc')

    storageSvc.save('AppState', state)

    return state
  },

  [SET_NAVBAR_STATE] : (state, action) => {

    const navbar = Object.assign({},
      state.navbar, action.payload)

    return Object.assign({}, state, {
      navbar
    })
  }
}

// ------------------------------------
// Initial App State
// ------------------------------------

const createInitialState = () => {

  const defaultState = {
    navbar: {
      links:{
        about: true,
        home: true
      }
    }
  }

  const initialState = Object.assign({},
    defaultState)

  return initialState
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer (
  state = createInitialState(), action) {

  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
