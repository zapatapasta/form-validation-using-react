
import { useState } from 'react';
import './App.css';
import InputField from './Components/InputField';
import { useRef, createRef } from 'react';

function App() {
  const[data,setData]=useState({})

  const inputRefs = useRef([
    createRef(),createRef()
])

  const handleChange =(name, value)=>{
    setData(prev => ({...prev,[name]:value}))
  }

  const submitForm = (e)=>{
    e.preventDefault();
    
    let isValid = true

    for(let i= 0; i<inputRefs.current.length;i++){
      const valid = inputRefs.current[i].current.validate()
      console.log(valid);
      if(!valid){
        isValid= false;
      }
    }
    if(!isValid){
      return
    }
    console.log("logged in");
  }


  return (
    <div className="App">
      <form onSubmit={submitForm} className='form'>
        <h1>reat register form</h1>
        <InputField 
          ref={inputRefs.current[0]}
          name="username"
          lable="Username"
          onChange={handleChange}
          validation={"required|min:6|max:12"}
        />
        <InputField 
          ref={inputRefs.current[1]}
          name="password"
          lable="Password"
          onChange={handleChange}
        />
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default App;
