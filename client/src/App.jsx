

import './App.css'
import Footer from './components/Footer'
import ListingSection from './components/ListingSection'
import NavBar from './components/NavBar'
import "leaflet/dist/leaflet.css";

function App() {


  return (
    <div id='app'>
      <NavBar />
      <ListingSection />
      <Footer />
    </div>

  )
}

export default App
