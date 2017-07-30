var request     = require('request')
    dialog      = require('dialog');
    Digger      = require('./server/controllers/digger')
    promise     = require('bluebird')
    global.file = require('underscore')
    mail        = require('./server/modules/mail')
    nodemailer  = require('nodemailer')


process.argv.forEach(function (val, index, array) {
  if (array.length > 3) {
    dialog.info('Solo puedes ingresar un parametro')
  } else {
    global.file = array[2]
  }
})

var datos = {
  file : global.file
}

Digger.getInfo(datos)
.then(function (result) {
  if (result.length == 0) {
    dialog.info('No se encontro informacion con el parametro recibido')
    process.exit()
  } else {
    // HACEMOS PETICION A LA URL PARA DESCARGAR EL ARCHIVO
    request(result[0].url, function (error, response, body) {
      if (error) {
        console.log('Hubo un error desciption -->', error);
      } else {
        // LEEMOS EL ARCHIVO Y HACEMOS SPLIT PARA OBTENER LOS HEADERS
        var arr     = body.split('\n')
        var headers = arr[0]
            headers = headers.replace(/\s+/g,'_')
            if (result[0].nombre == 'user.csv') {

            } else {
              headers = headers.replace('Product_Sub-Category','Product_Sub_Category')
            }

            json    = {}
        console.log('Obteniendo informacion');
        headers = headers.split(',')

        var data_arr = []
        arr.forEach(function (item) {
          var obj = {}
          var data = item.split(",");
          for(var i = 0; i < headers.length; i++) {
            obj[headers[i]] = data[i];
          }
          data_arr.push(obj)
        })
        var conteo  = data_arr.length
        var ini     = 0
        Digger.doTruncate(result)
        .then(function(result){
          if (!result.err) {
            console.log('Se borro informacion anterior');
            promise.each(data_arr, function(item){
              return new Promise(function(resolve, reject) {
                Digger.doSome(item)
                .then(function(result){
                  console.log('INSERTANDO INFORMACION ' + ini + ' de ' + conteo);
                  ini++
                  resolve()
                })
              })
            })
            .then(function(result){
              dialog.info('Se termino de insertar la informacion a la tabla')
              console.log('Todo termino');
              mail.enviarMail('gameleds@gmail.com','Se completo la insercion de datos a la base de datos total: '+ conteo,'Reporte carga de informacion base de datos');
              setTimeout(function () {
                process.exit()
              }, 3000);

            })
          } else {
            alert('Hubo un error al truncar la tabla')
          }
        })
      }
    });
  }
})
