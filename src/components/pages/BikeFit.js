import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';


const BikeFitSession = () => {
  const { atletaId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  
  // Estados para gerenciar dados
  const [atleta, setAtleta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('infos');
  const [medidas, setMedidas] = useState({});
  const [recomendacoes, setRecomendacoes] = useState({});
  const [fotos, setFotos] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [savedSession, setSavedSession] = useState(false);
  
  // Valores dos campos sendo observados para cálculos
  const alturaSim = watch('alturaSim');
  const distSelimGuidao = watch('distSelimGuidao');
  const alturaMesa = watch('alturaMesa');
  
  // Simulação de busca de dados do atleta
  useEffect(() => {
    const mockAtleta = {
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
      bicicletas: [
        {
          id: 1,
          tipo: "Speed",
          marca: "Specialized",
          modelo: "Tarmac SL7",
          tamanho: "56",
          anoFabricacao: "2023"
        },
        {
          id: 2,
          tipo: "MTB",
          marca: "Scott",
          modelo: "Scale",
          tamanho: "L",
          anoFabricacao: "2022"
        }
      ],
      ultimaAvaliacao: "2025-03-10"
    };
    
    setTimeout(() => {
      setAtleta(mockAtleta);
      setLoading(false);
      
      const entrepernas = mockAtleta.antropometria.entrepernas;
      const altura = mockAtleta.antropometria.altura;
      
      const alturaSelimRecomendada = entrepernas * 0.883;
      const recuoSelimRecomendado = mockAtleta.antropometria.comprimentoFemur * 0.18;
      const distanciaSelimGuidaoRecomendada = mockAtleta.antropometria.comprimentoBraco * 0.9;
      const larguraGuidaoRecomendada = mockAtleta.antropometria.envergadura * 0.25;
      
      setValue('bicicletaId', 1);
      setValue('alturaSim', alturaSelimRecomendada.toFixed(1));
      setValue('recuoSelim', recuoSelimRecomendado.toFixed(1));
      setValue('distSelimGuidao', distanciaSelimGuidaoRecomendada.toFixed(1));
      setValue('larguraGuidao', larguraGuidaoRecomendada.toFixed(1));
      
      setRecomendacoes({
        alturaSim: alturaSelimRecomendada.toFixed(1),
        recuoSelim: recuoSelimRecomendado.toFixed(1),
        distSelimGuidao: distanciaSelimGuidaoRecomendada.toFixed(1),
        larguraGuidao: larguraGuidaoRecomendada.toFixed(1),
        tamanhoQuadro: calcularTamanhoQuadroRecomendado(altura, entrepernas),
        comprimentoPedivela: calcularComprimentoPedivelaRecomendado(entrepernas),
        observacoes: ""
      });
    }, 700);
  }, [setValue]);
  
  const calcularTamanhoQuadroRecomendado = (altura, entrepernas) => {
    return (entrepernas * 0.65).toFixed(1);
  };
  
  const calcularComprimentoPedivelaRecomendado = (entrepernas) => {
    return (entrepernas * 0.2).toFixed(0);
  };
  
  useEffect(() => {
    if (alturaSim && distSelimGuidao && alturaMesa) {
      setRecomendacoes(prev => ({
        ...prev,
        observacoes: `Configuração personalizada com altura de selim ${alturaSim}cm, distância selim-guidão ${distSelimGuidao}cm.`
      }));
    }
  }, [alturaSim, distSelimGuidao, alturaMesa]);
  
  const onSubmit = (data) => {
    console.log("Dados da sessão de Bike Fit:", data);
    
    setCurrentStep(5);
    setSavedSession(true);
    
    const medidasFinais = {
      bicicletaId: data.bicicletaId,
      alturaSim: data.alturaSim,
      recuoSelim: data.recuoSelim,
      distSelimGuidao: data.distSelimGuidao,
      alturaMesa: data.alturaMesa,
      angulacaoMesa: data.angulacaoMesa,
      larguraGuidao: data.larguraGuidao,
      comprimentoPedivela: data.comprimentoPedivela,
      tacoEspacadores: data.tacoEspacadores,
      observacoes: data.observacoes
    };
    
    setMedidas(medidasFinais);
  };
  
  const avancarEtapa = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      
      if (currentStep === 1) setActiveTab('avaliacao');
      else if (currentStep === 2) setActiveTab('ajustes');
      else if (currentStep === 3) setActiveTab('fotos');
      else if (currentStep === 4) setActiveTab('resultados');
    }
  };
  
  const voltarEtapa = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      
      if (currentStep === 2) setActiveTab('infos');
      else if (currentStep === 3) setActiveTab('avaliacao');
      else if (currentStep === 4) setActiveTab('ajustes');
      else if (currentStep === 5) setActiveTab('fotos');
    }
  };
  
  const handleAddFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const novaFoto = {
          id: fotos.length + 1,
          url: reader.result,
          descricao: `Foto ${fotos.length + 1}`,
          timestamp: new Date().toISOString()
        };
        setFotos([...fotos, novaFoto]);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveFoto = (id) => {
    setFotos(fotos.filter(foto => foto.id !== id));
  };
  
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3">Carregando dados do atleta...</p>
      </div>
    );
  }
  
  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fw-bold text-primary mb-0">Sessão de Bike Fit</h1>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate('/atletas')}
            >
              <i className="fas fa-arrow-left me-2"></i>Voltar para Atletas
            </button>
          </div>
          <hr />
        </div>
      </div>
      
      {/* Informações do atleta */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Atleta: {atleta.nome}</h5>
                <span className="badge bg-primary">ID: {atleta.id}</span>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Email:</strong> {atleta.email}</p>
                  <p><strong>Telefone:</strong> {atleta.telefone}</p>
                  <p><strong>Data de Nascimento:</strong> {new Date(atleta.dataNascimento).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Última Avaliação:</strong> {atleta.ultimaAvaliacao ? new Date(atleta.ultimaAvaliacao).toLocaleDateString('pt-BR') : 'Primeira avaliação'}</p>
                  <p><strong>Rotina:</strong> {atleta.rotinaAtividades}</p>
                  <p><strong>Relato de Dor:</strong> {atleta.relatoDor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Passos do processo */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="progress" style={{ height: '30px' }}>
            <div 
              className="progress-bar bg-primary" 
              role="progressbar" 
              style={{ width: `${(currentStep / 5) * 100}%` }} 
              aria-valuenow={(currentStep / 5) * 100} 
              aria-valuemin="0" 
              aria-valuemax="100"
            >
              {currentStep} de 5
            </div>
          </div>
        </div>
      </div>
      
      {/* Navegação por abas */}
      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'infos' ? 'active' : ''}`}
                onClick={() => currentStep >= 1 && setActiveTab('infos')}
                disabled={currentStep < 1}
              >
                1. Informações
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'avaliacao' ? 'active' : ''}`}
                onClick={() => currentStep >= 2 && setActiveTab('avaliacao')}
                disabled={currentStep < 2}
              >
                2. Avaliação Inicial
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'ajustes' ? 'active' : ''}`}
                onClick={() => currentStep >= 3 && setActiveTab('ajustes')}
                disabled={currentStep < 3}
              >
                3. Ajustes
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'fotos' ? 'active' : ''}`}
                onClick={() => currentStep >= 4 && setActiveTab('fotos')}
                disabled={currentStep < 4}
              >
                4. Fotos e Vídeos
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'resultados' ? 'active' : ''}`}
                onClick={() => currentStep >= 5 && setActiveTab('resultados')}
                disabled={currentStep < 5}
              >
                5. Resultados
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Formulário de Bike Fit */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Etapa 1: Informações */}
        {activeTab === 'infos' && (
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Antropometria</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <p><strong>Altura:</strong> {atleta.antropometria.altura} cm</p>
                      <p><strong>Peso:</strong> {atleta.antropometria.peso} kg</p>
                      <p><strong>Envergadura:</strong> {atleta.antropometria.envergadura} cm</p>
                      <p><strong>Entrepernas:</strong> {atleta.antropometria.entrepernas} cm</p>
                    </div>
                    <div className="col-6">
                      <p><strong>Comprimento do Braço:</strong> {atleta.antropometria.comprimentoBraco} cm</p>
                      <p><strong>Comprimento da Perna:</strong> {atleta.antropometria.comprimentoPerna} cm</p>
                      <p><strong>Comprimento do Fêmur:</strong> {atleta.antropometria.comprimentoFemur} cm</p>
                      <p><strong>Comprimento da Tíbia:</strong> {atleta.antropometria.comprimentoTibia} cm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Bicicleta</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Selecione a Bicicleta</label>
                    <select 
                      className="form-select" 
                      {...register("bicicletaId", { required: "Selecione uma bicicleta" })}
                    >
                      {atleta.bicicletas.map(bike => (
                        <option key={bike.id} value={bike.id}>
                          {bike.marca} {bike.modelo} ({bike.tipo}) - Tam: {bike.tamanho}
                        </option>
                      ))}
                    </select>
                    {errors.bicicletaId && <div className="invalid-feedback d-block">{errors.bicicletaId.message}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="form-label">Adicionar Nova Bicicleta</label>
                      <button type="button" className="btn btn-sm btn-outline-primary">
                        <i className="fas fa-plus me-1"></i> Nova
                      </button>
                    </div>
                  </div>
                  
                  <div className="alert alert-info mb-0">
                    <div className="d-flex">
                      <div className="me-3">
                        <i className="fas fa-info-circle fa-2x"></i>
                      </div>
                      <div>
                        <h6 className="alert-heading">Tamanho Recomendado</h6>
                        <p className="mb-0">Com base nas medidas antropométricas, o tamanho recomendado de quadro é: <strong>{recomendacoes.tamanhoQuadro} cm</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Objetivos e Observações</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Objetivos do Bike Fit</label>
                    <select 
                      className="form-select" 
                      {...register("objetivo")}
                    >
                      <option value="conforto">Melhorar Conforto</option>
                      <option value="performance">Aumentar Performance</option>
                      <option value="dor">Resolver Dores</option>
                      <option value="prevenção">Prevenção de Lesões</option>
                      <option value="iniciação">Configuração Inicial</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Queixas Principais</label>
                    <textarea 
                      className="form-control" 
                      rows="3"
                      placeholder="Descreva as principais queixas do atleta"
                      {...register("queixasPrincipais")}
                    ></textarea>
                  </div>
                  
                  <div className="mb-0">
                    <label className="form-label">Observações Iniciais</label>
                    <textarea 
                      className="form-control" 
                      rows="3"
                      placeholder="Anote observações relevantes para o Bike Fit"
                      {...register("observacoesIniciais")}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-12 d-flex justify-content-end">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={avancarEtapa}
              >
                Avançar para Avaliação <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        )}
        
        {/* Etapa 2: Avaliação Inicial */}
        {activeTab === 'avaliacao' && (
          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Avaliação de Flexibilidade e Postura</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Flexibilidade Isquiotibiais</label>
                      <select className="form-select" {...register("flexIst")}>
                        <option value="excelente">Excelente</option>
                        <option value="boa">Boa</option>
                        <option value="regular">Regular</option>
                        <option value="limitada">Limitada</option>
                        <option value="ruim">Ruim</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Flexibilidade Quadril</label>
                      <select className="form-select" {...register("flexQuad")}>
                        <option value="excelente">Excelente</option>
                        <option value="boa">Boa</option>
                        <option value="regular">Regular</option>
                        <option value="limitada">Limitada</option>
                        <option value="ruim">Ruim</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Alinhamento Coluna</label>
                      <select className="form-select" {...register("alinhCol")}>
                        <option value="otimo">Ótimo</option>
                        <option value="bom">Bom</option>
                        <option value="regular">Regular</option>
                        <option value="desalinhado">Desalinhado</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Controle de Core</label>
                      <select className="form-select" {...register("ctrlCore")}>
                        <option value="excelente">Excelente</option>
                        <option value="bom">Bom</option>
                        <option value="regular">Regular</option>
                        <option value="fraco">Fraco</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-0">
                    <label className="form-label">Observações Avaliação Física</label>
                    <textarea 
                      className="form-control" 
                      rows="3"
                      placeholder="Descreva detalhes da avaliação física"
                      {...register("obsAvFisica")}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Medidas Atuais da Bicicleta</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Altura do Selim (cm)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control" 
                        placeholder="0.0"
                        {...register("alturaSelimAtual")}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Recuo do Selim (cm)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control" 
                        placeholder="0.0"
                        {...register("recuoSelimAtual")}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Distância Selim-Guidão (cm)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control" 
                        placeholder="0.0"
                        {...register("distSelimGuidaoAtual")}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Altura da Mesa (cm)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control" 
                        placeholder="0.0"
                        {...register("alturaMesaAtual")}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Comprimento da Mesa (cm)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control" 
                        placeholder="0.0"
                        {...register("compMesaAtual")}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Comprimento Pedivela (mm)</label>
                      <input 
                        type="number" 
                        step="2.5"
                        className="form-control" 
                        placeholder="0"
                        {...register("compPedivelaAtual")}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-0">
                    <label className="form-label">Observações sobre Configuração Atual</label>
                    <textarea 
                      className="form-control" 
                      rows="3"
                      placeholder="Descreva observações sobre a configuração atual da bicicleta"
                      {...register("obsConfigAtual")}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-12 d-flex justify-content-between">
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={voltarEtapa}
              >
                <i className="fas fa-arrow-left me-2"></i> Voltar
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={avancarEtapa}
              >
                Avançar para Ajustes <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        )}
        
        {/* Etapa 3: Ajustes */}
        {activeTab === 'ajustes' && (
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Ajustes do Selim</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Altura do Selim (cm)</label>
                    <div className="input-group">
                      <input 
                        type="number" 
                        step="0.1"
                        className={`form-control ${errors.alturaSim ? 'is-invalid' : ''}`}
                        {...register("alturaSim", { required: "Altura do selim é obrigatória" })}
                      />
                      <span className="input-group-text">cm</span>
                    </div>
                    {errors.alturaSim && <div className="invalid-feedback d-block">{errors.alturaSim.message}</div>}
                    <small className="form-text text-muted">Recomendado: {recomendacoes.alturaSim} cm</small>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Recuo do Selim (cm)</label>
                    <div className="input-group">
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control"
                        {...register("recuoSelim")}
                      />
                      <span className="input-group-text">cm</span>
                    </div>
                    <small className="form-text text-muted">Recomendado: {recomendacoes.recuoSelim} cm</small>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Ângulo do Selim (°)</label>
                    <div className="input-group">
                      <input 
                        type="number" 
                        step="0.5"
                        className="form-control"
                        {...register("anguloSelim")}
                      />
                      <span className="input-group-text">°</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Ajustes do Guidão</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Distância Selim-Guidão (cm)</label>
                    <div className="input-group">
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control"
                        {...register("distSelimGuidao", { required: "Distância selim-guidão é obrigatória" })}
                      />
                      <span className="input-group-text">cm</span>
                    </div>
                    {errors.distSelimGuidao && <div className="invalid-feedback d-block">{errors.distSelimGuidao.message}</div>}
                    <small className="form-text text-muted">Recomendado: {recomendacoes.distSelimGuidao} cm</small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Altura da Mesa (cm)</label>
                    <div className="input-group">
                      <input 
                        type="number" 
                        step="0.1"
                        className="form-control"
                        {...register("alturaMesa")}
                      />
                      <span className="input-group-text">cm</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Ângulo da Mesa (°)</label>
                    <div className="input-group">
                      <input 
                        type="number" 
                        step="0.5"
                        className="form-control"
                        {...register("angulacaoMesa")}
                      />
                      <span className="input-group-text">°</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-between">
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={voltarEtapa}
              >
                <i className="fas fa-arrow-left me-2"></i> Voltar
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={avancarEtapa}
              >
                Avançar para Fotos <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* Etapa 4: Fotos e Vídeos */}
        {activeTab === 'fotos' && (
          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Adicionar Fotos e Vídeos</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleAddFoto}
                      className="form-control"
                    />
                  </div>
                  <div className="row">
                    {fotos.map(foto => (
                      <div className="col-md-4 mb-3" key={foto.id}>
                        <div className="card">
                          <img src={foto.url} className="card-img-top" alt={foto.descricao} />
                          <div className="card-body">
                            <h6 className="card-title">{foto.descricao}</h6>
                            <button 
                              className="btn btn-danger"
                              onClick={() => handleRemoveFoto(foto.id)}
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-between">
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={voltarEtapa}
              >
                <i className="fas fa-arrow-left me-2"></i> Voltar
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={avancarEtapa}
              >
                Avançar para Resultados <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* Etapa 5: Resultados */}
        {activeTab === 'resultados' && (
          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Resultados do Bike Fit</h5>
                </div>
                <div className="card-body">
                  <h6 className="mb-3">Medidas Finais:</h6>
                  <ul>
                    <li>Altura do Selim: {medidas.alturaSim} cm</li>
                    <li>Recuo do Selim: {medidas.recuoSelim} cm</li>
                    <li>Distância Selim-Guidão: {medidas.distSelimGuidao} cm</li>
                    <li>Altura da Mesa: {medidas.alturaMesa} cm</li>
                    <li>Ângulo da Mesa: {medidas.angulacaoMesa} °</li>
                    <li>Largura do Guidão: {medidas.larguraGuidao} cm</li>
                    <li>Comprimento da Pedivela: {medidas.comprimentoPedivela} mm</li>
                    <li>Taco de Espaçadores: {medidas.tacoEspacadores}</li>
                    <li>Observações: {medidas.observacoes}</li>
                  </ul>
                  <div className="alert alert-success">
                    <strong>Configuração concluída com sucesso!</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-between">
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={voltarEtapa}
              >
                <i className="fas fa-arrow-left me-2"></i> Voltar
              </button>
              <button 
                type="submit" 
                className="btn btn-success"
              >
                Finalizar Sessão <i className="fas fa-check ms-2"></i>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BikeFitSession;