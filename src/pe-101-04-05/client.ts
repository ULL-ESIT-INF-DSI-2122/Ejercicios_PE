import * as net from 'net';

/**
 * @class cliente
 * @description permite crear un socket cliente
 */
class cliente{
    /**
     * Constructor de la clase cliente
     * @param puerto Puerto al que se desea conectar
     * @param comando Comando que se desea ejecutar
     */
    constructor(private puerto: number, private comando: string[]){}

    /**
     * Función para mandar comando al servidor
     */
    public execute(){
        if(process.argv.length > 2){
            const client = new net.Socket();
            
            client.connect({port: this.puerto}, () => {
                console.log('Conexión establecida con el servidor con puerto: ' + this.puerto);
                
                const json_command = JSON.stringify({c: this.comando[0], a: this.comando.slice(1)});
                client.write(json_command);
        
                console.log('Enviando comando: ' + this.comando.join(" "));
                
                client.on('data', function(chunk) {
                    console.log(`Datos recibidos: ${chunk.toString()}`)
                });
            });
        
        } else
            console.log("Debe indicar un comando para realizar en el servidor.");
    }
}

let c: cliente = new cliente(60300, process.argv.slice(2));
c.execute();