import {MongoClient} from 'mongodb';

/**
 * Permite realizar una consulta basada en el NIF o NIE
 * @param NIFNIE NIF o NIE que se desea consultar
 */
export function consult(NIFNIE: string ) {
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
        useUnifiedTopology: true,
    }).then((client) => {
        const db = client.db(dbName);

        return db.collection<AthleteInterface>('athletes').find({
            NIFNIE: NIFNIE,
        }).toArray();
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
}

consult('123456789A');