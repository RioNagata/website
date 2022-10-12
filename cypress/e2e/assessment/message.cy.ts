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
  const message = 'hello'
  it('join room and message', () => {
    cy.visit('http://localhost:4200/chat');
    cy.get('[name="roomslist"]').select('room5');
    cy.get('option').contains('room5').then(option => {
      option[0].click();
    });
    cy.contains('button', 'Join').click();
    cy.get('input[name = messagecontent]').type(message);
    cy.contains('button', 'Chat').click();
  })
})