import { useState } from "react";

const Lomake = () => {

    const [joukkueet, setJoukkueet] = useState([])
    const [joukkue, setJoukkue] = useState('')
    const [kotipaikka, setKotipaikka] = useState('')
    const [valmentaja, setValmentaja] = useState('')
    const [id, setId] = useState(1)
    const [editId, setEditId] = useState(null)

    const valmentajat = ["Pekka", "Tiina", "Kaisa", "Matti"]

    const handleInsert = () => {
        const uusiJoukkue ={
            joukkue,
            kotipaikka,
            valmentaja,
            id
        }
        setJoukkueet([...joukkueet, uusiJoukkue])
        setJoukkue('')
        setKotipaikka('')
        setValmentaja('')
        setId(id+1)
    }

    const handleDelete = (id) => {
        const uudetJoukkueet = joukkueet.filter((joukkue) => joukkue.id !== id)
        setJoukkueet(uudetJoukkueet)
    }

    const handleUpdate = (id) => {
        setEditId(id)
        const updatejoukkue = joukkueet.find((joukkue) => joukkue.id === id)
        setJoukkue(updatejoukkue.joukkue)
        setKotipaikka(updatejoukkue.kotipaikka)
        setValmentaja(updatejoukkue.valmentaja)
    }

    const handleSave = () => {
        const updatedJoukkueet = joukkueet.map((j) => 
            j.id === editId ? {...j, joukkue, kotipaikka, valmentaja}: j)
        setJoukkueet(updatedJoukkueet)
        setJoukkue('')
        setKotipaikka('')
        setValmentaja('')
        setId(id+1)
        setEditId(null)
    }

    return(
        <div>
            <label>Joukkue
                <input type="text" data-testid="joukkue" value={joukkue} onChange={(e) => setJoukkue(e.target.value)}/></label>
            <label>Kotipaikka
                <input type="text" data-testid="kotipaikka" value={kotipaikka} onChange={(e) => setKotipaikka(e.target.value)}/></label>
            <label>Valmentaja
            <Valmentaja data={valmentajat} valueSelected={setValmentaja}/></label>
            <button data-testid={editId !== null ? "tallenna" : "lisaa"} 
                    onClick={editId!== null ? handleSave : handleInsert}>
                    {editId !== null ? "Tallenna" : "Lisää"}
            </button>
            
            <Joukkueet joukkueet={joukkueet} onDelete={handleDelete} onChange={handleUpdate}/>
            
         
        </div>
    )
}

const Valmentaja = (props) => {
    return(            
        <select data-testid="valmentajaSelect"  onChange={(e) => props.valueSelected(e.target.value)}>
            {props.data.map((valmentaja, index) =>(
                <option key={index} data-testid="valmentajaOption" value={valmentaja}>{valmentaja}</option>
            ))}
        </select>
        )

}

const Joukkueet = (props) => {

    const handleDelete = (id) => {
        props.onDelete(id)
    }

    const handleUpdate = (id) => {
        props.onChange(id)
    }

    return(
        <table>
            <thead>
                <tr>
                    <th>Joukkue</th>
                    <th>Kotipaikka</th>
                    <th>Valmentaja</th>
                    <th>ID</th>
                </tr>
            </thead>
            <tbody>
                {props.joukkueet.map((joukkue) =>(
                    <tr key={joukkue.id}>
                        <td>{joukkue.joukkue}</td>
                        <td>{joukkue.kotipaikka}</td>
                        <td>{joukkue.valmentaja}</td>
                        <td>{joukkue.id}</td>
                        <td>
                            {props.onDelete && 
                            (<button data-testid="poista"
                                    onClick={()=>handleDelete(joukkue.id)}>Poista</button>)}
                        </td>
                        <td>
                            {props.onChange && 
                            (<button data-testid="muuta"
                                    onClick={()=>handleUpdate(joukkue.id)}>Muuta</button>)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

}

export {Lomake, Valmentaja, Joukkueet}
