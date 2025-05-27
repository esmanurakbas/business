// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to handle Shopify password protection
Cypress.Commands.add('enterStorefrontPassword', (password) => {
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  
  // Wait for the password page to be processed
  cy.wait(2000);
});

// Custom command to accept cookies
Cypress.Commands.add('acceptCookies', () => {
  // Try different selectors commonly used for cookie consent buttons
  cy.get('body').then(($body) => {
    // Common cookie consent button selectors
    const selectors = [
      // Shopify common cookie consent selectors
      '[data-testid="accept-cookies"]',
      '.shopify-section--popup button',
      '.cookie-consent button',
      '.cookie-banner button',
      '.cookie-consent__button',
      '.cookie-banner__button',
      // Generic selectors
      '[aria-label="Accept cookies"]',
      '[aria-label="Accept all cookies"]',
      'button:contains("Accept")',
      'button:contains("Accept all")',
      'button:contains("Accept cookies")',
      '.cc-accept',
      '.cc-allow',
      '#accept-cookies',
      '.accept-cookies'
    ];

    // Try each selector
    for (const selector of selectors) {
      if ($body.find(selector).length > 0) {
        cy.get(selector).first().click({force: true});
        return;
      }
    }
    
    // If no cookie banner is found, log it but continue the test
    cy.log('No cookie consent banner found or it was already accepted');
  });
});
