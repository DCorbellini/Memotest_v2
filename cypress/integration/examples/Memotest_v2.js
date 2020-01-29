/// <reference types="Cypress" />
const URL = 'http://192.168.137.1:8080';
const Q_CUADROS = 12

context('Memotest_v2', () => {

    before(() => {
        cy.visit(URL);
    });

    it('Corrobora que los cuadros sean aleatorios', () => {

        const clasesOriginales = []
        const clasesNuevas = []

        cy.get('.cuadro').then((cuadros) => {
            cuadros.each((i, cuadro) => {
                clasesOriginales.push(cuadro)
            })
        })

        cy.visit(URL)

        cy.get('.cuadro').then((cuadros) => {
            cuadros.each((i, cuadro) => {
                clasesNuevas.push(cuadro)
            })
        })

        cy.wrap(clasesOriginales).should('not.deep.equal', clasesNuevas)

    });

    describe('Resolver el juego', () => {

        let mapaDePares, listaDePares;

        it('Corrobora una combinacion erronea', () => {

            cy.get('.cuadro').then(cuadros => {
                mapaDePares = obtenerParesDeCuadros(cuadros)
                listaDePares = Object.values(mapaDePares)
                console.table(listaDePares)
                listaDePares[0][0].click()
                listaDePares[1][0].click()

                cy.wait(410).get('.cuadro').should('have.length', Q_CUADROS)
            })

        })

        it('Corrobora que la partida pueda ser ganada', () => {

            listaDePares.forEach((par) => {
                par[0].click()
                par[1].click()
            })

            /*
            for(let i=0; i<listaDePares.length; i++){
                for(let j=0; j<2; j++){
                    listaDePares[i][j].click()
                }
            }*/

            
            cy.wait(410).get('.cuadro').should('have.length', 0)
        })


    })

})



function obtenerParesDeCuadros(cuadros) {

    const pares = {}

    cuadros.each((i, cuadro) => {
        const claseColor = cuadro.className.replace('cuadro oculto ', '')

        if (pares[claseColor]) {
            pares[claseColor].push(cuadro);
        } else {
            pares[claseColor] = [cuadro]
        }
    })
    
    console.table(pares)
    return pares
}
