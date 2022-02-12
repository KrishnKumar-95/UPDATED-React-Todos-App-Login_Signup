export const Header = ()=>{
    const headStyle = {
        padding:"5px",
        margin:"1%",
        borderRadius:"15px",
        textAlign: "center"
    }

    const heading = {
        padding: "5px",
        margin: "1%"
    }

    return (
        <div style={headStyle}>
            <h1 style={heading}>My Todos</h1>
        </div>
    )
}