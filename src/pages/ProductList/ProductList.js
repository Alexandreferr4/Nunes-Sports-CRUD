import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, where, startAfter, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';
import db from '../../firebase';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      // Crie uma consulta base
      let productsQuery = collection(db, 'produtos');

      // Adicione a condição de pesquisa se houver um termo de pesquisa
      if (searchTerm) {
        productsQuery = query(productsQuery, where('nome', '==', searchTerm));
      }

      // Execute a consulta e obtenha os dados
      const querySnapshot = await getDocs(productsQuery);
      const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    };

    fetchProducts();
  }, [searchTerm]);

  const handleDelete = async (productId, productName) => {
    const confirmDelete = window.confirm(`Deseja realmente excluir o produto "${productName}"?`);

    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'produtos', productId));
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error('Erro ao excluir produto: ', error);
      }
    }
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="product-list-container">
      <h2>Lista de Produtos</h2>
      {/* Adicione um campo de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar produto por nome"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="product-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Código</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.nome}</td>
              <td>{product.codigo}</td>
              <td>{product.descricao}</td>
              <td>{product.preco}</td>
              <td className="product-actions">
                <button className='botaoeditar' onClick={() => handleEdit(product.id)}>Editar</button>
                <button className='botaoexcluir' onClick={() => handleDelete(product.id, product.nome)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
