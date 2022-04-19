import { expect } from 'chai';
import { prueba } from "../src/test-program"

describe("Tests de prueba", () => {
    expect(prueba()).to.be.equal(2);
})