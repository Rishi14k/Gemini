import { Children, createContext, useState } from "react";
import run from "../config/gemini"

export const Context = createContext()

const ContextProvider = ({children})=>{

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loding,setLoding] = useState(false);
    const [resultData,setResultData] = useState("");


    const delayPara = (index,nextWord)=>{
        setTimeout(function () {
            setResultData(prev=>prev+nextWord)
        },75*index)
    }
    const newChat = ()=>{
        setLoding(false)
        setShowResult(false)
    }

    const onSent=async (prompt)=>{
        setResultData("")
        setLoding(true)
        setShowResult(true)

        let response;
        if(prompt !== undefined){
            response = await run(prompt)
            setRecentPrompt(prompt)
        }else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }


      
        let responseArray = response.split("**")
        let newArray="";
        for(let i=0;i< responseArray.length;i++){
            if(i == 0 || i%2!==1){
                newArray += responseArray[i]
            }else{
                newArray += "<b>" + responseArray[i] + "</b>"
            }
        }
        let newRespone = newArray.split("*").join("</br>")
        //setResultData(newRespone)
        let newResponeArray = newRespone.split(" ")
        for(let i=0;i<newResponeArray.length;i++){
            const nextWord = newResponeArray[i];
            delayPara(i,nextWord+" ") 
        }
        setLoding(false)
        setInput("")

    }


    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loding,
        resultData,
        input,
        setInput,
        newChat,
        
    }
    return( <Context.Provider value={contextValue}>
        {children}
    </Context.Provider>
    )
}
export default ContextProvider