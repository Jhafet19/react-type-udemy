import server from './server';
import colors from 'colors'

server.listen(3000,()=>{
    console.log(colors.bgWhite( "Escuchando el puerto 3000"))
})