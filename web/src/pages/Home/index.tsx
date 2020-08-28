import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';


const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <h2>StartupLife</h2>
        </header>

        <main>
          <h1>Seu primeiro passo para alavancar a sua ideia.</h1>
          <p>
            Guiamos Startups a encontrarem o caminho certo 
          </p>

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre a sua startup</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
