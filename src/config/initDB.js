const { sql, poolPromise } = require('./db');

const createTables = async () => {
  try {
    const pool = await poolPromise;
    
    const criarTabelas = `
    -- Verifica se as tabelas não existe e cria as mesmas
    IF OBJECT_ID('Clientes', 'U') IS NULL
    BEGIN
        CREATE TABLE Clientes (
            ClienteID INT PRIMARY KEY IDENTITY(1,1),
            Nome VARCHAR(255) NOT NULL,
            CNPJ CHAR(14) NOT NULL UNIQUE
        );
    END

    IF OBJECT_ID('Funcionarios', 'U') IS NULL
    BEGIN
        CREATE TABLE Funcionarios (
            FuncionarioID INT PRIMARY KEY IDENTITY(1,1),
            Nome VARCHAR(255) NOT NULL,
            CPF CHAR(11) NOT NULL UNIQUE
        );
    END

    IF OBJECT_ID('Projetos', 'U') IS NULL
    BEGIN
        CREATE TABLE Projetos (
            ProjetoID INT PRIMARY KEY IDENTITY(1,1),
            Nome VARCHAR(255) NOT NULL,
            ClienteID INT,
            FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID)
        );
    END

    IF OBJECT_ID('Atividades', 'U') IS NULL
    BEGIN
        CREATE TABLE Atividades (
            AtividadeID INT PRIMARY KEY IDENTITY(1,1),
            Nome VARCHAR(255) NOT NULL,
            Descricao TEXT
        );
    END

    IF OBJECT_ID('Periodo', 'U') IS NULL
    BEGIN
        CREATE TABLE Periodo (
            PeriodoID INT PRIMARY KEY IDENTITY(1,1),
            DataInicio DATE NOT NULL,
            DataFim DATE NOT NULL,
            TempoTotal TEXT NOT NULL
        );
    END

    IF OBJECT_ID('OrdemDeServico', 'U') IS NULL
    BEGIN
        CREATE TABLE OrdemDeServico (
            OrdemID INT PRIMARY KEY IDENTITY(1,1),
            ProjetoID INT,
            ClienteID INT,
            FuncionarioID INT,
            AtividadeID INT,
            PeriodoID INT,
            FOREIGN KEY (PeriodoID) REFERENCES Periodo(PeriodoID),
            FOREIGN KEY (ProjetoID) REFERENCES Projeto(ProjetoID),
            FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID),
            FOREIGN KEY (FuncionarioID) REFERENCES Funcionario(FuncionarioID),
            FOREIGN KEY (AtividadeID) REFERENCES Atividade(AtividadeID)
        );
    END

    IF OBJECT_ID('Usuario', 'U') IS NULL
    BEGIN
        CREATE TABLE Usuario (
            UsuarioID INT PRIMARY KEY IDENTITY(1,1),
            Nome VARCHAR(50),
            Senha VARCHAR(100),
            Email VARCHAR(50),
        );
    END

    `;

    await pool.request().query(criarTabelas);
    
    console.log('Tabelas criadas com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabelas:', err);
  }
};

createTables();