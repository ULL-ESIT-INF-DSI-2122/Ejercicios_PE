/**
 * @class Clase abstracta
 */
export abstract class TMethods{
    /**
     * Constructor de la clase abstracta
     * @param vector Array de numeros
     */
    constructor(protected vector: number[]){}

    /**
     * Algoritmo que realiza la operación map y reduce sobre el vector que almacena la clase
     * @param funcion Función que realizará la función map
     * @returns resultado del reduce
     */
    public algorithm(funcion: (x: number)=>number): number{
        let mapped:number[] = this.map(funcion);
        this.afterMap(mapped)
        let reduced:number = this.reduce(mapped);
        this.afterReduce(reduced);
        return reduced;
    }

    /**
     * Método que aplica una operación a cada uno de los elementos del array
     * @param funcion Operación que realiza
     * @returns Vector con el resultado
     */
    protected map(funcion: (x: number)=>number):number[]{
        let result: number[] = [];
        this.vector.forEach(element => result.push(funcion(element)));
        return result;
    }

    /**
     * Método abstracto que reduce los valores de un vector a un único valor
     * @param vector Vector que se reduce
     */
    protected abstract reduce(vector: number[]):number;

    /**
     * Método Hook para actualizar el array
     * @param v Array actualizado
     */
    protected afterMap(v: number[]){
        this.vector = v;
    }

    /**
     * Método Hook para añadir el resultado de reduce
     * @param n Valor a añadir
     */
     protected afterReduce(n: number){
        this.vector.push(n);
    }
}

/**
 * @description Al reducir suma los elementos
 */
export class AddMapReduce extends TMethods{
    /**
     * Constructor de la clase AddMapReduce
     * @param vector Vector que se desea almacenar
     */
    constructor(vector: number[]){super(vector)}

    /**
     * Reduce el vector a la suma de sus elementos
     * @param v Vector a reducir
     * @returns Resultado de la suma
     */
    protected reduce(v: number[]): number {
        let reduced: number = 0;
        v.forEach(element => reduced += element)
        return reduced;
    }
}

/**
 * @description Al reducir resta los elementos
 */
export class SubMapReduce extends TMethods{
    /**
     * Constructor de la clase SubMapReduce
     * @param vector Vector que se desea almacenar
     */
    constructor(vector: number[]){super(vector)}

    /**
     * Reduce el vector a la resta de sus elementos
     * @param v Vector a reducir
     * @returns Resultado de la resta
     */
    protected reduce(v: number[]): number {
        let reduced: number = 0;
        v.forEach(element => reduced -= element)
        return reduced;
    }
}

/**
 * @description Al reducir multiplica los elementos
 */
export class ProdMapReduce extends TMethods{
    /**
     * Constructor de la clase ProdMapReduce
     * @param vector Vector que se desea almacenar
     */
    constructor(vector: number[]){super(vector)}

    /**
     * Reduce el vector a la multiplicación de sus elementos
     * @param v Vector a reducir
     * @returns Resultado de la multiplicación
     */
    protected reduce(v: number[]): number {
        let reduced: number = 1;
        v.forEach(element => reduced *= element)
        return reduced;
    }
}

/**
 * @description Al divide suma los elementos
 */
export class DivMapReduce extends TMethods{
    /**
     * Constructor de la clase DivMapReduce
     * @param vector Vector que se desea almacenar
     */
    constructor(vector: number[]){super(vector)}

    /**
     * Reduce el vector a la división de sus elementos
     * @param v Vector a reducir
     * @returns Resultado de la división
     */
    protected reduce(v: number[]): number {
        let reduced: number = this.vector[0]*this.vector[0];
        v.forEach(element => reduced /= element)
        return reduced;
    }
}