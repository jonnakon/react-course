import { useState } from "react"
import styled from 'styled-components'

const Add = styled.button`
    border: 3px solid red;
    background: grey;`

const Counter = styled.h1`
    color: ${props=>props.$Big ? 'red': 'blue'};
    font-size: 10px;`

const Reset = styled.button`
    background: orange;
    font-style: italic;`

const MyCounter = () => {

    const [arvo, setArvo] = useState(0)

    const handleCounter = () => {
        setArvo(arvo+1)
    }

    const handleReset = () => {
        setArvo(0)
    }

    return(
        <div>
            <Add onClick={handleCounter}>Add</Add>
            <Reset onClick={handleReset}>Reset</Reset>
            <Counter $Big={arvo >5}>Counter is {arvo}</Counter>
        </div>
    )

}

export {MyCounter}