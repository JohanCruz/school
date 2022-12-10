import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <div>
            <h2>Students courses 📝</h2>
        <ul>
            <li>
                <Link to="/" >Home</Link>                
            </li>
            <li>
                <Link to="/new" >New student</Link>
            </li>
            <li>
                <Link to="/courses" >Edit courses</Link>
            </li>
        </ul>
        
        </div>  
    
    )    
}

export default Navbar