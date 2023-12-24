import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';
import db from '../../firebase';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    nome: '',
    codigo: '',
    descricao: '',
    preco: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'preco') {
      let numericValue = value.replace(/[^\d,]/g, '');

      const decimalParts = numericValue.split(',');
      if (decimalParts.length > 1) {
        numericValue = `${decimalParts[0]},${decimalParts[1].slice(0, 2)}`;
      }

      setProductData((prevData) => ({ ...prevData, [name]: `R$ ${numericValue}` }));
    } else {
      setProductData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const numericValue = parseFloat(productData.preco.replace(/[^\d,]/g, '').replace(',', '.'));

      if (isNaN(numericValue)) {
        console.error('Formato de preço inválido');
        return;
      }

      const formattedValue = numericValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      });

      await addDoc(collection(db, 'produtos'), { ...productData, preco: formattedValue });
      navigate('/');
    } catch (error) {
      console.error('Erro ao adicionar produto: ', error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Adicionar Produto</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={productData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="codigo">Código:</label>
          <input
            type="text"
            id="codigo"
            name="codigo"
            value={productData.codigo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={productData.descricao}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="preco">Preço:</label>
          <input
            type="text"
            id="preco"
            name="preco"
            value={productData.preco}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit">Adicionar Produto</button>
          <button type="button" onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
