import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const GerenciamentoAtletas = () => {
  // Estados para controle de formulários e dados
  const [atletas, setAtletas] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [atletaAtual, setAtletaAtual] = useState(null);
  const [visuAtual, setVisuAtual] = useState('lista'); // 'lista', 'form', 'detalhes'
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  
  // Simulação de dados iniciais - em produção substituir por chamada API
  useEffect(() => {
    const dadosIniciais = [
      {
        id: 1,
        nome: "Carlos Pereira",
        documento: "123.456.789-00",
        dataNascimento: "1985-06-15",
        email: "carlos@email.com",
        telefone: "(11) 99123-4567",
        endereco: {
          logradouro: "Rua das Bicicletas, 123",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01234-567"
        },
        anamnese: "Histórico de tendinite no joelho direito tratada há 2 anos. Sem restrições atuais.",
        relatoDor: "Dor leve na lombar após pedalar mais de 80km",
        rotinaAtividades: "Pedala 3x por semana, cerca de 50km por treino. Academia 2x por semana.",
        antropometria: {
          altura: 178,
          peso: 72,
          envergadura: 181,
          comprimentoBraco: 65,
          comprimentoPerna: 89,
          comprimentoFemur: 44,
          comprimentoTibia: 43,
          entrepernas: 83
        },
        ultimaAvaliacao: "2025-03-10"
      },
      {
        id: 2,
        nome: "Ana Silva",
        documento: "987.654.321-00",
        dataNascimento: "1990-12-03",
        email: "ana@email.com",
        telefone: "(11) 98765-4321",
        endereco: {
          logradouro: "Av. Ciclismo, 456",
          cidade: "São Paulo",
          estado: "SP",
          cep: "04567-890"
        },
        anamnese: "Sem histórico de lesões. Leve escoliose diagnosticada na infância.",
        relatoDor: "Dormência ocasional nas mãos após pedalar longas distâncias",
        rotinaAtividades: "Pedala 4x por semana, triatlo amador, natação 2x por semana",
        antropometria: {
          altura: 165,
          peso: 58,
          envergadura: 163,
          comprimentoBraco: 60,
          comprimentoPerna: 82,
          comprimentoFemur: 40,
          comprimentoTibia: 39,
          entrepernas: 77
        },
        ultimaAvaliacao: "2025-02-22"
      }
    ];
    
    setAtletas(dadosIniciais);
  }, []);

  // Função para preencher o formulário na edição
  const preencherFormulario = (atleta) => {
    setAtletaAtual(atleta);
    setModoEdicao(true);
    setVisuAtual('form');
    
    // Preencher campos do formulário
    setValue("nome", atleta.nome);
    setValue("documento", atleta.documento);
    setValue("dataNascimento", atleta.dataNascimento);
    setValue("email", atleta.email);
    setValue("telefone", atleta.telefone);
    setValue("logradouro", atleta.endereco.logradouro);
    setValue("cidade", atleta.endereco.cidade);
    setValue("estado", atleta.endereco.estado);
    setValue("cep", atleta.endereco.cep);
    setValue("anamnese", atleta.anamnese);
    setValue("relatoDor", atleta.relatoDor);
    setValue("rotinaAtividades", atleta.rotinaAtividades);
    setValue("altura", atleta.antropometria.altura);
    setValue("peso", atleta.antropometria.peso);
    setValue("envergadura", atleta.antropometria.envergadura);
    setValue("comprimentoBraco", atleta.antropometria.comprimentoBraco);
    setValue("comprimentoPerna", atleta.antropometria.comprimentoPerna);
    setValue("comprimentoFemur", atleta.antropometria.comprimentoFemur);
    setValue("comprimentoTibia", atleta.antropometria.comprimentoTibia);
    setValue("entrepernas", atleta.antropometria.entrepernas);
  };

  // Função para lidar com o envio do formulário
  const onSubmit = (data) => {
    if (modoEdicao) {
      // Editar atleta existente
      const atletasAtualizados = atletas.map(atleta => 
        atleta.id === atletaAtual.id ? {
          ...atleta,
          nome: data.nome,
          documento: data.documento,
          dataNascimento: data.dataNascimento,
          email: data.email,
          telefone: data.telefone,
          endereco: {
            logradouro: data.logradouro,
            cidade: data.cidade,
            estado: data.estado,
            cep: data.cep
          },
          anamnese: data.anamnese,
          relatoDor: data.relatoDor,
          rotinaAtividades: data.rotinaAtividades,
          antropometria: {
            altura: parseFloat(data.altura),
            peso: parseFloat(data.peso),
            envergadura: parseFloat(data.envergadura),
            comprimentoBraco: parseFloat(data.comprimentoBraco),
            comprimentoPerna: parseFloat(data.comprimentoPerna),
            comprimentoFemur: parseFloat(data.comprimentoFemur),
            comprimentoTibia: parseFloat(data.comprimentoTibia),
            entrepernas: parseFloat(data.entrepernas)
          }
        } : atleta
      );
      setAtletas(atletasAtualizados);
      alert("Atleta atualizado com sucesso!");
    } else {
      // Adicionar novo atleta
      const novoAtleta = {
        id: atletas.length > 0 ? Math.max(...atletas.map(a => a.id)) + 1 : 1,
        nome: data.nome,
        documento: data.documento,
        dataNascimento: data.dataNascimento,
        email: data.email,
        telefone: data.telefone,
        endereco: {
          logradouro: data.logradouro,
          cidade: data.cidade,
          estado: data.estado,
          cep: data.cep
        },
        anamnese: data.anamnese,
        relatoDor: data.relatoDor,
        rotinaAtividades: data.rotinaAtividades,
        antropometria: {
          altura: parseFloat(data.altura),
          peso: parseFloat(data.peso),
          envergadura: parseFloat(data.envergadura),
          comprimentoBraco: parseFloat(data.comprimentoBraco),
          comprimentoPerna: parseFloat(data.comprimentoPerna),
          comprimentoFemur: parseFloat(data.comprimentoFemur),
          comprimentoTibia: parseFloat(data.comprimentoTibia),
          entrepernas: parseFloat(data.entrepernas)
        },
        ultimaAvaliacao: null
      };
      setAtletas([...atletas, novoAtleta]);
      alert("Atleta cadastrado com sucesso!");
    }
    
    // Limpar formulário e voltar para a lista
    reset();
    setVisuAtual('lista');
    setModoEdicao(false);
    setAtletaAtual(null);
  };

  // Função para excluir atleta
  const excluirAtleta = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este atleta?")) {
      const atletasAtualizados = atletas.filter(atleta => atleta.id !== id);
      setAtletas(atletasAtualizados);
      alert("Atleta excluído com sucesso!");
    }
  };

  // Função para abrir detalhes do atleta
  const verDetalhes = (atleta) => {
    setAtletaAtual(atleta);
    setVisuAtual('detalhes');
  };

  // Função para iniciar novo cadastro
  const iniciarNovoCadastro = () => {
    reset();
    setModoEdicao(false);
    setAtletaAtual(null);
    setVisuAtual('form');
  };

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="fw-bold text-primary">Gerenciamento de Atletas</h1>
          <hr />
        </div>
      </div>

      {/* Barra de ações */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div>
            {visuAtual !== 'lista' && (
              <button 
                className="btn btn-outline-secondary me-2" 
                onClick={() => setVisuAtual('lista')}
              >
                <i className="fas fa-arrow-left me-2"></i>Voltar para Lista
              </button>
            )}
          </div>
          <div>
            {visuAtual === 'lista' && (
              <button 
                className="btn btn-primary" 
                onClick={iniciarNovoCadastro}
              >
                <i className="fas fa-plus me-2"></i>Novo Atleta
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Listagem de Atletas */}
      {visuAtual === 'lista' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Atletas Cadastrados</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Nome</th>
                        <th>Documento</th>
                        <th>Contato</th>
                        <th>Altura/Peso</th>
                        <th>Última Avaliação</th>
                        <th className="text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {atletas.length > 0 ? (
                        atletas.map((atleta) => (
                          <tr key={atleta.id}>
                            <td>{atleta.nome}</td>
                            <td>{atleta.documento}</td>
                            <td>{atleta.telefone}</td>
                            <td>{atleta.antropometria.altura} cm / {atleta.antropometria.peso} kg</td>
                            <td>
                              {atleta.ultimaAvaliacao ? 
                                new Date(atleta.ultimaAvaliacao).toLocaleDateString('pt-BR') : 
                                "Não avaliado"}
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <button 
                                  className="btn btn-sm btn-info me-2" 
                                  title="Ver detalhes"
                                  onClick={() => verDetalhes(atleta)}
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-primary me-2" 
                                  title="Editar"
                                  onClick={() => preencherFormulario(atleta)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-sm btn-danger" 
                                  title="Excluir"
                                  onClick={() => excluirAtleta(atleta.id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-3">
                            Nenhum atleta cadastrado.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulário de Cadastro/Edição */}
      {visuAtual === 'form' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">{modoEdicao ? 'Editar Atleta' : 'Novo Atleta'}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Dados Pessoais */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <h6 className="fw-bold text-primary">Dados Pessoais</h6>
                      <hr />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nome Completo*</label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                        {...register("nome", { required: "Nome é obrigatório" })}
                      />
                      {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Documento (CPF)*</label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.documento ? 'is-invalid' : ''}`}
                        {...register("documento", { required: "Documento é obrigatório" })}
                      />
                      {errors.documento && <div className="invalid-feedback">{errors.documento.message}</div>}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Data de Nascimento</label>
                      <input 
                        type="date" 
                        className="form-control"
                        {...register("dataNascimento")}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control"
                        {...register("email")}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Telefone</label>
                      <input 
                        type="text" 
                        className="form-control"
                        {...register("telefone")}
                      />
                    </div>
                  </div>

                  {/* Endereço */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <h6 className="fw-bold text-primary">Endereço</h6>
                      <hr />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Logradouro</label>
                      <input 
                        type="text" 
                        className="form-control"
                        placeholder="Rua, Avenida, etc."
                        {...register("logradouro")}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Cidade</label>
                      <input 
                        type="text" 
                        className="form-control"
                        {...register("cidade")}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Estado</label>
                      <input 
                        type="text" 
                        className="form-control"
                        {...register("estado")}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">CEP</label>
                      <input 
                        type="text" 
                        className="form-control"
                        {...register("cep")}
                      />
                    </div>
                  </div>

                  {/* Informações de Saúde */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <h6 className="fw-bold text-primary">Informações de Saúde</h6>
                      <hr />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Anamnese</label>
                      <textarea 
                        className="form-control"
                        rows="3"
                        placeholder="Histórico médico, lesões anteriores, condições de saúde, etc."
                        {...register("anamnese")}
                      ></textarea>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Relato de Dor</label>
                      <textarea 
                        className="form-control"
                        rows="3"
                        placeholder="Descreva qualquer dor durante ou após a prática de ciclismo"
                        {...register("relatoDor")}
                      ></textarea>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Rotina de Atividades</label>
                      <textarea 
                        className="form-control"
                        rows="3"
                        placeholder="Frequência e tipo de treinos, outras atividades físicas, etc."
                        {...register("rotinaAtividades")}
                      ></textarea>
                    </div>
                  </div>

                  {/* Antropometria */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <h6 className="fw-bold text-primary">Antropometria</h6>
                      <hr />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Altura (cm)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control"
                        {...register("altura")}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Peso (kg)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control"
                        {...register("peso")}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Envergadura (cm)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control"
                        {...register("envergadura")}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Entrepernas (cm)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control"
                        {...register("entrepernas")}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Comprimento do Braço (cm)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control"
                        {...register("comprimentoBraco")}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Comprimento da Perna (cm)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control"
                        {...register("comprimentoPerna")}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Comprimento do Fêmur (cm)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control"
                        {...register("comprimentoFemur")}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Comprimento da Tíbia (cm)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control"
                        {...register("comprimentoTibia")}
                      />
                    </div>
                  </div>

                  {/* Botões de ação */}
                  <div className="d-flex justify-content-end">
                    <button 
                      type="button"
                      className="btn btn-outline-secondary me-2"
                      onClick={() => {
                        reset();
                        setVisuAtual('lista');
                      }}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {modoEdicao ? 'Atualizar Atleta' : 'Cadastrar Atleta'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visualização de Detalhes */}
      {visuAtual === 'detalhes' && atletaAtual && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Detalhes do Atleta</h5>
                <div>
                  <button 
                    className="btn btn-primary me-2" 
                    onClick={() => preencherFormulario(atletaAtual)}
                  >
                    <i className="fas fa-edit me-2"></i>Editar
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => excluirAtleta(atletaAtual.id)}
                  >
                    <i className="fas fa-trash me-2"></i>Excluir
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6 className="fw-bold text-primary">Dados Pessoais</h6>
                    <hr />
                    <p><strong>Nome:</strong> {atletaAtual.nome}</p>
                    <p><strong>Documento:</strong> {atletaAtual.documento}</p>
                    <p><strong>Data de Nascimento:</strong> {atletaAtual.dataNascimento ? new Date(atletaAtual.dataNascimento).toLocaleDateString('pt-BR') : 'Não informado'}</p>
                    <p><strong>Email:</strong> {atletaAtual.email || 'Não informado'}</p>
                    <p><strong>Telefone:</strong> {atletaAtual.telefone || 'Não informado'}</p>
                    
                    <h6 className="fw-bold text-primary mt-4">Endereço</h6>
                    <hr />
                    <p><strong>Logradouro:</strong> {atletaAtual.endereco.logradouro || 'Não informado'}</p>
                    <p><strong>Cidade:</strong> {atletaAtual.endereco.cidade || 'Não informado'}</p>
                    <p><strong>Estado:</strong> {atletaAtual.endereco.estado || 'Não informado'}</p>
                    <p><strong>CEP:</strong> {atletaAtual.endereco.cep || 'Não informado'}</p>
                  </div>
                  
                  <div className="col-md-6">
                    <h6 className="fw-bold text-primary">Informações de Saúde</h6>
                    <hr />
                    <p><strong>Anamnese:</strong> {atletaAtual.anamnese || 'Não informado'}</p>
                    <p><strong>Relato de Dor:</strong> {atletaAtual.relatoDor || 'Não informado'}</p>
                    <p><strong>Rotina de Atividades:</strong> {atletaAtual.rotinaAtividades || 'Não informado'}</p>
                    
                    <h6 className="fw-bold text-primary mt-4">Antropometria</h6>
                    <hr />
                    <div className="row">
                      <div className="col-6">
                        <p><strong>Altura:</strong> {atletaAtual.antropometria.altura} cm</p>
                        <p><strong>Peso:</strong> {atletaAtual.antropometria.peso} kg</p>
                        <p><strong>Envergadura:</strong> {atletaAtual.antropometria.envergadura} cm</p>
                        <p><strong>Entrepernas:</strong> {atletaAtual.antropometria.entrepernas} cm</p>
                      </div>
                      <div className="col-6">
                        <p><strong>Comprimento do Braço:</strong> {atletaAtual.antropometria.comprimentoBraco} cm</p>
                        <p><strong>Comprimento da Perna:</strong> {atletaAtual.antropometria.comprimentoPerna} cm</p>
                        <p><strong>Comprimento do Fêmur:</strong> {atletaAtual.antropometria.comprimentoFemur} cm</p>
                        <p><strong>Comprimento da Tíbia:</strong> {atletaAtual.antropometria.comprimentoTibia} cm</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-12">
                    <h6 className="fw-bold text-primary">Histórico de Avaliações</h6>
                    <hr />
                    {atletaAtual.ultimaAvaliacao ? (
                      <div className="alert alert-info">
                        <p className="mb-0"><strong>Última avaliação:</strong> {new Date(atletaAtual.ultimaAvaliacao).toLocaleDateString('pt-BR')}</p>
                        <p className="mb-0 mt-2">
                          <button className="btn btn-sm btn-primary">Ver relatório completo</button>
                        </p>
                      </div>
                    ) : (
                      <div className="alert alert-warning">
                        <p className="mb-0">Este atleta ainda não possui avaliações de Bike Fit registradas.</p>
                        <p className="mb-0 mt-2">
                          <button className="btn btn-sm btn-success">Agendar Bike Fit</button>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciamentoAtletas;