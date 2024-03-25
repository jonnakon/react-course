import { Component } from "react";

class Arvo extends Component{

    render(){

        if(this.props.arvo > 10){
            return(
                <h1 style={{color:'red'}}>Laskuri on {this.props.arvo}</h1>
            )
        }
        else {
            return(
            <h1>Laskuri on {this.props.arvo}</h1>
            )
        }

    }

}

class Laskuri extends Component{
    constructor(props){
        super()
        this.state ={
            arvo: 0 
        }
        this.kasvata = this.kasvata.bind(this)
        this.nollaa = this.nollaa.bind(this)

    }

    kasvata(){
        this.setState((prevState) =>({
            arvo:prevState.arvo + 1}
        ))

    }

    nollaa(){
        this.setState((prevState) =>({
            arvo:0}
        ))
    }

    render(){
        return(
            <div>
                <button onClick={this.kasvata}>kasvata</button>
                <button onClick={this.nollaa}>nollaa</button>
                <Arvo arvo={this.state.arvo}/>

            </div>
        )
    }
}
export {Laskuri, Arvo}