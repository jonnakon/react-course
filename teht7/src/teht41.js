import {Component, useState} from 'react'

export class ErrorBoundaryForm extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
      }
    
      static getDerivedStateFromError(error) {    
          // Update state so the next render will show the fallback UI.    
          return { hasError: true };  
      }
      componentDidCatch(error, errorInfo) {    
          // You can also log the error to an error reporting service    
          console.log("VIRHE: ", error, errorInfo);  
      }
      render() {
        if (this.state.hasError) {      
            // You can render any custom fallback UI      
            return <h1>Virhe nimessä</h1>;    
        }
        return this.props.children; 
      }
}

export class ErrorBoundaryList extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
      }
    
      static getDerivedStateFromError(error) {    
          // Update state so the next render will show the fallback UI.    
          return { hasError: true };  
      }
      componentDidCatch(error, errorInfo) {    
          // You can also log the error to an error reporting service    
          console.log("VIRHE: ", error, errorInfo);  
      }
      render() {
        if (this.state.hasError) {      
            // You can render any custom fallback UI      
            return <h1>Virhe listalla</h1>;    
        }
        return this.props.children; 
      }
}

const OpiskelijaList = ({opiskelijat, listavirhe, setListavirhe, isLChecked, setIsLChecked}) => {
    const data = opiskelijat.map((opiskelija, i) => <li key={i}>{opiskelija}</li>)

    const handleCheckbox = () => {
        setIsLChecked(!isLChecked);
        setListavirhe(!isLChecked);
      };
    
    return(
        <ErrorBoundaryList>
            <div>
            
            {listavirhe ? 
                <h1>Virhe listalla</h1> : 
                <div>
                    <label>Listavirhe
                        <input type='checkbox' checked={isLChecked} onChange={handleCheckbox}/>
                    </label>
                    <ol>{data}</ol> 
                </div>}
                
            </div>

        </ErrorBoundaryList>
    )
}

const OpiskelijaForm = ({addOpiskelija, nimivirhe, setNimivirhe, isFChecked, setIsFChecked}) => {
    const [nimi, setNimi] = useState('')
    
    const handleAddOpiskelija = () => {
        if(isFChecked){
            setNimivirhe(true)
        }
        if(nimi.length !== 0){
        addOpiskelija(nimi)
        setNimi('')
        }
      }
    return(
        <ErrorBoundaryForm>
        <div>
        {nimivirhe ? (
          <h1>Virhe nimessä</h1>
        ) : (
          <div>
            <label>
              Nimi
              <input type='text' value={nimi} onChange={(e) => setNimi(e.target.value)} />
            </label>
            <label>
              Nimivirhe
              <input type='checkbox' checked={isFChecked} onChange={() => setIsFChecked(!isFChecked)}/>
            </label>
            <button onClick={handleAddOpiskelija}>Lisää</button>
          </div>
        )}
      </div>
        </ErrorBoundaryForm>
    )
}

const Teht41 = () => {

    const [opiskelijat, setOpiskelijat] = useState([])
    const [nimivirhe, setNimivirhe] = useState(false)
    const [listavirhe, setListavirhe] = useState(false)
    const [isFChecked, setIsFChecked] = useState(false)
    const [isLChecked, setIsLChecked] = useState(false)


    const addOpiskelija = (nimi) => {
        setOpiskelijat([...opiskelijat, nimi])
    }

    const handleReset = () => {
        setNimivirhe(false)
        setListavirhe(false)
        setIsFChecked(false)
        setIsLChecked(false)
    }

    return(
    <div>
        <OpiskelijaForm addOpiskelija={addOpiskelija} nimivirhe={nimivirhe} setNimivirhe={setNimivirhe} isFChecked={isFChecked} setIsFChecked={setIsFChecked}/>
        <OpiskelijaList opiskelijat={opiskelijat} listavirhe={listavirhe} setListavirhe={setListavirhe} isLChecked={isLChecked} setIsLChecked={setIsLChecked}/>
        <button onClick={handleReset}>Reset</button>
    </div>
    )

}

export {OpiskelijaForm, OpiskelijaList, Teht41}
