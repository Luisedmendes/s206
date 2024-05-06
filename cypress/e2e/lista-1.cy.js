/// <reference types="cypress"/>

describe('Criando cenários de testes para o site da automationexercise', () => {
  it ('Caso de teste: Não deve conseguir registrar com o mesmo endereço', () => {
    cy.visit('https://automationexercise.com/signup')
    cy.get('[data-qa="signup-name"]').type('Teste')
    cy.get('[data-qa="signup-email"]').type('teste@gmail.com')
    cy.get('[data-qa="signup-button"]').click()
    cy.get('.signup-form > form > p').should('have.text', 'Email Address already exist!')
  })
  
 
  it ('Caso de teste: Deve conseguir registrar um usuario', () => {
    criarUsuario();
    cy.get('[data-qa="password"]').type('123456')
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('1')
    cy.get('[data-qa="years"]').select('2000')
    cy.get('[data-qa="first_name"]').type('Teste')
    cy.get('[data-qa="last_name"]').type('Teste')
    cy.get('[data-qa="address"]').type('Teste')
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('Alabama')
    cy.get('[data-qa="city"]').type('Autauga')
    cy.get('[data-qa="zipcode"]').type('36001')
    cy.get('[data-qa="mobile_number"]').type('123456789')
    cy.get('[data-qa="create-account"]').click()
    cy.get('.col-sm-9').should('contain.text', '\n\t\t\t\t\tAccount Created!\n\t\t\t\t\tCongratulations! Your new account has been successfully created!\n\t\t\t\t\tYou can now take advantage of member privileges to enhance your online shopping experience with us.\n\t\t\t\t\tContinue\n\t\t\t\t')
  })

  it ('Caso de teste: Deve conseguir adicionar um item no carrinho', () => {
    cy.visit('https://automationexercise.com/')
    cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
    cy.get('.modal-body > :nth-child(1)').should('contain.text', 'Your product has been added to cart.')
  })

  it ('Caso de teste: No carrinho deve aparecer o produto adicionado', () => {
    cy.visit('https://automationexercise.com/')
    cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
    cy.get('u').click()
    cy.get('.cart_description > h4').should('contain.text', 'Blue Top')
  })

  it('Caso de teste: Não deve ser possivel prosseguir para checkout sem login', () => {
    addProductToCart()
    cy.get('.col-sm-6 > .btn').click()
    cy.get('.modal-body > :nth-child(1)').should('contain.text', 'Register / Login account to proceed on checkout.')

  })

  it('Caso de teste: Deve ser possível realizar login', () => {
    cy.visit('https://automationexercise.com/login')
    cy.get('[data-qa="login-email"]').type('emaildeteste@outlook.com')
    cy.get('[data-qa="login-password"]').type('123')
    cy.get('[data-qa="login-button"]').click()
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('contain.text', 'Logout')
  })

  
  
})

function criarUsuario() {
  
  let horas = new Date().getHours().toString()
  let minutos = new Date().getMinutes().toString()
  let segundos = new Date().getSeconds().toString()
  let user = horas + minutos + segundos + 'id'
  let email =  horas + minutos + segundos + 'email'
  let userInfo = [user, email]
  cy.visit('https://automationexercise.com/signup')
  cy.get('[data-qa="signup-name"]').type(user)
  cy.get('[data-qa="signup-email"]').type(email + '@gmail.com')
  cy.get('[data-qa="signup-button"]').click()
  

  return userInfo
}

function addProductToCart() {
  cy.visit('https://automationexercise.com/')
  cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
  cy.get('u').click()
}