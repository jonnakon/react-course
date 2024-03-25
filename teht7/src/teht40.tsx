import React, { useState} from 'react';


const ListForm = () => {
    const [persons, setPersons] = useState<string[]>([])
    const [nimi, setNimi] = useState<string>('')
    const [osoite, setOsoite] = useState<string>('')
    const [vuosi, setVuosi] = useState<string>('')
    const [checkError, setCheckError] = useState<boolean>(false)
    const [nameExist, setNameExist] = useState<string>('')

    const nameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNimi(event.target.value)
      };
    
      const addressChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOsoite(event.target.value)
      };
    
      const birthChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVuosi(event.target.value)
      };

    const addPerson = (event: React.FormEvent<HTMLFormElement>) => {
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
        const newPerson: string = `${nimi},${osoite},${vuosi}`
        setPersons([...persons, newPerson])
        setNimi('')
        setOsoite('')
        setVuosi('')
        setCheckError(false)
        setNameExist('')
    }
    }

    const data = persons.map((person,i) => <li key={i}>{person}</li>)

    return(
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
        {checkError && <Error nimi={nimi} osoite={osoite} vuosi={vuosi}/>}
        {nameExist && <ErrorMessage message={nameExist}/>}

        <ul>{data}</ul>
        </div>

    )
}

const Error = ({nimi, osoite, vuosi}) => {
    const message:string[] = []

        if(nimi.length < 4){
            message.push('nimi')
        }
        if(osoite.length <4){
            message.push('osoite')
        }
        if(vuosi.length <4){
            message.push('vuosi')
        }
        if (message.length > 0){
            const error = <p>Virheelliset kentät: {message.join(',')}</p> 

        return error
    }

    return null
}

const ErrorMessage = ({message}) => {
    return <p style={{color: 'red'}}>{message}</p>
}

export {ListForm, Error, ErrorMessage}