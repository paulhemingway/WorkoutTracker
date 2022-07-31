const initialState = {
    authed: false,
    userInfo: {},
    collapsed: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH':
            state.authed = action.payload.authed
            return state
        case 'USER_INFO':
            state.userInfo = action.payload.userInfo
        default:
            return state
    }
}

export default reducer