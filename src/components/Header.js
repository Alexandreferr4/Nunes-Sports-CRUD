// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header-container">
      <h1>Nunes Sports</h1>
      <nav>
        <ul>
          <li>
            <Link to="/" className="nav-link">Lista de Produtos</Link>
          </li>
          <li>
            <Link to="/add-product" className="nav-link">Adicionar Produto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
