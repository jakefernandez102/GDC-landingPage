/* eslint-disable react/prop-types */

import { useState } from "react";


const ChatButton = ({showChat,setShowChat}) => {
  return (
    <button
        type='button' 
        className='fixed cursor-pointer bottom-10 right-10 w-8 h-8 bg-purple-cus rounded-full flex justify-center items-center'
        onClick={() => setShowChat(!showChat)}    
    >
        {
            showChat ?
            <p className='text-white font-bold'>X</p>: 
            <p className='text-white font-bold'>^</p> 
        }
        
    </button>
  )
}

export default ChatButton