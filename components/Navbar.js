import {Component} from 'react';
import Link from 'next/link';
// import styles from '../components/Navbar.module.css';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
                <Link href="/"><a className="navbar-brand" >Exercise Tracker</a></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link href='/'><a className="nav-link">Exercise</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/create-exercise'><a className="nav-link"> Create Exercise</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/create-user'><a className="nav-link"> Create User</a></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Navbar;
