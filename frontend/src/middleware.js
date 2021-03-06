const promiseMiddleware = store => next => action => {
    if(isPromise(action.payload)){
        action.payload.then(
            res => {
                action.payload = res;
                store.dispatch(action);
            }
        );
        return;
    }
    next(action);
};

function isPromise(v){
    return v && typeof v.then === 'function';
}


export {promiseMiddleware};