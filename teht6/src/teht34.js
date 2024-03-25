import React, {useState, useContext} from 'react'

const DataContext = React.createContext({})


const StudentForm = () => {
    const dc = useContext(DataContext)
    const [id, setId] = useState('')
    const [nimi, setNimi] = useState('')
    const [aloitusvuosi, setAloitusvuosi] = useState('')

    const [oId, setOid] = useState('')
    const [oNimi, setOnimi] = useState('')
    const [oLaajuus, setOlaajuus] = useState('')

    

    const handleAddStudent = () => {
        const newStudent = {id, nimi, aloitusvuosi}
        dc.setData(newStudent)
        setId('')
        setNimi('')
        setAloitusvuosi('')
    }

    const handleAddOpintojakso = () => {
        const newOpintojakso = { id: oId, nimi: oNimi, laajuus: oLaajuus }
        dc.addOpintojakso(newOpintojakso)
        setOid('');
        setOnimi('');
        setOlaajuus('');
    }

    return(
        <div>
        <div>
            <label>Id
            <input type='text' value={id} onChange={(e) => setId(e.target.value)}/></label>
            <label>Nimi
            <input type='text' value={nimi} onChange={(e) => setNimi(e.target.value)}/></label>
            <label>Aloitusvuosi
            <input type='text' value={aloitusvuosi} onChange={(e) => setAloitusvuosi(e.target.value)}/></label>
            <button onClick={handleAddStudent}>Lisää</button>
        </div>
        <div>
        <label>Oid
            <input type='text' value={oId} onChange={(e) => setOid(e.target.value)}/></label>
        <label>Onimi
            <input type='text' value={oNimi} onChange={(e) => setOnimi(e.target.value)}/></label>
        <label>Olaajuus
            <input type='text' value={oLaajuus} onChange={(e) => setOlaajuus(e.target.value)}/></label>
        <button onClick={handleAddOpintojakso}>Lisää jakso</button>
        <Opintojakso />
        </div>
        </div>
    )

}

const StudentList = () => {

    const dc = useContext(DataContext)
    const students = dc.students

    return(
        <div>
        <table>
            <thead>
                <tr>
                    <td>Nr</td>
                    <td>Name</td>
                    <td>Starting year</td>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <TableRow key={index} {...student} />
                ))}
            </tbody>
        </table>
    </div>
        
    )

}

const TableRow = ({id, nimi, aloitusvuosi}) => {
    const dc = useContext(DataContext)
    const handleRemove = () => {
        dc.removeStudent(id)
    }
    return(
        <tr>
            <td>{id}</td>
            <td>{nimi}</td>
            <td>{aloitusvuosi}</td>
            <td><button onClick={handleRemove}>Poista {id}</button></td>
        </tr>
    )

}

const Opintojakso = () => {
    const dc = useContext(DataContext)
    const opintojaksot = dc.opintojaksot

    return(
        <div>
        <select>
            {opintojaksot.map((opintojakso) => (
                <option key={opintojakso.id} value={`${opintojakso.id},${opintojakso.laajuus}`}>
                    {`${opintojakso.nimi},${opintojakso.laajuus}`}
                </option>
            ))}
        </select>
        </div>
    )
}

const Teht34 = () => {


    const [students, setStudents] = useState([])
    const [opintojaksot, setOpintojaksot] = useState([])

    const setData = (value) => {
        setStudents([...students, value])
    }

    const removeStudent = (id) => {
        setStudents(students.filter((student) => student.id !==id))
    }

    const addOpintojakso = (opintojakso) => {
        setOpintojaksot([...opintojaksot, opintojakso])
    };

    const initState = {
        students,
        setData,
        removeStudent,
        opintojaksot,
        addOpintojakso,
    }


    return(
        <DataContext.Provider value={initState}>
            <div>
                <StudentForm/>
                <StudentList/>
            </div>
        </DataContext.Provider>
    )

}

export {Teht34, StudentForm, StudentList, TableRow, Opintojakso}