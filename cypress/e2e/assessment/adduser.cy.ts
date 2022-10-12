describe('empty spec', () => {
  const addusername = 'luke'
  const adduseremail = 'luke@gmail.com'
  const adduserrole = 'user'
  const adduserpassword = '123'
  const addid = '10'

  it('adds user', () => {
    cy.visit('http://localhost:4200/add');
    cy.get('input[name=email]').type(adduseremail);
    cy.get('input[name=password]').type(adduserpassword);
    cy.get('input[name=userid]').type(addid);
    cy.get('input[name=username]').type(addusername);
    cy.get('input[name=userrole]').type(adduserrole);
    cy.get('button[type=submit]').click();
    cy.visit('http://localhost:4200/user');
    cy.contains('luke');
  });
})