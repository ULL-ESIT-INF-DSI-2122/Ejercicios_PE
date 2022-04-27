import {watch, accessSync} from 'fs';
import {exec} from 'child_process';

/**
 * @class fileWatcher
 * @description observa los cambios en un archivo
 */
class fileWatcher{
    /**
     * Constructor de la clase fileWatcher
     * @param fileRoute Ruta del archivo
     * @param command Comando que se desea ejecutar
     * @param output 
     */
    constructor(private fileRoute: string, private command: string, private output: string[] = []){}

    /**
     * Comprueba que la ruta del archivo es accesible
     * @returns true si es accesible, false en caso contrario
     */
    public access(): boolean{
        try{
            accessSync(this.fileRoute);
            return true;
        }catch(err){
            console.log("La ruta dada por parámetro no puede ser accedida.");
            return false;
        }
    }

    /**
     * @description
     * Observa el archivo que se encuentra en la ruta fileRoute y notifica los cambios
     */
    public watch(){
        if(!this.access())
            return;

        console.log("Observed file: " + this.fileRoute);
        watch(this.fileRoute, (eventType, filename) => {
            console.log("\nThe file", filename, "was modified!");
            console.log("The type of change was:", eventType);
            if (eventType == 'rename'){
                console.log("Archivo eliminado o renombrado.");
                process.exit();
            }
            exec(this.command + " " + this.fileRoute, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                this.output.push(stdout);
            });
        });
    }
}

let com = process.argv.slice(3).join(" ");
let example: fileWatcher = new fileWatcher(process.argv[2],com);
example.watch();