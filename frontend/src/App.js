import React from 'react'
import { Container } from 'react-bootstrap'

import Routes from './config/routes'
import Header from './components/Header'
import Footer from './components/Footer'
import ZaloChatWidget from './components/ZaloChatWidget'
function App() {
  return (
    <div className="App">
      <Header />
      <main className="py-3">
        <Container>
          <Routes/>
        </Container>
      </main>
      <ZaloChatWidget />
      <Footer />
    </div>

  );
}

export default App;
