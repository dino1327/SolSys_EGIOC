import { BrowserRouter } from "react-router-dom";

import { EarthAnimated, Hero, Navbar, Mbs, StarsCanvas } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <Mbs />
        <div className="relative z-o">
          <EarthAnimated />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
