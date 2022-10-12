describe('empty spec', () => {
  it('deletes user', ()=>{
    cy.visit('http://localhost:4200/user');
    cy.contains('button', 'Delete luke').click();
  })
})