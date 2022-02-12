import React,{useReducer, useState} from 'react';

export const store = {name:''}

export function reducer(state, action) {
    switch (action.type) {
      case 'ADDNAME':
        return {name:action.payload};
      default:
        throw new Error();
    }
}

// this may be any Function / Component
export const Reducer = () => {

    // Reducer
    const [state, dispatch] = useReducer(reducer, store);

    // State
    const [nameinp,setNameInp] = useState('')

  return <div>
      {/* here we are showing the data */}
      <h1>Your Name : {state.name}</h1>

      {/* input field for dynamic data */}
      Enter Name : <input type='text' value={nameinp} onChange={e => setNameInp(e.target.value)} />


      <button onClick={() => dispatch({type:'ADDNAME',payload:nameinp})}>Click</button>
  </div>;
};