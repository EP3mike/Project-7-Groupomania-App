//Config for our mssql database
module.exports = {
    HOST: 'MIKE-XPS',
    PORT: 1433,
    USER: 'MyLogin',
    PASSWORD: '123',
    DB: 'Groupomania',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};