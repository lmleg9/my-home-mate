

import './App.css'
import FilterSection from './components/FilterSection'
import Footer from './components/Footer'
import ListingSection from './components/ListingSection'
import NavBar from './components/navBar'

function App() {


  return (
    <div id='app'>
      <NavBar />
      <FilterSection />
      <ListingSection />
      <Footer />
    </div>

  )
}

export default App
