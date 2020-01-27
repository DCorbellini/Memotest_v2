/// <reference types="Cypress" />
const URL = 'http://192.168.137.1:8080';

context ('Memotest_v2', () => {
    
    before (() => {
        cy.visit(URL);
    });

    it ('test', () => {

    });


});