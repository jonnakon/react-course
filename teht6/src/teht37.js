import React, {useState} from 'react'
import { createStore } from "redux";
import { useDispatch, useSelector } from "react-redux";


const ADD_OPINTOJAKSO = "ADD_OPINTOJAKSO"
const DELETE_STUDENT = "DELETE_STUDENT"
const ADD_STUDENT = "ADD_STUDENT"

const initialState = {
    opintojaksot: [],
    students: []
  };

function rootReducer(state = initialState, action) {
    if (action.type === ADD_OPINTOJAKSO) {
        return Object.assign({}, state, {opintojaksot: state.opintojaksot.concat(action.payload)} );
    }
    else if (action.type === DELETE_STUDENT)
    {
        return Object.assign({}, state, {students: state.students.filter(a => a.id !== action.payload.id)} );
    }
    else if (action.type === ADD_STUDENT) {
        return Object.assign({}, state, {students: state.students.concat(action.payload)} );
    }

    return state; 
}

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


function addOpintojakso(payload) {
    return { type: ADD_OPINTOJAKSO, payload }
  };

function deleteStudent(payload) {
    console.log("deleteArticle : ", payload);
    return { type: DELETE_STUDENT, payload : payload }
  };

function addStudent(payload) {
    return { type: ADD_STUDENT, payload }
};



const StudentForm = () => {
    const [id, setId] = useState('')
    const [nimi, setNimi] = useState('')
    const [aloitusvuosi, setAloitusvuosi] = useState('')
    const dispatch = useDispatch()

    const [oId, setOid] = useState('')
    const [oNimi, setOnimi] = useState('')
    const [oLaajuus, setOlaajuus] = useState('')

    

    const handleAddStudent = () => {
        dispatch(addStudent({id, nimi, aloitusvuosi}))
        setId('')
        setNimi('')
        setAloitusvuosi('')
    }

    const handleAddOpintojakso = () => {
        dispatch(addOpintojakso({ id: oId, nimi: oNimi, laajuus: oLaajuus }))
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
    const students = useSelector(state=>state.students)


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
    const dispatch = useDispatch()

    const handleRemove = () => {
        dispatch(deleteStudent({id}))
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
    const opintojaksot = useSelector(state=>state.opintojaksot)

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

const Teht37 = () => {

    return(
            <div>
                <StudentForm/>
                <StudentList/>
            </div>
    )

}

export {Teht37, StudentForm, StudentList, TableRow, Opintojakso}