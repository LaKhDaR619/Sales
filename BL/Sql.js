import {openDatabase} from 'react-native-sqlite-storage';

function errorCB(err) {
  console.log('SQL Error: ' + err);
}

function openCB() {
  console.log('Database OPENED');
  db.executeSql(
    'PRAGMA foreign_keys = ON;',
    [],
    () => console.log('foreign_keys ON'),
    err => console.log(err),
  );
}

const db = openDatabase(
  {
    name: 'main.db',
    createFromLocation: '~/main.db',
    location: 'Library',
  },
  openCB,
  errorCB,
);

export function selectSql(sqlCommand, args = []) {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(sqlCommand, args, (tx, res) => {
          console.log('Sql');
          console.log(res);

          const result = [];

          // puting the data in an array
          for (let i = 0; i < res.rows.length; i++) {
            result.push(res.rows.item(i));
          }

          resolve(result);
        });
      },
      error => {
        console.log(`err: ${error.message}`);
        reject(error);
      },
    );
  });
}

export function InsertOrDeleteSql(sqlCommand, args = []) {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(sqlCommand, args, (tx, res) => {
          console.log('Sql');
          console.log(res);

          const result = {
            insertId: res.insertId,
            rowsAffected: res.rowsAffected,
          };

          resolve(result);
        });
      },
      error => {
        console.log(`err: ${error.message}`);
        reject(error);
      },
    );
  });
}

export function closeDB() {
  console.log('Database Closed');
  console.log(db);
  db.close().then(status => console.log(status));
}
