import React,{useState} from 'react'
import { Link } from "react-router-dom";
// import Buttons from './Buttons';

export default function Navbar(props) {
    const [i,seti] = useState(0)
    const performTask = () => {
        if(i%2===0){
            seti(1)
            props.setDisplay(1)
        }
        else{
            seti(0)
            props.setDisplay(0)
        }
        
    }
    return (
        <>
            <div>
                <nav className={``}>
                    <div className={`container1 w-full transition-all duration-300 ${props.darkMode?'bg-[#202124] text-[#e1e1e2]':'bg-white text-[#5f6368]'} fixed top-0 py-2 flex`}>
                        <h1 className='font-semibold w-1/4 text-2xl ml-3 p-2'> <Link to='/'>NewsMonkey</Link></h1>
                        <div className='flex space-x-5 w-1/2 items-center justify-center'>
                            <form className='flex'>
                                <div className={`flex transition-all duration-300 ${props.darkMode?'bg-[#3d4043]':'bg-[#f1f3f4]'} items-center justify-center rounded-lg rounded-r-none bg-[#f1f3f4] px-4`}>
                                    <svg className={`${props.darkMode?'fill-[#e1e1e2]':'fill-[#5f6368]'} transition-all duration-300`} focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path><path d="M0,0h24v24H0V0z" fill="none"></path></svg>
                                </div>
                                <input className={`transition-all duration-300 ${props.darkMode?'bg-[#3d4043]':'bg-[#f1f3f4]'} pl-4 outline-none py-3 w-[35rem] rounded-l-none rounded-lg`} placeholder='Search for topics, locations & sources' type="text" name="searchText" id="search" />
                                <button className="dropdown"></button>
                            </form>
                            <svg className={`w-11 h-11 transition-all duration-300 ${props.darkMode?'fill-[#e1e1e2] hover:bg-gray-500':'fill-[#5f6368] hover:bg-[#ededed]'} rounded-full p-2 duration-300 `} viewBox="0 0 24 24" focusable="false"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></svg>
                            <svg onClick={performTask} className={`w-11 h-11 ${props.darkMode?'fill-[#e1e1e2] hover:bg-gray-500':'fill-[#5f6368] hover:bg-[#ededed]'} rounded-full p-2 duration-300`} viewBox="0 0 24 24" focusable="false"><path d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path><circle cx="12" cy="12" r="3.5"></circle></svg>
                            {/* {buttonFlag && <Buttons/>} */}
                        </div>
                        {/* <div className='w-1/4 flex items-center justify-end'>
                        <svg className='w-11 h-11 mr-1 fill-[#5f6368] rounded-full p-2 duration-300 hover:bg-[#ededed]' focusable="false" viewBox="0 0 24 24"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path></svg>
                        </div> */}
                    </div>
                    <div className={`container2 transition-all duration-300 ${props.darkMode?'bg-[#202124] border-[#5e5e5e] text-[#e1e1e2]':'bg-white border-[#e3e3e3] text-[#5f6368]'} w-full top-16 pt-4 bg-white fixed shadow-sm border-b-[1px] pb-3`}>
                        <ul className=' px-60 font-semibold text-sm flex justify-between'>
                            <li className={`${props.darkMode?'hover:text-white':'hover:text-black'} px-2`}><Link to='/'>Home</Link>
                                {/* <div className={`${`w-[4rem]`} h-1 rounded-t-lg bg-blue-600 relative top-3`}></div> */}
                            </li>
                            <li className={`${props.darkMode?'hover:text-white':'hover:text-black'} px-2`}><Link to='/newsShowcase'>News Showcase</Link>
                            </li>
                            <li className={`${props.darkMode?'hover:text-white':'hover:text-black'} px-2`}><Link to='/india'>India</Link></li>
                            <li className={`${props.darkMode?'hover:text-white':'hover:text-black'} px-2`}><Link to='/world'>World</Link></li>
                            <li className={`${props.darkMode?'hover:text-white':'hover:text-black'} px-2`}><Link to='/local'>Local</Link></li>
                            <li className={`${props.darkMode?'hover:text-white':'hover:text-black'} px-2`}><Link to='/business'>Business</Link></li>
                            <li className={`${props.darkMode?'hover:text-white':'hover:text-black'} px-2`}><Link to='/technology'>Technology</Link></li>
                            <li className={`${props.darkMode?'hover:text-white':'hover:text-black'} px-2`}><Link to='/entertainment'>Entertainment</Link></li>
                            <li className={`${props.darkMode?'hover:text-white':'hover:text-black'} px-2`}><Link to='/sports'>Sports</Link></li>
                            <li className={`${props.darkMode?'hover:text-white':'hover:text-black'} px-2`}><Link to='/science'>Science</Link></li>
                            <li className={`${props.darkMode?'hover:text-white':'hover:text-black'} px-2`}><Link to='/health'>Health</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}









