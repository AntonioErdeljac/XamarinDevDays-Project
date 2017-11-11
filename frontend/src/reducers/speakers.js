export default (state={}, action) => {
    switch(action.type){
        case 'MAIN_PAGE_LOADED':
        console.log(action.payload, 'FROM REDUCER');
            return {
                ...state,
                speakers: action.payload
            };
        case 'DELETE_SPEAKER':
            return {
                ...state,
                speakers: state.speakers.filter(speaker => speaker.id !== action.id)
            };
    }
    return state;
};