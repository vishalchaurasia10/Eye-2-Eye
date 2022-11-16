import React,{useState} from 'react'
import github from './assets/github.png'
import linkedin from './assets/linkedin.png'
import twitter from './assets/twitter.png'

function Buttons(props) {
    const [mode,setMode] = useState(0)
    const changeMode = () => {
        if(mode%2===0){
            setMode(1)
            props.setDarkMode(1)
        }
        else{
            setMode(0)
            props.setDarkMode(0)
        }
    }
  return (
    <div className={`${props.darkMode?'bg-[#686868]':'bg-white shadow-black'} transition-all duration-300 ${props.display?'scale-100':'scale-0'} w-20 h-48 top-[4.3rem] lg:right-[21rem] right-[1px] flex  flex-col rounded-2xl fixed shadow-2xl`}>
    <div>
      <input onClick={changeMode} className='h-[1.7rem] w-10 top-[16.3px] left-[1.2rem] relative appearance-none bg-white border border-black rounded-full' type="checkbox" name="" id="" />
      <div onClick={changeMode} className={`switch transition-all top-[-14px] ${mode?'left-[34px]':'left-[22px]'} duration-300 relative bg-black h-[1.35rem] w-[1.35rem] rounded-full `}></div>
    </div>
    <div className="links fixed">
        <a target='_blank' href="https://twitter.com/vishalstwt" rel="noreferrer"><img className='w-6 top-[60px] left-[28px] hover:scale-150 transition-all duration-300 relative' src={twitter} alt="twitter" /></a>
        <a target='_blank' href="https://github.com/vishalchaurasia10" rel="noreferrer"><img className='w-6 top-[78px] left-[28px] hover:scale-150 transition-all duration-300 relative' src={github} alt="github" /></a>
        <a target='_blank' href="https://in.linkedin.com/in/vishal-chaurasia-9a421022a?trk=public_profile_samename-profile" rel="noreferrer"><img className='w-6 hover:scale-150 top-[100px] left-[28px] transition-all duration-300 relative' src={linkedin} alt="linkedin" /></a>
    </div>
    </div>
  )
}

export default Buttons
