import {MongoClient} from 'mongodb';

/**
 * Permite eliminar un atleta de la base de datos
 * @param NIFNIE NIF o NIE del atleta que se desea eliminar
 */
export function deletion(NIFNIE: string) {
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

        return db.collection<AthleteInterface>('athletes').deleteOne({
            NIFNIE: NIFNIE,
        });
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
}

deletion('123456789A');