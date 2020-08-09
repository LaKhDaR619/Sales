import {openDatabase} from 'react-native-sqlite-storage';

import RNFS from 'react-native-fs';

export function backupDB(path) {
  RNFS.readFile('/data/data/com.sales/databases/main.db', 'base64')
    .then(async value => {
      const temp = RNFS.DownloadDirectoryPath;

      console.log('RNFS');
      console.log(temp);

      const copydir = `${temp}/database_copy.db`;

      RNFS.writeFile(copydir, value, 'base64')
        .then(() => console.log('Successful'))
        .catch(err => console.log(err.message));
    })
    .catch(err => console.log(err.message));
}

export async function restoreDB(path) {
  const copydir = `${path}/database_copy.db`;

  const filePath = `/data/data/com.sales/databases/main.db`;

  const res = await RNFS.exists(filePath);
  if (res) {
    RNFS.unlink(filePath).then(() => console.log('FILE DELETED'));
  }

  RNFS.readFile(copydir, 'base64').then(value => {
    RNFS.writeFile(
      '/data/data/com.sales/databases/main.db',
      value,
      'base64',
    ).then(() => {
      console.log('restored DB');

      openDatabase({
        name: 'main.db',
        createFromLocation: '~/main.db',
        location: 'Library',
      });
      console.log('Successful');
    });
  });
}
