import { expect } from 'chai';
import { prueba } from "../src/test-program"
import { AddMapReduce, SubMapReduce, ProdMapReduce, DivMapReduce } from "../src/pe-101-20-04"

describe("Tests de prueba", () => {
    expect(prueba()).to.be.equal(2);
})

describe("Tests ejercicios PE101 - 20/04/2022", () => {
    it("El algoritmo de la clase AddMapReduce funciona correctamente", () => {
        let add: AddMapReduce = new AddMapReduce([1,2,3]);
        expect(add.algorithm(x => x+3)).to.be.equal(15);
    })

    it("El algoritmo de la clase SubMapReduce funciona correctamente", () => {
        let sub: SubMapReduce = new SubMapReduce([1,2,3]);
        expect(sub.algorithm(x => x+3)).to.be.equal(-15);
    })

    it("El algoritmo de la clase ProdMapReduce funciona correctamente", () => {
        let prod: ProdMapReduce = new ProdMapReduce([1,2,3]);
        expect(prod.algorithm(x => x+1)).to.be.equal(24);
    })

    it("El algoritmo de la clase DivMapReduce funciona correctamente", () => {
        let div: DivMapReduce = new DivMapReduce([8,4]);
        expect(div.algorithm(x => x)).to.be.equal(2);
    })
})