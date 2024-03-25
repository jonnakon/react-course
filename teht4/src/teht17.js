import {useState, useEffect, useCallback} from 'react'

const Asiakas = () => {

    const [nimi, setNimi] = useState('')
    const [osoite, setOsoite] = useState('')
    const [query, setQuery] = useState('')
    const [asiakkaat, setAsiakkaat] = useState([])
    const [naytaTable, setNaytaTable] = useState(false)
    const [customerType, setAsiakasTyyppi] = useState('')
    const [customerTypes, setAsiakasTyypit] = useState([])
    const [loading, setLoading] = useState(false)
    const [noData, setNoData] = useState(false)
    const [addNew, setAddNew] = useState(false)

    //new customer
    const [newNimi, setNewNimi] = useState('')
    const [newOsoite, setNewOsoite] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newCustomerType, setNewCustomerType] = useState('')

    //edit customer
    const [editNimi, setEditNimi] = useState('')
    const [editOsoite, setEditOsoite] = useState('')
    const [editPhone, setEditPhone] = useState('')
    const [editCustomerType, setEditCustomerType] = useState('')
    const [editId, setEditId] = useState('')


    const fetchCustomers = useCallback(async () => {
        setLoading(true)
        setNoData(false)
        console.log('fetchCustomers')
        let response = await fetch("http://localhost:3004/asiakas?" + query)
        console.log('fetch', response)
        let c = await response.json()
        console.log('asiakkaat', c)
        if(c.length === 0){
            setNoData(true)
            setTimeout(() =>{
                setNoData(false)
            }, 2000)
        }
        else{
            setAsiakkaat(c)
            setNaytaTable(true)
            setNimi('')
            setOsoite('')
            setAsiakasTyyppi('')
        }
        setLoading(false)
    
    },[query])
      

    useEffect(()=>{
        const fetchCustomerTypes = async () => {
            let response = await fetch('http://localhost:3004/asiakastyyppi')
            const tyypit = await response.json()
            setAsiakasTyypit(tyypit)
        }

        fetchCustomerTypes()
    } ,[])

    useEffect(() =>{
        if(query !== '') {
            fetchCustomers()
        }
    }, [query, fetchCustomers])
    
    const handleFetch = () => {
        let a = ""

        if(nimi === "" && osoite === "" && customerType === ""){
            a=" "
        }
        if (nimi !== "") a+= "nimi=" + nimi
        if (osoite !== ""){
            if(a !== "") a += "&"
            a += "osoite=" + osoite
        }

        if(customerType !== ""){
            if(a !=="") a+= "&"
            a += "tyyppi_id=" + customerType
        }
        
        setQuery(a)
    }

    const handleDelete = async (id, nimi) =>{
        const deleting = window.confirm(`Haluatko varmasti poistaa asiakkaan ${nimi}?`)

        if(deleting){
                setLoading(true)
                await fetch('http://localhost:3004/asiakas/' +id, 
                {method: 'DELETE'})
                await fetchCustomers();
                setLoading(false)
            }     
    }

    const handleAddNew = () => {
        setAddNew(true)
    }

    const cancelAdd = () => {
        setAddNew(false)
    }

    const handleEdit = async(id) => {
        setNaytaTable(false)
        setAddNew(false)
        setEditId(id)
        try{
            const response = await fetch('http://localhost:3004/asiakas/' +id)
            if(response.ok){
                const asiakas = await response.json()
                setEditNimi(asiakas.nimi)
                setEditOsoite(asiakas.osoite)
                setEditPhone(asiakas.puhelinnro)
                setEditCustomerType(asiakas.tyyppi_id)
                setEditId(id)
            } else{
                console.log('Error fetching customer', response.status)
            }
        } catch (error){
            console.log('error handleEdit', error)
        }
    }    
    
    const cancelEdit = () => {
        setEditId('')
        setNaytaTable(true)
        setAddNew(false)
    }

    const handleSaveEdit = async (e) => {
        e.preventDefault()
        try{
            await fetch(`http://localhost:3004/asiakas/${editId}`, {
                method: 'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    nimi: editNimi,
                    osoite: editOsoite,
                    puhelinnro: editPhone,
                    tyyppi_id: editCustomerType
                })
            })

            await fetchCustomers()
            setEditId('')
            setNaytaTable(true)
        }
        catch(error){
            console.log('Error handleSaveEdit', error)}
    }

    const handleSaveNew = async(e) => {
        e.preventDefault()

        try{
            await fetch('http://localhost:3004/asiakas', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    nimi: newNimi,
                    osoite: newOsoite,
                    puhelinnro: newPhone,
                    tyyppi_id: newCustomerType
                })
            })

            await fetchCustomers()

            setAddNew(false)
            setNewNimi('')
            setNewOsoite('')
            setNewPhone('')
            setNewCustomerType('')
    }
        catch(error){
            console.log('Error', error)
        }

}

    return(
        <div>
            { !addNew && editId==='' && (
            <div>
            <label>Nimi
                <input type="text" data-testid="nameInput" value={nimi} onChange={(e) => setNimi(e.target.value)}/></label>
            <label>Osoite
                <input type="text" data-testid="addressInput" value={osoite} onChange={(e) => setOsoite(e.target.value)}/></label>
            <label>Asiakastyyppi
                <select data-testid="customertypeSelect" value={customerType}  onChange={(e) => setAsiakasTyyppi(e.target.value)}>
                {customerTypes.map((type) =>(
                    <option key={type.id} data-testid="customertypeOption" value={type.id}>{type.selite}</option>
                ))}
                </select>
            </label>
            <button data-testid="searchButton" onClick={() => handleFetch()}>Hae</button>
            <button data-testid="addButton" onClick={handleAddNew}>Lisää uusi</button></div>
            )}

            {addNew &&(
                <form><label>Nimi
                <input type="text" data-testid="nameEdit" value={newNimi} onChange={(e) => setNewNimi(e.target.value)}/></label>
            <label>Osoite
                <input type="text" data-testid="addressEdit" value={newOsoite} onChange={(e) => setNewOsoite(e.target.value)}/></label>
                <label>Puhelin
                <input type="text" data-testid="phoneEdit" value={newPhone} onChange={(e) => setNewPhone(e.target.value)}/></label>
                <label>Asiakastyyppi
                <select data-testid="customertypeSelectEdit" value={newCustomerType}  onChange={(e) => setNewCustomerType(e.target.value)}>
                {customerTypes.map((type) =>(
                    <option key={type.id} data-testid="customertypeOption" value={type.id}>{type.selite}</option>
                ))}
                </select>
            </label>

            <button data-testid="saveButton" onClick={(e) => handleSaveNew(e)}>Tallenna</button>
            <button data-testid="cancelButton" onClick={cancelAdd} >Peruuta</button>
            <button data-testid="searchButton" onClick={() => handleFetch()}>Hae</button>
            </form>
            )}
            
            {loading && <p data-testid="loading">Loading...</p>}
            {noData && <p data-testid="notFound">Annetuilla hakuehdoilla ei löytynyt dataa</p>}
            
            { !addNew && naytaTable && !loading && !noData &&(
            <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Nimi</th>
                    <th>Osoite</th>
                    <th>Postinumero</th>
                    <th>Postitoimipaikka</th>
                    <th>Puhelinnumero</th>
                    <th>Tyyppi_id</th>
                    <th>Tyyppi_selite</th>
                    <th>Poista</th>
                    <th>Muokkaa</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {asiakkaat.map((asiakas) =>(
                        <tr key={asiakas.id}>
                            <td>{asiakas.id}</td>
                            <td>{asiakas.nimi}</td>
                            <td>{asiakas.osoite}</td>
                            <td>{asiakas.postinumero}</td>
                            <td>{asiakas.postitoimipaikka}</td>
                            <td>{asiakas.puhelinnro}</td>
                            <td>{asiakas.tyyppi_id}</td>
                            <td>{asiakas.tyyppi_selite}</td>
                            <td>
                            <button data-testid="deleteButton" onClick={(e)=>handleDelete(asiakas.id, asiakas.nimi)}>Poista {asiakas.id}</button>
                            </td>
                            <td>
                            <button data-testid="editButton" onClick={() => handleEdit(asiakas.id)}>Muokkaa asiakasta {asiakas.id}</button>
                            </td></tr>
                    ))}
                </tbody>
            </table> )}

            {editId !=='' && (
                <form>
                    <label>Nimi
                        <input type="text" data-testid="nameEdit" value={editNimi} onChange={(e) => setEditNimi(e.target.value)}/></label>
                    <label>Osoite
                        <input type="text" data-testid="addressEdit" value={editOsoite} onChange={(e) => setEditOsoite(e.target.value)}/></label>
                    <label>Puhelin
                        <input type="text" data-testid="phoneEdit" value={editPhone} onChange={(e) => setEditPhone(e.target.value)}/></label>
                    <label>Asiakastyyppi
                        <select data-testid="customertypeSelectEdit" value={editCustomerType}  onChange={(e) => setEditCustomerType(e.target.value)}>
                            {customerTypes.map((type) =>(
                    <option key={type.id} data-testid="customertypeOption" value={type.id}>{type.selite}</option>
                ))}
                </select>
            </label>
            <button data-testid="cancelEditButton" onClick={cancelEdit} >Peruuta muokkaus</button>
            <button data-testid="saveEditButton" onClick={handleSaveEdit}>Tallenna muutos</button>
            </form>
            )}

        </div>

    )

}

export {Asiakas}