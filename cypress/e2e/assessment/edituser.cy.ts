describe('empty spec', () => {
  const updateusername = 'gordon'
  const updateuseremail = 'gordon@gmail.com'
  const updateuserrole = 'gassist'
  const updateuserpassword = '1234'
  it('updates user', () => {
    cy.visit('http://localhost:4200/update/10');
    cy.get('input[name=updateemail]').type(updateuseremail);
    cy.get('input[name=updatepassword]').type(updateuserpassword);
    cy.get('input[name=updatename]').type(updateusername);
    cy.get('input[name=updaterole]').type(updateuserrole);
    cy.get('button[type=submit]').click();
    cy.visit('http://localhost:4200/user');
    cy.contains('gordon');
  })
})