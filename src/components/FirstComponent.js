import React from 'react'
import { Link } from 'react-router-dom'
import { useState , useRef} from 'react'
import warningPic from './Assets/warning.svg'

export default function FirstComponent() {
    const [text,setText]=useState("");
    const [warningText, setWarningText]=useState("")
    const [attribute, setAttribute]=useState("");
    const userRef=useRef(null);
    const warningRef=useRef(null);

    const handleTextChange=(event)=>{
        setText(event.target.value)
        
    }

    const handleOnBlur=()=>{
        if(warningRef.current.classList.contains("flex")){
            warningRef.current.classList.remove("flex")
            warningRef.current.classList.add("hidden")
        }
    }
    const handleOnClick=()=>{
        console.log(text);
        if( text.length===0 ){
            warningRef.current.classList.remove("hidden")
            warningRef.current.classList.add("flex")
            setWarningText("Please Enter a Number")

        }
        else if(Number(text)<=1 ){
        //    console.log("invalid input",Number(text))
        warningRef.current.classList.remove("hidden")

        warningRef.current.classList.add("flex")

        setWarningText("Please Enter a number greater than or equal to 2")
          
        }
         
        else if(Number(text)!==Math.ceil(Number(text))){
            warningRef.current.classList.remove("hidden")
            warningRef.current.classList.add("flex")
            setWarningText("Please Enter a number which is either "+Math.floor(Number(text))+" or "+Math.ceil(Number(text)))

        }
        else if(Number(text)>=6){
            warningRef.current.classList.remove("hidden")
            warningRef.current.classList.add("flex")
            setWarningText("The number must be between 2 and 6")

        }
        else{
            // userR const [text,setText]=useState("");ef.current.setAttribute('to',`/about?num=${text}`)
            // console.log("valid input")
           localStorage.setItem("num",text)
           setAttribute("/about")
        // userRef.current.Link.setAttribute('to',`/about?num=${text}`)
        //    userRef.current.setAttribute("to","/about")
          userRef.current.Link("/about")
        }
    }
    
 
  return (
      <>
      <div className='flex  justify-center  '>
          <div className='my-2 flex'>
              <div>

         <label htmlFor="puzzleSize" className='text-[26px] text-green-500'>Enter puzzle Size &nbsp;</label>
              </div>
         <div className='flex flex-col'>

          <input type="number" name="numberGiven" className='px-3 py-6 w-[400px] rounded-[4px] h-[56px] border-2 border-green-500' id="puzzleSize" placeholder='Enter the puzzle size' value={text}  onChange={handleTextChange}/>
          <div id='paragraph' className={`my-3 hidden w-[400px] h-[80px]`} ref={warningRef}> <img src={warningPic} className="bg-yellow-300 px-2 py-2 rounded-[4px] mx-3 w-[40px] h-[40px]" alt="" />
          <div className='text-[16px]'>
              {warningText}
          </div>
    </div>

         </div>
          </div>
          
        

          
        
<div>

      <Link ref={userRef} to={attribute}> <button className='w-[150px] mx-4 h-[56px] text-white bg-green-500 hover:bg-green-600 hover:text-gray-200 text-center text-[22px] rounded-[4px] font-bold my-2' onClick={handleOnClick} onBlur={handleOnBlur} >Create! </button></Link>
      </div>
</div>


      {/* <input type="text" placeholder='Enter the number '/> */}
      </>
  )
}

// export {text}
