// ProductsListPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';

const ProductsListPage = () => {
  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ProductList />
      <Link to="/adicionar">Adicionar Produto</Link>
    </div>
  );
};

export default ProductsListPage;
