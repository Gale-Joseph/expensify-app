//create store is a redux fx that allows state change without going down the chain
import {createStore} from 'redux';

//increment count will accept an object and will extract the contents of that object
const incrementCount = ({incrementBy=1}={})=>({
    type: 'INCREMENT',
    incrementBy: incrementBy
});

const decrementCount = ({decrementBy=1}={})=>({
    type: 'DECREMENT',
    decrementBy: decrementBy
});

const setCount = ({count})=>({
    type: 'SET',
    count:count
});

const resetCount = ()=>({
    type: 'RESET'
});
//store is the core of redux wich contains "state" and "action" parameters
//when dispatch() is added, it populates the action parameter 
//the action parameter can be an object which can then be evaluated in a switch statement

//reducers
const countReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                //count: state.count=0
                count: 0
            };
        default:
            return state;
    }
}

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({
    incrementBy: 4
}));

store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy:5}));

store.dispatch(resetCount());

store.dispatch(setCount({count:666}));