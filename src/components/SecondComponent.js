import React,{useEffect} from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom';


export default function SecondComponent() {

    
    const handleReset=()=>{
        window.location.reload()
    }
    
    
    // const refVar=useRef(null);
    const useRefState=useRef(null);
    const displayRef=useRef(null);
    
    const [searchParams, setSearchParams]=useSearchParams();
    const [boxes, setBoxes] = useState([]);

    let myNum=localStorage.getItem("num");
    
    useEffect(()=>{
        let numbers = [];
        let updatedboxes = []
        for (let index = 0; index < myNum* myNum; index++) {
            numbers.push(index + 1);
        }

        for (let index = 0; index <myNum *myNum; index++) {
            let selectedIndex = Math.floor(Math.random() * numbers.length);
            updatedboxes.push(numbers[selectedIndex]);
            numbers.splice(selectedIndex, 1);
        }

        setBoxes(updatedboxes);
    }, []);

     useEffect(() => {}, [boxes]);
    const [dragging, setDragging]=useState(false);
    const dragItem= useRef()
    const dragNode=useRef()
    const handleDragStart=(e,params)=>{
        console.log('drag starts from ',params)
        dragItem.current=params
        dragNode.current=e.target
        dragNode.current.addEventListener(
            'dragend',
            handleDragEnd
        )
        setTimeout(()=>{
           setDragging(true)
        },0)
        // setDragging(true)
    }
    
const handleDragEnd=()=>{
        
        console.log('drag end')
        dragNode.current=null
        dragItem.current=null
        setDragging(false)
        dragNode.current.removeEventListener(
            'dragend',
            handleDragEnd
        )

        // dragNode.current.removeEventListener("dragend",handleDragEnd)
           }
    const getStyles=(params)=>{
        const currentItem=dragItem.current; 
        if(currentItem===params){
            // console.log(params.box)
        return 'w-auto h-auto bg-black my-2 mx-2  text-center text-[40px] flex items-center justify-center '
        }
        
            return 'w-auto h-auto bg-gray-300 my-2 mx-2  text-center text-[40px] flex items-center justify-center'

        
    }

    const handleDragEnter=(e,params)=>{
        console.log(searchParams.get('num'))
        const currentItem=dragItem.current;
        // console.log("The current item is ",currentItem)
        // console.log("abc",currentItem)
        // console.log(e.target)
        if(e.target!==dragNode.current){
            //    handleSwap();
            console.log('drag enter into',params )
            // handleSwap()
            // const currentIndex=dragItem.getAttribute("index");
            const currentItem=dragItem.current;
            // const shiftedElem=e.target;
            
            // console.log(currentItem,shiftedElem)
            
            // const currentNode=dragNode.current;
            // console.log("current node is",currentItem)
            // console.log()
            const currentIndex=boxes.indexOf(currentItem);  
            const shiftedElemIndex=Number(e.target.getAttribute('index'));
            // console.log("The item to be moved has index",currentIndex);
            console.log(currentIndex,shiftedElemIndex);

            const temp=boxes[currentIndex];
            boxes[currentIndex]=boxes[shiftedElemIndex];
            boxes[shiftedElemIndex]=temp;
            setBoxes([...boxes])

            checkOrder();


            // console.log()


            


        
       }
    }

 const checkOrder=()=>{
   

  let sortedCheck=isArraySorted(boxes)
  if(sortedCheck===true){
    displayRef.current.classList.remove("hidden")
    displayRef.current.classList.add("flex")
         // alert('You have successfully completed the game')
        
        // handleReset()
  }

 

      
      
 }
 function isArraySorted(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i + 1] && arr[i + 1] > arr[i]) {
        continue;
      } else if (arr[i + 1] && arr[i + 1] < arr[i]) {
        return false;
      }
    }
    return true;
  }
 
  return (
 <>
 <div className='font-bold text-white flex items-center flex-col justify-center'>
 <h1 className='font-bold my-2 lg:text-[48px] text-[26px] text-white bg-gradient-to-tr from-blue-700 to-[#ca1d1d] bg-clip-text text-transparent'>Welcome To The Game World</h1>

     <div style={{gridTemplateColumns: `repeat(${myNum}, 1fr)`}} className={`firstCont grid bg-orange-400 rounded-[14px] gap-x-${searchParams.get('num')} gap-y-${myNum} w-auto mx-auto`} ref={useRefState}>
       
    {
        boxes.map((box,i) => <div draggable key={box} index={i}
            onDragEnter={dragging?(e) => {handleDragEnter(e,box)}:null}
             onDragStart={(e)=>{
            handleDragStart(e,box)}} 
            className={'min-w-[150px] my-6 mx-6 rounded-[4px] h-auto bg-purple-600 text-center text-[40px] flex items-center justify-center'}>{box}</div>)
    } 

    




        
         
     </div>
   
     <div className='my-4'>
         <Link to="/">

    <button className='font-bold  bg-green-500 w-[150px] hover:bg-green-600 hover:text-gray-200 text-[22px] rounded-[4px] mx-2 my-2 h-[56px] text-white '> Restart</button>
         </Link>
     <button className='my-2 font-bold w-[150px] rounded-[4px] hover:bg-green-600 hover:text-gray-200 mx-4 h-[56px]  bg-green-500 text-[22px] text-white ' onClick={handleReset}>Replay</button>
     </div>
     
     
 </div>
 <div className='my-2 hidden w-[80vw] mx-auto rounded-[20px]  bg-black flex-col items-center justify-center' ref={displayRef}>


 <div className={`font-bold   text-white bg-black h-[15vh] text-[60px] text-center  mx-auto rounded-[8px] w-`} > 　👍 Welcome To The Team</div>
     
 
 <div>

 <Link to="/">
     <button className='my-2 font-bold w-[150px] rounded-[4px] hover:bg-green-600 hover:text-gray-200 mx-4 h-[56px]  bg-green-500 text-[22px] text-white '>Close</button>
 
     
 </Link>
 </div>
 </div>

 </>
  )
}
