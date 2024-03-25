import { useState } from "react"

const Cars = () => {

    const [cars, setCars] = useState([])
    const [newCar, setNewCar] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        addCar()
    }

    const addCar = () => {
        setCars([...cars, newCar])
        setNewCar('')
        
    }

    return(
        <div>
            <input type="text" value={newCar} onChange={(e)=>setNewCar(e.target.value)}/>
            <button onClick={(e) =>handleSubmit(e)}>Save</button>
            <Info count={cars.length}/>
            <List cars={cars}/>
        </div>
    )
}


const List = (props) =>{
    const list = props.cars.map((car, i) =>{
        return <li key={i}>{car}</li>
    })

    return (
    <div>
        <ul>{list}</ul>
    </div>
        )
}

const Info = (props) => {
    const info = props.count >= 5 ? <h2>Ainakin 5 nimeä on jo syötetty</h2> : null

    return info

}

export {List, Cars, Info}