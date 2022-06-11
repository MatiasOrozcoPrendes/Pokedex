import * as SQLite from 'expo-sqlite';
const dbName = 'databasePokemon.db';

const DatabaseConnection = {
    getConnection: () => {
        return SQLite.openDatabase(dbName);
    }
};

export default DatabaseConnection;