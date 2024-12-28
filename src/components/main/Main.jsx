import "./Main.css"
import {assets} from "../../assets/assets"
import { useContext } from "react"
import { Context } from "../../context/Context"

function Main(){

    const {onSent,recentPrompt,showResult,loding,resultData,setInput,input} = useContext(Context)


    return(<div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="profile" />
        </div>
        <div className="main-con">
            {!showResult ? <>
                <div className="greet">
                <p><span>Hello, Rishi.</span></p>
                <p>How can i help you today...?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful place to see on upcoming road trip.</p>
                    <img src={assets.compass_icon} alt="" />
                </div>

                <div className="card">
                    <p>Brifly summarize this concept: urban planning.</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>

                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat.</p>
                    <img src={assets.message_icon} alt="" />
                </div>

                
                <div className="card">
                    <p>Improve the readability of the folling code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </> : <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="icon" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="icon" />
                        {loding ? <div className="loder">
                            <hr />
                            <hr />
                            <hr />
                        </div> :          <p dangerouslySetInnerHTML={{__html:resultData}}></p>}
               
                    </div>
                </div>}
            

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Message GEMINI"/>

                    <div>
                        <img src={assets.gallery_icon} alt="icon" />
                        <img src={assets.mic_icon} alt="icon" />
                        {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="icon" /> : null}
                    </div>
                </div>
                <p className="bottom-text">
                    Gemini may display inaccurate info,including people,so double-check it's responses.
                </p>
            </div>
        </div>
    </div>)
}
export default Main