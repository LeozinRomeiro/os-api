const { sql, poolPromise } = require('./db')
const config = require('config')
const sequelize = require('./sequelize')

const iniciarBanco = async gerarDados => {
  try {
    const pool = await poolPromise

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

    IF OBJECT_ID('OrdemDeServicos', 'U') IS NULL
    BEGIN
        CREATE TABLE OrdemDeServicos (
            OrdemID INT PRIMARY KEY IDENTITY(1,1),
            ProjetoID INT,
            ClienteID INT,
            FuncionarioID INT,
            AtividadeID INT,
            PeriodoID INT,
            FOREIGN KEY (PeriodoID) REFERENCES Periodo(PeriodoID),
            FOREIGN KEY (ProjetoID) REFERENCES Projetos(ProjetoID),
            FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID),
            FOREIGN KEY (FuncionarioID) REFERENCES Funcionarios(FuncionarioID),
            FOREIGN KEY (AtividadeID) REFERENCES Atividades(AtividadeID)
        );
    END

    IF OBJECT_ID('Usuarios', 'U') IS NULL
    BEGIN
        CREATE TABLE Usuarios (
            UsuarioID INT PRIMARY KEY IDENTITY(1,1),
            Nome VARCHAR(50),
            Senha VARCHAR(100),
            Email VARCHAR(50),
        );
    END
    `

    const inserirDados = `
    -- Verificar e inserir dados na tabela Clientes
    IF NOT EXISTS (SELECT * FROM Clientes)
    BEGIN
        INSERT INTO Clientes (Nome, CNPJ) VALUES ('Padaria Pão Quente', '12345678000123');
        INSERT INTO Clientes (Nome, CNPJ) VALUES ('Supermercado Mais Barato', '23456789000123');
        INSERT INTO Clientes (Nome, CNPJ) VALUES ('Academia Fit Total', '34567890000123');
        INSERT INTO Clientes (Nome, CNPJ) VALUES ('Livraria Letras e Cores', '45678900001234');
        INSERT INTO Clientes (Nome, CNPJ) VALUES ('Restaurante Saboroso', '56789000012345');
        INSERT INTO Clientes (Nome, CNPJ) VALUES ('Oficina Mecânica Turbo', '67890000123456');
        INSERT INTO Clientes (Nome, CNPJ) VALUES ('Pet Shop Amigo Fiel', '78900001234567');
        INSERT INTO Clientes (Nome, CNPJ) VALUES ('Consultoria de TI ByteMax', '89000012345678');
        INSERT INTO Clientes (Nome, CNPJ) VALUES ('Clínica Médica Saúde em Dia', '90000123456789');
        INSERT INTO Clientes (Nome, CNPJ) VALUES ('Construtora Construa Mais', '00001234567890');
    END

    -- Verificar e inserir dados na tabela Funcionarios
    IF NOT EXISTS (SELECT * FROM Funcionarios)
    BEGIN
        INSERT INTO Funcionarios (Nome, CPF) VALUES ('João da Silva', '11122233344');
        INSERT INTO Funcionarios (Nome, CPF) VALUES ('Maria Oliveira', '22233344455');
        INSERT INTO Funcionarios (Nome, CPF) VALUES ('Carlos Pereira', '33344455566');
        INSERT INTO Funcionarios (Nome, CPF) VALUES ('Ana Souza', '44455566677');
        INSERT INTO Funcionarios (Nome, CPF) VALUES ('Pedro Santos', '55566677788');
        INSERT INTO Funcionarios (Nome, CPF) VALUES ('Juliana Gomes', '66677788899');
        INSERT INTO Funcionarios (Nome, CPF) VALUES ('Roberto Lima', '77788899900');
        INSERT INTO Funcionarios (Nome, CPF) VALUES ('Fernanda Costa', '88899900011');
        INSERT INTO Funcionarios (Nome, CPF) VALUES ('Paulo Almeida', '99900011122');
        INSERT INTO Funcionarios (Nome, CPF) VALUES ('Luciana Moreira', '00011122233');
    END

    -- Verificar e inserir dados na tabela Projetos
    IF NOT EXISTS (SELECT * FROM Projetos)
    BEGIN
        INSERT INTO Projetos (Nome, ClienteID) VALUES ('Site para Padaria Pão Quente', 1);
        INSERT INTO Projetos (Nome, ClienteID) VALUES ('Aplicativo para Supermercado Mais Barato', 2);
        INSERT INTO Projetos (Nome, ClienteID) VALUES ('Sistema de Gestão para Academia Fit Total', 3);
        INSERT INTO Projetos (Nome, ClienteID) VALUES ('Plataforma de Vendas Online para Livraria Letras e Cores', 4);
        INSERT INTO Projetos (Nome, ClienteID) VALUES ('Sistema de Pedidos para Restaurante Saboroso', 5);
        INSERT INTO Projetos (Nome, ClienteID) VALUES ('Sistema de Agendamento para Oficina Mecânica Turbo', 6);
        INSERT INTO Projetos (Nome, ClienteID) VALUES ('E-commerce para Pet Shop Amigo Fiel', 7);
        INSERT INTO Projetos (Nome, ClienteID) VALUES ('Sistema de Consultoria de TI para ByteMax', 8);
        INSERT INTO Projetos (Nome, ClienteID) VALUES ('Sistema de Gerenciamento para Clínica Médica Saúde em Dia', 9);
        INSERT INTO Projetos (Nome, ClienteID) VALUES ('Portal de Obras para Construtora Construa Mais', 10);
    END

    -- Verificar e inserir dados na tabela Atividade
    IF NOT EXISTS (SELECT * FROM Atividades)
    BEGIN
        INSERT INTO Atividades (Nome, Descricao) VALUES ('Desenvolvimento de Front-end', 'Criação da interface visual do projeto');
        INSERT INTO Atividades (Nome, Descricao) VALUES ('Desenvolvimento de Back-end', 'Implementação da lógica e regras de negócio');
        INSERT INTO Atividades (Nome, Descricao) VALUES ('Design Gráfico', 'Criação de artes e layouts');
        INSERT INTO Atividades (Nome, Descricao) VALUES ('Análise de Requisitos', 'Levantamento e análise de necessidades do cliente');
        INSERT INTO Atividades (Nome, Descricao) VALUES ('Teste de Software', 'Testes para garantir a qualidade do sistema');
        INSERT INTO Atividade (Nome, Descricao) VALUES ('Documentação', 'Escrita de documentos técnicos e manuais');
        INSERT INTO Atividades (Nome, Descricao) VALUES ('Manutenção', 'Correção de bugs e melhorias');
        INSERT INTO Atividades (Nome, Descricao) VALUES ('Suporte Técnico', 'Atendimento e resolução de problemas');
        INSERT INTO Atividades (Nome, Descricao) VALUES ('Gestão de Projetos', 'Coordenação e acompanhamento do projeto');
        INSERT INTO Atividades (Nome, Descricao) VALUES ('Treinamento', 'Capacitação dos usuários no uso do sistema');
    END

    -- Verificar e inserir dados na tabela Periodo
    IF NOT EXISTS (SELECT * FROM Periodo)
    BEGIN
        INSERT INTO Periodo (DataInicio, DataFim, TempoTotal) VALUES ('2024-01-01', '2024-01-31', '160 horas');
        INSERT INTO Periodo (DataInicio, DataFim, TempoTotal) VALUES ('2024-02-01', '2024-02-28', '140 horas');
        INSERT INTO Periodo (DataInicio, DataFim, TempoTotal) VALUES ('2024-03-01', '2024-03-31', '150 horas');
        INSERT INTO Periodo (DataInicio, DataFim, TempoTotal) VALUES ('2024-04-01', '2024-04-30', '160 horas');
        INSERT INTO Periodo (DataInicio, DataFim, TempoTotal) VALUES ('2024-05-01', '2024-05-31', '170 horas');
        INSERT INTO Periodo (DataInicio, DataFim, TempoTotal) VALUES ('2024-06-01', '2024-06-30', '160 horas');
        INSERT INTO Periodo (DataInicio, DataFim, TempoTotal) VALUES ('2024-07-01', '2024-07-31', '180 horas');
        INSERT INTO Periodo (DataInicio, DataFim, TempoTotal) VALUES ('2024-08-01', '2024-08-31', '160 horas');
        INSERT INTO Periodo (DataInicio, DataFim, TempoTotal) VALUES ('2024-09-01', '2024-09-30', '150 horas');
        INSERT INTO Periodo (DataInicio, DataFim, TempoTotal) VALUES ('2024-10-01', '2024-10-31', '160 horas');
    END

    -- Verificar e inserir dados na tabela OrdemDeServicos
    IF NOT EXISTS (SELECT * FROM OrdemDeServicos)
    BEGIN
        INSERT INTO OrdemDeServico (ProjetoID, ClienteID, FuncionarioID, AtividadeID, PeriodoID) VALUES (1, 1, 1, 1, 1);
        INSERT INTO OrdemDeServico (ProjetoID, ClienteID, FuncionarioID, AtividadeID, PeriodoID) VALUES (2, 2, 2, 2, 2);
        INSERT INTO OrdemDeServico (ProjetoID, ClienteID, FuncionarioID, AtividadeID, PeriodoID) VALUES (3, 3, 3, 3, 3);
        INSERT INTO OrdemDeServico (ProjetoID, ClienteID, FuncionarioID, AtividadeID, PeriodoID) VALUES (4, 4, 4, 4, 4);
        INSERT INTO OrdemDeServico (ProjetoID, ClienteID, FuncionarioID, AtividadeID, PeriodoID) VALUES (5, 5, 5, 5, 5);
        INSERT INTO OrdemDeServico (ProjetoID, ClienteID, FuncionarioID, AtividadeID, PeriodoID) VALUES (6, 6, 6, 6, 6);
        INSERT INTO OrdemDeServico (ProjetoID, ClienteID, FuncionarioID, AtividadeID, PeriodoID) VALUES (7, 7, 7, 7, 7);
        INSERT INTO OrdemDeServico (ProjetoID, ClienteID, FuncionarioID, AtividadeID, PeriodoID) VALUES (8, 8, 8, 8, 8);
        INSERT INTO OrdemDeServico (ProjetoID, ClienteID, FuncionarioID, AtividadeID, PeriodoID) VALUES (9, 9, 9, 9, 9);
        INSERT INTO OrdemDeServico (ProjetoID, ClienteID, FuncionarioID, AtividadeID, PeriodoID) VALUES (10, 10, 10, 10, 10);
    END

    -- Verificar e inserir dados na tabela Usuario
    IF NOT EXISTS (SELECT * FROM Usuarios)
    BEGIN
        INSERT INTO Usuarios (Nome, Senha, Email) VALUES ('admin', '123456', 'admin@osapi.com');
        INSERT INTO Usuarios (Nome, Senha, Email) VALUES ('maria', 'senha123', 'maria@osapi.com');
        INSERT INTO Usuarios (Nome, Senha, Email) VALUES ('joao', 'senha123', 'joao@osapi.com');
        INSERT INTO Usuarios (Nome, Senha, Email) VALUES ('ana', 'senha123', 'ana@osapi.com');
        INSERT INTO Usuarios (Nome, Senha, Email) VALUES ('pedro', 'senha123', 'pedro@osapi.com');
        INSERT INTO Usuarios (Nome, Senha, Email) VALUES ('carla', 'senha123', 'carla@osapi.com');
        INSERT INTO Usuarios (Nome, Senha, Email) VALUES ('lucas', 'senha123', 'lucas@osapi.com');
        INSERT INTO Usuarios (Nome, Senha, Email) VALUES ('fernando', 'senha123', 'fernando@osapi.com');
        INSERT INTO Usuarios (Nome, Senha, Email) VALUES ('julia', 'senha123', 'julia@osapi.com');
        INSERT INTO Usuarios (Nome, Senha, Email) VALUES ('marcos', 'senha123', 'marcos@osapi.com');
    END
    `

    let message = 'Tabelas criadas com sucesso!'

    await pool.request().query(criarTabelas)

    if (gerarDados == true) {
      await pool.request().query(inserirDados)
      message += ' Tabelas populadas com sucesso!'
    }

    console.log(message)
  } catch (err) {
    console.error('Erro ao criar tabelas:', err)
  }
}

const initDB = async () => {
  try {
    await sequelize.sync({ force: false })
    console.log('Tabelas sincronizadas com sucesso!')
  } catch (error) {
    console.error('Erro ao sincronizar as tabelas:', error)
  }
}

deveGerar = config.get('db.gerarDados')

iniciarBanco(deveGerar == Boolean ? false : deveGerar)

initDB()
