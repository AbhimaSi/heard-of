import { useState } from 'react'


//import 'Header.css'
import SearchBar from './SearchBar.jsx'


function Header() {

    return <header className="hbox" id="header">
        <h1>HeardOf</h1>
        <SearchBar/>
        <a href="#Footer">About</a>
    </header>
}

export default Header
