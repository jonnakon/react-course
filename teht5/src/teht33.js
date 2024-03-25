const Header = () => {
    const headerStyle = {
        border: '1px solid blue',
        textAlign: 'center',
        margin: 10
        
    }
    return(
        <div style={headerStyle}>
        <h1>Welcome to main page of Savonia AMK</h1>
        </div>
    )
}
const Footer = () => {
    const footerStyle = {
        border: '1px solid green',
        textAlign: 'center',
        margin: 10
        
    }
    return(
        <div style={footerStyle}>
            <h2>Copyright by ktkoiju@Savonia</h2>
        </div>
    )
}
const LeftSide = () => {
    const sideStyle = {
        width:200,
        height: 250,
        border: '1px solid red',
        margin: 10
    }
    return(
        <div style={sideStyle}>
            <p>Please log in</p>
        </div>
    )
}
const Center = () => {
    const centerStyle = {
        width:800,
        height: 250,
        border: '1px solid red',
        margin: 10
    }
    return(
        <div style={centerStyle}>
        <p>Introduction of our company/</p>
        </div>
    )
}
const RightSide = () => {
    const sideStyle = {
        width:200,
        height: 250,
        border: '1px solid red',
        margin: 10
    }
    return(
        <div style={sideStyle}>
        <p>Lot's of info about our company</p>
        </div>
    )
}
const Teht33 = () => {
    return(
        <div>
            <Header/>
            <div style={{display: 'flex'}}>
                <LeftSide/>
                <Center/>
                <RightSide/>
            </div>
            <Footer/>
        </div>
    )
}

export {Header, Footer, LeftSide, Center, RightSide, Teht33}