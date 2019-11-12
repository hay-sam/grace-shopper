import axios from 'axios'

const GOT_USERS = 'GOT_USERS'

const gotUsers = users => ({
  type: GOT_USERS,
  users
})

export const getUsers = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(gotUsers(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = []

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS:
      return action.users
    default:
      return state
  }
}

export default usersReducer
