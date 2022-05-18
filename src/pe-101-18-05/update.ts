import {MongoClient} from 'mongodb';

/**
 * Permite modificar el nombre, los apellidos y la edad de un atleta
 * @param nombre Nombre nuevo
 * @param apellidos Apellidos nuevo
 * @param NIFNIE NIF o NIE nuevo
 * @param edad Edad nueva
 */
export function update(nombre: string, apellidos: string, NIFNIE: string, edad: number) {
    const dbURL = 'mongodb://127.0.0.1:27017';
    const dbName = 'Athletes';

    interface AthleteInterface {
        nombre: string,
        apellidos: string,
        NIFNIE: string,
        edad: number,
        deporte: 'atletismo' | 'ciclismo' | 'natación' | 'voleyball' | 'fútbol' | 'baloncesto' | 'tenis'
    }

    MongoClient.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((client) => {
        const db = client.db(dbName);

        return db.collection<AthleteInterface>('athletes').updateOne({
            NIFNIE: NIFNIE,
          }, {
            $set: {
                nombre: nombre,
                apellidos: apellidos,
                edad: edad
            },
          });
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
}

update('Lionel', 'Messi Cuccittini', '123456789A', 37);