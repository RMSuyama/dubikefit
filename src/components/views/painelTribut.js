import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './painelTribut.css';

const PainelTribut = () => {
  const [atletas, setAtletas] = useState([]);
  const [form, setForm] = useState({ Nome: '', Email: '', Telefone: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const API_URL = 'https://docs.google.com/spreadsheets/d/1SPvd63K810RLSKCwMvd0_nLfF3jw4LrRroAptQay9L8/edit?usp=sharing'; // Substitua pela URL do seu Apps Script

  useEffect(() => {
    fetchAtletas();
  }, []);

  const fetchAtletas = async () => {
    try {
      const res = await axios.get(API_URL);
      setAtletas(res.data);
    } catch (error) {
      console.error('Erro ao buscar atletas:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editIndex !== null) {
        // Simulação de edição (em planilha, você teria que implementar via ID/linha no backend)
        const novosAtletas = [...atletas];
        novosAtletas[editIndex] = form;
        setAtletas(novosAtletas);
        setMensagem('Atleta editado com sucesso!');
      } else {
        await axios.post(API_URL, form);
        setMensagem('Atleta cadastrado com sucesso!');
        fetchAtletas(); // Atualiza a lista
      }

      setForm({ Nome: '', Email: '', Telefone: '' });
      setEditIndex(null);
    } catch (error) {
      setMensagem('Erro ao salvar atleta.');
      console.error(error);
    }
  };

  const handleEdit = (index) => {
    setForm(atletas[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('Tem certeza que deseja excluir este atleta?')) {
      const novosAtletas = atletas.filter((_, i) => i !== index);
      setAtletas(novosAtletas);
      setMensagem('Atleta removido (visualmente).'); 
      // OBS: precisa implementar exclusão real no backend/planilha
    }
  };

  return (
    <div className="container py-4">
      <h3>Painel de Atletas</h3>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              name="Nome"
              placeholder="Nome"
              value={form.Nome}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              name="Email"
              placeholder="Email"
              value={form.Email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              name="Telefone"
              placeholder="Telefone"
              value={form.Telefone}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-1 d-grid">
            <button type="submit" className="btn btn-success">
              {editIndex !== null ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </div>
      </form>

      {/* Mensagem */}
      {mensagem && <div className="alert alert-info">{mensagem}</div>}

      {/* Tabela de atletas */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {atletas.length === 0 ? (
              <tr><td colSpan="4" className="text-center">Nenhum atleta encontrado.</td></tr>
            ) : (
              atletas.map((atleta, i) => (
                <tr key={i}>
                  <td>{atleta.Nome}</td>
                  <td>{atleta.Email}</td>
                  <td>{atleta.Telefone}</td>
                  <td>
                    <button onClick={() => handleEdit(i)} className="btn btn-sm btn-warning me-2">Editar</button>
                    <button onClick={() => handleDelete(i)} className="btn btn-sm btn-danger">Excluir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PainelTribut;
