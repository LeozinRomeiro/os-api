const { sql, poolPromise } = require('./db');

const createTables = async () => {
  try {
    const pool = await poolPromise;
    
    const createOrdensTable = `
    -- Verifica se a tabela Clientes não existe e cria a tabela
    IF OBJECT_ID('Clientes', 'U') IS NULL
    BEGIN
        CREATE TABLE Clientes (
            ClienteID INT PRIMARY KEY IDENTITY(1,1),
            Nome VARCHAR(255) NOT NULL,
            CNPJ CHAR(14) NOT NULL UNIQUE
        );
    END

    IF OBJECT_ID('Funcionários', 'U') IS NULL
    BEGIN
        CREATE TABLE Funcionários (
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

    IF OBJECT_ID('Atividade', 'U') IS NULL
    BEGIN
        CREATE TABLE Atividade (
            AtividadeID INT PRIMARY KEY IDENTITY(1,1),
            Nome VARCHAR(255) NOT NULL,
            Descricao TEXT
        );
    END

    IF OBJECT_ID('OrdemDeServico', 'U') IS NULL
    BEGIN
        CREATE TABLE OrdemDeServico (
            OrdemID INT PRIMARY KEY IDENTITY(1,1),
            ProjetoID INT,
            FuncionarioID INT,
            Data DATE NOT NULL,
            AtividadeID INT,
            Complemento TEXT,
            FOREIGN KEY (ProjetoID) REFERENCES Projetos(ProjetoID),
            FOREIGN KEY (FuncionarioID) REFERENCES Funcionários(FuncionarioID),
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

    await pool.request().query(createOrdensTable);
    
    console.log('Tabelas criadas com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabelas:', err);
  }
};

createTables();