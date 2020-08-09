import {selectSql, InsertOrDeleteSql} from './Sql';

// Users
export const getUserById = id => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `SELECT * FROM users WHERE ID = '${id}'`;
    try {
      const result = await selectSql(sqlCommand);

      if (result.length === 0)
        reject({message: `No Users whith this id: ${id}`});
      else resolve(result[0]);
    } catch (err) {
      reject(err);
    }
  });
};

// Products
export const getAllProducts = () => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `SELECT * FROM PRODUCTS INNER JOIN CATEGORIES on PRODUCTS.ID_CAT = CATEGORIES.ID_CAT`;
    try {
      const result = await selectSql(sqlCommand);

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

export const getProductById = id => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `SELECT * FROM PRODUCTS INNER JOIN CATEGORIES on PRODUCTS.ID_CAT = CATEGORIES.ID_CAT WHERE ID_PRODUCT = ${id}`;
    try {
      const result = await selectSql(sqlCommand);

      if (result.length === 0)
        reject({message: `No Product whith this id: ${id}`});
      else resolve(result[0]);
    } catch (err) {
      reject(err);
    }
  });
};

export const getProductByBarCode = barcode => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `SELECT * FROM PRODUCTS WHERE BARCODE = '${barcode}'`;
    try {
      const result = await selectSql(sqlCommand);

      if (result.length === 0)
        reject({message: `No Product whith this BARCODE: ${barcode}`});
      else resolve(result[0]);
    } catch (err) {
      reject(err);
    }
  });
};

export const addProduct = payload => {
  return new Promise(async (resolve, reject) => {
    const {barcode, label, qte, price, id_cat} = payload;
    const sqlCommand = `INSERT INTO PRODUCTS (BARCODE, LABEL_PRODUCT, QTE_IN_STOCK, PRICE, ID_CAT ) VALUES (${
      barcode ? `'${barcode}'` : null
    }, '${label}', ${qte}, ${price}, ${id_cat});`;

    try {
      const result = await InsertOrDeleteSql(sqlCommand);

      resolve(result.insertId);
    } catch (err) {
      reject(err);
    }
  });
};

export const editProduct = payload => {
  return new Promise(async (resolve, reject) => {
    const {barcode, label, qte, price, id_cat, id} = payload;

    const sqlCommand = `UPDATE PRODUCTS SET BARCODE = ${
      barcode ? `'${barcode}'` : null
    }, LABEL_PRODUCT = '${label}', QTE_IN_STOCK = ${qte}, PRICE = ${price}, ID_CAT = ${id_cat} WHERE ID_PRODUCT = ${id};`;

    try {
      const result = await InsertOrDeleteSql(sqlCommand);

      console.log(result);

      resolve(result.insertId);
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteProduct = id => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `DELETE FROM PRODUCTS WHERE ID_PRODUCT = ${id}`;
    try {
      const result = await InsertOrDeleteSql(sqlCommand);

      resolve(result.rowsAffected);
    } catch (err) {
      reject(err);
    }
  });
};

// Categories
export const getAllCategories = () => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `SELECT * FROM CATEGORIES`;
    try {
      const result = await selectSql(sqlCommand);

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

export const addCategory = categorie => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `INSERT INTO CATEGORIES (DESCRIPTION_CAT) VALUES ('${categorie}')`;
    try {
      const result = await InsertOrDeleteSql(sqlCommand);

      resolve(result.insertId);
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteCategory = id => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `DELETE FROM CATEGORIES WHERE ID_CAT = ${id}`;
    try {
      const result = await InsertOrDeleteSql(sqlCommand);

      resolve(result.rowsAffected);
    } catch (err) {
      reject(err);
    }
  });
};

// Users
export const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `SELECT * FROM users`;
    try {
      const result = await selectSql(sqlCommand);

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

export const addUser = payload => {
  return new Promise(async (resolve, reject) => {
    const {UserName, FullName, hashedPass, UserType} = payload;

    const sqlCommand = `INSERT INTO users (ID, FullName, PWD, UserType) VALUES ('${UserName}', '${FullName}', '${hashedPass}', '${UserType}');`;

    try {
      const result = await InsertOrDeleteSql(sqlCommand);

      resolve(result.insertId);
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteUser = id => {
  console.log(id);
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `DELETE FROM users WHERE ID = '${id}'`;
    try {
      const result = await InsertOrDeleteSql(sqlCommand);

      resolve(result.rowsAffected);
    } catch (err) {
      reject(err);
    }
  });
};

// customers
export const getAllCustomers = () => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `SELECT * FROM CUSTOMERS`;
    try {
      const result = await selectSql(sqlCommand);
      console.log(result);

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};
//

export const addCustomer = payload => {
  return new Promise(async (resolve, reject) => {
    const {firstName, lastName, tel, email} = payload;
    const sqlCommand = `INSERT INTO CUSTOMERS ("FIRST_NAME", "LAST_NAME", "TEL", "email") VALUES ('${firstName}', '${lastName}', '${tel}', '${email}');`;

    try {
      const result = await InsertOrDeleteSql(sqlCommand);

      resolve(result.insertId);
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteCustomer = id => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `DELETE FROM CUSTOMERS WHERE ID_CUSTOMER = ${id}`;
    try {
      const result = await InsertOrDeleteSql(sqlCommand);

      resolve(result.rowsAffected);
    } catch (err) {
      reject(err);
    }
  });
};

// Orders
export const getAllOrders = () => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `SELECT * FROM ORDERS`;
    try {
      const result = await selectSql(sqlCommand);

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

export const getOrderById = id => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `SELECT * FROM ORDERS INNER JOIN CUSTOMERS on CUSTOMERS.ID_CUSTOMER = ORDERS.ID_CUSTOMER WHERE ID_ORDER = ${id}`;
    try {
      const result = await selectSql(sqlCommand);

      if (result.length === 0)
        reject({message: `No Orders whith this id: ${id}`});
      else resolve(result[0]);
    } catch (err) {
      reject(err);
    }
  });
};

export const addOrder = ({orderDetails, description, fullName, idCustomer}) => {
  return new Promise(async (resolve, reject) => {
    let sqlCommand = `INSERT INTO ORDERS (DATE_ORDER, DESCRIPTION_ORDER, SALESMAN, ID_CUSTOMER) VALUES (CURRENT_TIMESTAMP, '${description}', '${fullName}', ${idCustomer});`;
    try {
      // adding the order
      const result = await InsertOrDeleteSql(sqlCommand);
      const idOrder = result.insertId;

      // adding the order details
      sqlCommand = `INSERT INTO ORDERS_DETAILS (ID_PRODUCT, ID_ORDER, QTE, PRICE, DISCOUNT, AMOUNT, TOTAL_AMOUNT) 
      VALUES (${orderDetails[0].ID_PRODUCT}, ${idOrder}, ${
        orderDetails[0].QTE
      }, ${orderDetails[0].PRICE}, ${orderDetails[0].DISCOUNT}
        , ${orderDetails[0].AMOUNT}, ${orderDetails[0].TOTAL_AMOUNT})`;

      // updating the qte while looping
      await InsertOrDeleteSql(`UPDATE PRODUCTS
          SET QTE_IN_STOCK = ${orderDetails[0].QTE_IN_STOCK -
            orderDetails[0].QTE}
          WHERE ID_PRODUCT = ${orderDetails[0].ID_PRODUCT};)`);

      for (let i = 1; i < orderDetails.length; i++) {
        sqlCommand += `, (${orderDetails[i].ID_PRODUCT}, ${idOrder}, ${
          orderDetails[i].QTE
        }, ${orderDetails[i].PRICE}, ${orderDetails[i].DISCOUNT}
          , ${orderDetails[i].AMOUNT}, ${orderDetails[i].TOTAL_AMOUNT})`;

        // updating the qte while looping
        await InsertOrDeleteSql(`UPDATE PRODUCTS
          SET QTE_IN_STOCK = ${orderDetails[i].QTE_IN_STOCK -
            orderDetails[i].QTE}
          WHERE ID_PRODUCT = ${orderDetails[i].ID_PRODUCT};)`);
      }

      sqlCommand += ';';

      await InsertOrDeleteSql(sqlCommand);

      resolve(idOrder);
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteOrder = id => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `DELETE FROM ORDERS_DETAILS WHERE ID_ORDER = ${id}`;

    try {
      await InsertOrDeleteSql(sqlCommand);
      const result = await InsertOrDeleteSql(
        `DELETE FROM ORDERS WHERE ID_ORDER = ${id}`,
      );

      resolve(result.rowsAffected);
    } catch (err) {
      reject(err);
    }
  });
};

//  order Details
export const getAllOrderDetails = () => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `SELECT * FROM ORDERS_DETAILS`;
    try {
      const result = await selectSql(sqlCommand);

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

export const getOrderDetailsById = id => {
  return new Promise(async (resolve, reject) => {
    const sqlCommand = `SELECT * FROM ORDERS_DETAILS INNER JOIN PRODUCTS on PRODUCTS.ID_PRODUCT = ORDERS_DETAILS.ID_PRODUCT
    INNER JOIN ORDERS on ORDERS.ID_ORDER = ORDERS_DETAILS.ID_ORDER INNER JOIN CUSTOMERS on CUSTOMERS.ID_CUSTOMER = ORDERS.ID_CUSTOMER WHERE ORDERS_DETAILS.ID_ORDER = ${id}`;
    try {
      const result = await selectSql(sqlCommand);

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};
