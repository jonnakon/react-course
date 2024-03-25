import { useState } from "react";

const Professional = (props) => {
    const [nimi, setNimi] = useState('')
    const [valittuAmmatti, setvalittuAmmatti] = useState('-1')
    const [taulukko, setTaulukko] = useState([])
    const [tutkinto_suoritettu, setTutkintoSuoritettu] = useState(false)
    const [tutkinto, setTutkinto] = useState('')
    
    const handleInsert = () => {
        setTaulukko([...taulukko, {nimi, koodi:valittuAmmatti, tutkinto_suoritettu, tutkinto}])
        setNimi('')
        setvalittuAmmatti('')
        setTutkintoSuoritettu(false)
        setTutkinto('')
    }

    const handleChange = () => {
        setTutkintoSuoritettu(!tutkinto_suoritettu)
    }


    return(
        <div>
            <label>Nimi
            <input type="text" id="nimi" value={nimi} onChange={(e) => setNimi(e.target.value)}/></label>

            <label>Ammatti
            <select id="ammatit" value={valittuAmmatti} onChange={(e) => setvalittuAmmatti(e.target.value)}>
                {props.ammatit.map((ammatti, index) =>(
                    <option key={index} value={ammatti.koodi}>{ammatti.selite}</option>
                ))}
            </select></label>
            <label>Tutkinto suoritettu:
            <input type="checkbox" checked={tutkinto_suoritettu} onChange={handleChange}/></label>
            {tutkinto_suoritettu &&
                        <label>Tutkinto:
                        <input type="text" id="tutkinto" value={tutkinto} onChange={(e) => setTutkinto(e.target.value)}/></label>
            }
            <button onClick={handleInsert}>Insert</button>
            <Table data={taulukko}/>
        </div>
    )
    

}

const Table = (props) => {

    return(
        <table>
            <thead>
                <tr>
                    <th>Nimi</th>
                    <th>Ammatti</th>
                    <th>Tutkinto suoritettu</th>
                    <th>Tutkinto</th>
                </tr>
            </thead>
            
            <tbody>
                {props.data.map((person, index) =>(
                    <tr key={index}>
                        <td>{person.nimi}</td>
                        <td>{person.koodi}</td>
                        <td>{person.tutkinto_suoritettu ? "Tutkinto suoritettu" : "Ei tutkintoa"}</td>
                        <td>{person.tutkinto}</td>
                    </tr>
                ))}
            </tbody>
            </table>
    )

}

const Teht14 = () => {
    const ammatit = [
        {  
            koodi: -1,
            selite:"Valitse"
            
        },
        {
            koodi: "police",
            selite:"poliisi"
            
        },
        {
            koodi: "baker",
            selite:"leipuri"
            
        },
    ]

    return(
        <div>
            <Professional ammatit={ammatit}/>
         </div>
        )

}

export {Professional, Table, Teht14}