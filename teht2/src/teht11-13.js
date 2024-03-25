import { useState } from "react";

const Error = (props) => {
    const message = []

        if(props.nimi.length < 4){
            message.push('nimi')
        }
        if(props.osoite.length <4){
            message.push('osoite')
        }
        if(props.vuosi.length <4){
            message.push('vuosi')
        }
            if (message.length > 0){
                const error = <p>Virheelliset kentät: {message.join(',')}</p> 

            return error
    }

    return null
}

const ErrorMessage = (props) => {
    return <p style={{color: 'red'}}>{props.message}</p>
}


const ListForm = () => {
  const [persons, setPersons] = useState([])
  const [nimi, setName] = useState('')
  const [osoite, setAddress] = useState('')
  const [vuosi, setBirth] = useState('')
  const [checkError, setCheckError] = useState(false)
  const [nameExist, setNameExist] = useState('')

  const nameChanged = (event) => {
    setName(event.target.value)
  };

  const addressChanged = (event) => {
    setAddress(event.target.value)
  };

  const birthChanged = (event) => {
    setBirth(event.target.value)
  };


  const addPerson = (event) => {
    event.preventDefault()
    setCheckError(true)

    if (nimi.length < 4 || osoite.length <4 || vuosi.length <4){
        return
    } 

    if (persons.some((person)=>person.includes(nimi))){
        setNameExist(`Nimi ${nimi} on jo syötetty`)
        return
    }
    
    else {
        const newPerson = `${nimi},${osoite},${vuosi}`
        setPersons([...persons, newPerson])
        setName('')
        setAddress('')
        setBirth('')
        setCheckError(false)
        setNameExist('')
    }
  };

  return (
    <div>
      <form onSubmit={(e) => addPerson(e)}>
        <label>Nimi:
        <input type="text" name="nimi" value={nimi} onChange={(e) => nameChanged(e)} /></label>
        <label>Osoite:
        <input type="text" name="osoite" value={osoite} onChange={(e) => addressChanged(e)} /></label>
        <label>Syntymävuosi:
        <input type="text" name="vuosi" value={vuosi} onChange={(e) => birthChanged(e)} /></label>
        <button type="submit">Add</button>
      </form>
      {checkError && <Error nimi={nimi} osoite={osoite} vuosi={vuosi} checkError={checkError}/>}
      {nameExist && <ErrorMessage message={nameExist}/>}

      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person}</li>
        ))}
      </ul>
    </div>
  );
};

export { ListForm, Error, ErrorMessage };
