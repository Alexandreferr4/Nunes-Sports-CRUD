import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './EditProduct.css';
import db from '../../firebase';

const EditProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({
    nome: '',
    codigo: '',
    descricao: '',
    preco: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'produtos', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProductData(docSnap.data());
      }
    };

    fetchProduct();
  }, [id]);

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

  const formatPreco = (value) => {
    const numericValue = value.replace(/[^\d,]/g, '');
    return `R$ ${numericValue.includes(',') ? numericValue : `${numericValue},00`}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedPreco = formatPreco(productData.preco);

      const docRef = doc(db, 'produtos', id);
      await updateDoc(docRef, { ...productData, preco: formattedPreco });

      navigate('/');
    } catch (error) {
      console.error('Erro ao atualizar produto: ', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="edit-product-container">
      <h2>Editar Produto</h2>
      <form className="edit-product-form" onSubmit={handleSubmit}>
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
          <button type="submit">Salvar Alterações</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
