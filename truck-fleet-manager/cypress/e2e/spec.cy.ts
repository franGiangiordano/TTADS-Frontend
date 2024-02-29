describe('Login', () => {
  it('Enter to dashboard', () => {
    cy.visit('/');
    cy.contains('Login');

    cy.get('#email').type('pedrito@gmail.com');

    cy.get('#password').type('123');

    cy.get('.button').click();
  })

  it('Render snackbar on error', () => {
    cy.visit('/');
    cy.contains('Login');

    cy.get('#email').type('pedrito@gmail.com');

    cy.get('#password').type('XXX');

    cy.get('.button').click();

    cy.contains('Contraseña incorrecta');
  })

  it('Render snackbar on error', () => {
    cy.visit('/');
    cy.contains('Login');

    cy.get('#email').type('XXXXXXXXX@gmail.com');

    cy.get('#password').type('XXX');

    cy.get('.button').click();

    cy.contains('Usuario no encontrado');
  })
})

describe('Bateas', () => {
  it('Visits the batea CRUD', () => {
    cy.visit('/');
    cy.contains('Login');

    cy.get('#email').type('pedrito@gmail.com');

    cy.get('#password').type('123');

    cy.get('.button').click();

    cy.url().should('include', '/dashboard');

    cy.get('.menu-button').click();

    cy.get('#menu__item__body_Bateas').click();

    cy.url().should('include', '/bateas');

    cy.get('.mat-drawer-backdrop').click();

    cy.contains('Gestión de Bateas');
    cy.contains('Añadir');
    cy.contains('Patente');
    cy.contains('Acciones');
  })

})
