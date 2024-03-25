import { useState } from "react"

const Lista = () => {
    const opiskelijat = [
        {
            etunimi: "Matti" ,
            sukunimi: "Mattila",
            aloitusvuosi: 2020 
        },
        {
            etunimi: "Mikko",
            sukunimi: "Mikkola" ,
            aloitusvuosi: 2021
        },
        {
            etunimi: "Maija",
            sukunimi: "Maijala",
            aloitusvuosi: 2023
        },
        {  
            etunimi: "Kalle",
            sukunimi: "Kallela",
            aloitusvuosi: 2022
        },
    ]

    return(
        <ul>
            {opiskelijat.map((opiskelija, index)=>(
                <Rivi key={index} etunimi={opiskelija.etunimi} sukunimi={opiskelija.sukunimi} aloitusvuosi={opiskelija.aloitusvuosi}/>
            ))}
        </ul>
    )
}

const Rivi = (props) => {

    return(
        <li>{props.etunimi}, {props.sukunimi}, {props.aloitusvuosi}</li>
    )
}

const Taulukko = (props) => {
    return(
    <table>
        <Otsikko otsikot={props.otsikot}/>
        <TauluRivi rivit={props.data}/>
    </table>)
}

const Otsikko = (props) => {
    const data = Object.keys(props.otsikot).map((otsikko, index) =>{
        return(<th key={index}>{otsikko}</th>)})
    return(
        <thead>
            <tr>{data}</tr>
        </thead>
    )

}

const TauluRivi = (props) => {
    return(
    <tbody>
        {props.rivit.map((rivi, index) =>(
        <tr key={index}>
            <td>{rivi.nimi}</td>
            <td>{rivi.osoite}</td>
            <td>{rivi.aloitusvuosi}</td>
        </tr>
    ))}</tbody>
    )
}

const Teht6 = () =>{

    const otsikot = {nimi:"nimi", osoite:"osoite", aloitusvuosi: "aloitusvuosi"}
    const headers = {name:"name", address:"address", start_year: "start year"}
    const [naytaTaulukot, asetaNaytaTaulukot] = useState(true)

    const togglePiilota = () => {
        asetaNaytaTaulukot(!naytaTaulukot)
    }
    const data = [
        {
            nimi:"Matti Mattila", 
            osoite:"Osoite 1", 
            aloitusvuosi: 2020
        },
        {
            nimi:"Maija Maijala", 
            osoite:"Osoite 2", 
            aloitusvuosi: 2022
        },
        {
            nimi:"Mikko Mikkola", 
            osoite:"Osoite 3", 
            aloitusvuosi: 2021
        },
        {
            nimi:"Kalle Kallela", 
            osoite:"Osoite 4", 
            aloitusvuosi: 2019
        },
        {
            nimi:"Paavo Paavola", 
            osoite:"Osoite 5", 
            aloitusvuosi: 2023
        },
]
    return(
        <div>
            <button onClick={togglePiilota}>{naytaTaulukot ? 'Piilota' : 'Näytä'}</button>
            { naytaTaulukot && <div>
            <Taulukko otsikot={otsikot} data={data}/>
            <Taulukko otsikot={headers} data={data}/></div>}
        </div>
    )
}
 
export{Lista, Otsikko, Taulukko, TauluRivi, Rivi, Teht6}