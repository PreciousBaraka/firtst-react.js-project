import React, { useState } from 'react'
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import Hero from '../components/Hero';
import Features from '../components/Features';

function Home() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
  
    return (
      <div>
        <Hero setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
        <Features />
        {showLogin && <LoginModal setShowLogin={setShowLogin} />}
        {showSignup && <SignupModal setShowSignup={setShowSignup} />}
      </div>
    );
}

export default Home
