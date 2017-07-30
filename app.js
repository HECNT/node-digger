var express = require('express')
    app = express()

app.use(express.static(__dirname + '/public'))

app.listen(3002, function(){
  console.log('Escuchando en el puerto 3002');
})
