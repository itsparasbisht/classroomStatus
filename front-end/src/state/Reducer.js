export const initialState = {
    isAdmin: false,
    live: false
}

export const reducer = (state, action) => {
    switch(action.type){
        case 'admin':
            return{
                isAdmin: true
            }
        case 'addLive':
            return{
                ...state,
                live: true
            }
        default:
            return state
    }
}