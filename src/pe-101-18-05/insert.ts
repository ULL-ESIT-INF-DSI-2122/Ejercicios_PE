import {connect, model, Schema} from 'mongoose';

/**
 * Permite insertar un atleta a la base de datos
 * @param nombre Nombre del atleta
 * @param apellidos Apellidos del atleta
 * @param NIFNIE NIF o NIE del atleta
 * @param edad Edad del atleta
 * @param deporte Deporte que practica el atleta
 */
export function insert(nombre: string, apellidos: string, NIFNIE: string, edad: number, deporte: string) {
    connect('mongodb://127.0.0.1:27017/Athletes', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(() => {
        console.log('Connected to the database');
    }).catch(() => {
        console.log('Something went wrong when conecting to the database');
    });

    interface AthleteInterface {
        nombre: string,
        apellidos: string,
        NIFNIE: string,
        edad: number,
        deporte: 'atletismo' | 'ciclismo' | 'natación' | 'voleyball' | 'fútbol' | 'baloncesto' | 'tenis'
    }
    
    const AthleteSchema = new Schema<AthleteInterface>({
        nombre: {
        type: String,
        },
        apellidos: {
        type: String,
        },
        NIFNIE: {
        type: String,
        },
        edad: {
        type: Number,
        },
        deporte: {
        type: String,
        }
    });

    const Athlete = model<AthleteInterface>('Athlete', AthleteSchema);

    const athlete = new Athlete({
        nombre: nombre,
        apellidos: apellidos,
        NIFNIE: NIFNIE,
        edad: edad,
        deporte: deporte
    }); 

    athlete.save().then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
}

insert('Lionel Andrés', 'Messi Cuccittini', '123456789A', 34, 'fútbol');