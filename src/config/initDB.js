const { sql, poolPromise } = require('./db');

const createTables = async () => {
  try {
    const pool = await poolPromise;
    
    const createOrdensTable = `
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Ordens' and xtype='U')
      CREATE TABLE Ordens (
        id INT PRIMARY KEY IDENTITY(1,1),
        descricao NVARCHAR(255) NOT NULL,
        cliente NVARCHAR(255) NOT NULL,
        status NVARCHAR(50) NOT NULL,
        dataCriacao DATETIME DEFAULT GETDATE()
      )
    `;

    await pool.request().query(createOrdensTable);
    
    console.log('Tabela Ordens criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabelas:', err);
  }
};

createTables();