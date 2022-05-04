import * as net from 'net';
import { spawn } from 'child_process';

/**
 * @class Servidor
 * @description Permite crear un servidor y conexiones con clientes mediante sockets
 */
class Servidor{
  /**
   * Constructor de la clase servidor
   * @param puerto Puerto de conexión del servidor
   */
  constructor(private puerto: number){}

  /**
   * @description Método para iniciar el servidor
   */
  start(){
    net.createServer((connection) => {
      console.log('Un cliente se ha conectado.');
    
      connection.write(`Conexión establecida.`);
    
      connection.on('close', () => {
        console.log('Un cliente se ha desconectado.');
      });
    
      connection.on('data', (command) => {
        const message = JSON.parse(command.toString())
        let com = spawn(message.c, message.a);
        console.log('Ejecutando comando: ' + com);
    
        com.stderr.on('error', (data) => {
          console.log('Error: ' + data);
        })
    
        com.stdout.on('data', (data) => {
            console.log('Resultado:\n' + data.toString());
            connection.write('Resultado:\n' + data.toString());
            connection.end();
        });
        
        com.on('close', (code) => {
            if (code !== 0)
                console.log(`Código de salida del comando: ${code}`);
        });
      });
      
    }).listen(this.puerto, () => {
      console.log('Esperando clientes...');
    });
  }
}

let s: Servidor = new Servidor(60300);
s.start();
