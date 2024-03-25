import {React, useEffect, useState} from 'react'
import {Link, Routes, Route, useNavigate, useLocation, useParams} from 'react-router-dom'
import './styles.css'

const Koti = () => {
    return(
    <div>
        <p>Savonia AMK</p>
        <Aika/>
    </div>
    )

}

const Aika = () => {
    const [currentDate, setCurrentDate] = useState(new Date())

    const getTime = (hours) => {
        if((hours >= 6 && hours < 14) || (hours >= 0 && hours < 6)){
            return 'aamupäivä'
        }
        if (hours >= 14 && hours < 24){
            return 'iltapäivä'
        }
    }

    const dateString = `${currentDate.getDate()}.${currentDate.getMonth()+1}.${currentDate.getFullYear()}`
    const hours = currentDate.getHours()
    console.log(hours)
    const getTimeDay = getTime(hours)

    return(
        <div>
            <p>{dateString} {getTimeDay}</p>
        </div>
    )
}

const Autot = () => {

    const [cars, setCars] = useState([])


    useEffect(() => {
        
        const fetchCars = async() => {
        let response = await fetch('http://localhost:3004/autot')
        let a = await response.json()
        setCars(a)
        }
        fetchCars()
    }, [])
    

    return(
        <ol>
            {cars.map((car, index)=> (
                <li key={index}><Link to={`/autot/${car.Merkki}/${car.Malli}`}>{car.Merkki},{car.Malli}</Link></li>))}
        </ol>
    )
}

const Details = () => {

    let {Merkki, Malli} = useParams()

    return(
        <h6 data-testid='details'>{Merkki},{Malli}</h6>
    )
}

const Kirjaudu = ({onLogin}) => {

    const [etunimi, setEtunimi] = useState('')
    const [henkiloNumero, sethenkiloNumero] = useState('')

    const handleLogin = () => {
        if(etunimi && henkiloNumero){
            onLogin({etunimi, henkiloNumero})
        }
    }

    return(
        <div>
            <label>Etunimi:
                <input type='text' value={etunimi} onChange={(e) => setEtunimi(e.target.value)}/>
            </label>
            <label>Henkilönumero:
                <input type='text' value={henkiloNumero} onChange={(e) => sethenkiloNumero(e.target.value)}/>
            </label>
            <button onClick={handleLogin}>Kirjaudu</button>
        </div>
    )

}

const Error = ({path}) => {
    let navigate = useNavigate()

    const kotisivulle = () => {
        navigate('/koti')
    }

    return (
        <div>
        <h4>Yritit navigoida sivulle: {path}</h4>
        <button onClick={kotisivulle}>Koti-sivulle</button>
        </div>
    )
}


const Spa = () => {

    const [user, setUser] = useState(null)
    const location = useLocation();

    const loginDone = (loggedUser) => {setUser(loggedUser)}

    const linkStyle = {
        textDecoration: 'none',
        padding: '20px',
        height: '100px',
        fontSize: '20px',
    }

    return(
        <div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Link to='/koti' style={linkStyle}>Koti</Link>
                <Link to='/autot' style={linkStyle}>Autot</Link>
            </div>
        
            <Routes>
                <Route path='/koti' element={<Koti/>}/>
                <Route path='autot/:Merkki/:Malli' element={<Details />} />
                <Route path='/autot/' element={user?<Autot/> : (<Kirjaudu onLogin ={(user) => loginDone(user)}/>)}/>
                <Route path='*' element={<Error path={location.pathname}/>}/>
                </Routes>
            {user && <h3>{`${user.etunimi},${user.henkiloNumero}`}</h3>}
        </div>

    )
}

export {Spa, Koti, Aika, Autot, Kirjaudu, Error, Details}


