const app = require('./src/app.js');
const { conn } = require('./src/db.js');

//socket.io

// const { Server } = require('socket.io')
// const { createServer } = require('node:http')
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, { cors: {origin: '*'}
})

io.on('connection', (socket) => {
  console.log('a user has connected')
  
  socket.on('mensaje', (msg) => {
    
    io.emit('chat_message', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('an user is disconnected');
  })
})

//obtener los datos del json¡
const { ingresos, gastos} = require('./categories.json');
//tabla User
const  {CategoryIncome, CategoryBills, Access, User} = require('./src/db.js');

//RANDOM PARA INGRESARLOS A LA BASE DE DATOS
const typeAccess = ["admin", "user"];

// Syncing all the models at once.
conn.sync({ force: false }).then(async() => {

  //Insertando datos dentro de la tabla User

  //SI GUSTAN USAR LOS DATOS DEL JSON EN LA TABLA USER, DESCOMENTEN EL CODIGO DE ABAJO JUNTO CON SUS IMPORTACIONES

  ingresos.forEach(async(element) => {
    await CategoryIncome.findOrCreate({where: {name: element}})
  })

  gastos.forEach(async(element) => {
    await CategoryBills.findOrCreate({where: {name: element}})
  })

  typeAccess.forEach(async(element) => {
    await Access.findOrCreate({where: {name: element}})
  })

  await User.findOrCreate({where: {name: 'admin', email: 'admin@gmail.com', password: '$2b$10$aLPR0WQjxrtcLftujnZyG.em/0x8/y6OnNRDkE/jY3lC4LVT4DhqC', idAccess: 1}})
  


  server.listen(3001, () => {
    console.log('%s listening at 3001');
   // eslint-disable-line no-console
  });
});

