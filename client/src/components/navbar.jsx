import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <div>
            <h1>Students courses</h1>
        <ul>
            <li>
                <Link to="/" >Home</Link>                
            </li>
            <li>
                <Link to="/new" >New student</Link>
            </li>
        </ul>
        
        </div>  
    
    )    
}

export default Navbar