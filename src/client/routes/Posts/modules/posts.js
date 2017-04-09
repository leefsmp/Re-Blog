// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_DB_ITEMS = 'LOAD_DB_ITEMS'

// ------------------------------------
// Actions
// ------------------------------------
export const loadDbItems = (dbItems) => {

  return {
    type    : LOAD_DB_ITEMS,
    payload : dbItems
  }
}

export const actions = {
  loadDbItems
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {

  [LOAD_DB_ITEMS] : (state, action) => {

    const dbItems = _.sortBy(action.payload,
      (dbItem) => {
        return dbItem.name
      })

    return Object.assign({}, state, {
      dbItems
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  dbItems: []
}

export default function reducer (state = initialState, action) {

  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}






