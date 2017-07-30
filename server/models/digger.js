var connection = require('./main')

module.exports.doSome = function (d) {
  var test = '1 + 1 as res'
  var inputs = []
  inputs.push(d.Row_ID)
  inputs.push(d.Order_ID)
  inputs.push(d.Order_Date)
  inputs.push(d.Order_Priority)
  inputs.push(d.Order_Quantity)
  inputs.push(d.Sales)
  inputs.push(d.Discount)
  inputs.push(d.Ship_Mode)
  inputs.push(d.Profit)
  inputs.push(d.Unit_Price)
  inputs.push(d.Shipping_Cost)
  inputs.push(d.Customer_Name)
  inputs.push(d.Province)
  inputs.push(d.Region)
  inputs.push(d.Customer_Segment)
  inputs.push(d.Product_Category)
  inputs.push(d.Product_Sub_Category)
  inputs.push(d.Product_Name)
  inputs.push(d.Product_Container)
  inputs.push(d.Product_Base_Margin)
  inputs.push(d.Ship_Date_)

  return new Promise(function(resolve, reject) {
    connection.query(`

      INSERT INTO
	       sample
      VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)

      `, inputs ,function(err, result, fields){
        if (err) {
          console.log('Hubo un error, description -->', err);
        } else {
          resolve(result)
        }
    })
  })
}

module.exports.doTruncate = function () {
  return new Promise(function(resolve, reject) {
    connection.query(`

      TRUNCATE TABLE
        sample
      `, function(err, result, fields){
          if (err) {
            console.log('Hubo un error con la conexion MySql');
          } else {
            resolve()
          }
    })
  })
}

module.exports.getInfo = function (d) {
  console.log('aquiiiiiiiiiiii', d);
  return new Promise(function(resolve, reject) {
    connection.query(`

      SELECT
        *
      from
        files
      where
        nombre = ?

      `, [d.file] ,function(err, result, fields){
      if (err) {
        console.log('Hubo un error al traer la informacion, description -->', err);
      } else {
        resolve(result)
      }
    })
  })
}
