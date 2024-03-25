import { useState } from "react"

const Arvo = (props) => {

    if(props.arvo > 10){
        return(
        <h1 style={{color:'red'}}>Laskuri on {props.arvo}</h1>
        )
    }
    else {
        return(
        <h1>Laskuri on {props.arvo}</h1>)
    }
}

const Laskuri = () => {

    const [arvo, asetaArvo] = useState(0)

    const kasvata = () => {
        asetaArvo(arvo +1)
    }

    const nollaa = () => {
        asetaArvo(0)
    }


    return(
        <div>
            <button onClick={() => kasvata()}>Kasvata</button>
            <button onClick={() => nollaa()}>Nollaa</button>
            <Arvo arvo={arvo}/>
        </div>
    )
}

export {Laskuri, Arvo}