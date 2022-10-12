describe('empty spec', () => {
  const username = 'Rio'
  const password = '123'
  it('logs in', () => {
    cy.visit('http://localhost:4200')
    cy.get('input[name=username]').type(username);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click();
    cy.contains('Chat Channel');
  })
})