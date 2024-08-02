const { sql, poolPromise } = require('./db');

const createTables = async () => {
  try {
    const pool = await poolPromise;
    
    const createOrdensTable = `
      -- Verifica se as tabelas não existe e cria
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Clientes' and xtype='U')
      BEGIN
          CREATE TABLE Clientes (
              ClienteID INT PRIMARY KEY AUTO_INCREMENT,
              Nome VARCHAR(255) NOT NULL,
              CNPJ CHAR(14) NOT NULL UNIQUE
          );
      END

      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Funcionários' and xtype='U')
      BEGIN
          CREATE TABLE Funcionários (
              FuncionarioID INT PRIMARY KEY AUTO_INCREMENT,
              Nome VARCHAR(255) NOT NULL,
              CPF CHAR(11) NOT NULL UNIQUE
          );
      END

      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Projetos' and xtype='U')
      BEGIN
          CREATE TABLE Projetos (
              ProjetoID INT PRIMARY KEY AUTO_INCREMENT,
              Nome VARCHAR(255) NOT NULL,
              ClienteID INT,
              FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID)
          );
      END

      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Atividades' and xtype='U')
      BEGIN
          CREATE TABLE Atividades (
              AtividadeID INT PRIMARY KEY AUTO_INCREMENT,
              Nome VARCHAR(255) NOT NULL,
              Descricao TEXT
          );
      END

      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='OrdemDeServico' and xtype='U')
      BEGIN
          CREATE TABLE OrdemDeServico (
              OrdemID INT PRIMARY KEY AUTO_INCREMENT,
              ProjetoID INT,
              FuncionarioID INT,
              Data DATE NOT NULL,
              AtividadeID INT,
              Complemento TEXT,
              FOREIGN KEY (ProjetoID) REFERENCES Projetos(ProjetoID),
              FOREIGN KEY (FuncionarioID) REFERENCES Funcionários(FuncionarioID),
              FOREIGN KEY (AtividadeID) REFERENCES Atividades(AtividadeID)
          );
      END

    `;

    await pool.request().query(createOrdensTable);
    
    console.log('Tabela Ordens criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabelas:', err);
  }
};

createTables();