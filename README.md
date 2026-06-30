Automation & Cypress Fundamentals Research & Practice
PART A: Test Structure
describe()
Purpose: Group related tests together into a single block or suite.
Syntax: describe('Description of the suite', () => { /* tests go here */ });
Example:
describe('Login Functionality', () => {
  // Individual tests go inside here
});
Real-World Use Case: Grouping all the different tests related to a website's shopping cart checkout process.

it()
Purpose: Define a single, specific test case.
Syntax: it('Should do something specific', () => { /* test steps and assertions */ });
Example:
it('Should log in successfully with valid credentials', () => {
  // Steps to type username, password, and click submit
});
Real-World Use Case: Verifying that clicking the "Forgot Password" link actually opens the password reset page.

before()
Purpose: Run a piece of code exactly once before any tests in the current group start.
Syntax: before(() => { /* setup code */ });
Example:
before(() => {
  // Connect to the test database
});
Real-World Use Case: Launching the Chrome browser at the very beginning of a UI test suite before executing any test steps.

beforeEach()
Purpose: Run a piece of code before every single individual test (it block) in the group.
Syntax: beforeEach(() => { /* reset code */ });
Example:
beforeEach(() => {
  // Navigate to the homepage
});
Real-World Use Case: Clearing browser cookies and navigating back to the login page before starting the next test to ensure a clean slate.

after()
Purpose: Run a piece of code exactly once after all the tests in the current group have finished.
Syntax: after(() => { /* cleanup code */ });
Example:
after(() => {
  // Close the database connection
});
Real-World Use Case: Closing the browser window and shutting down the automation server once all tests are completed.

afterEach()
Purpose: Run a piece of code immediately after every single individual test (it block) finishes.
Syntax: afterEach(() => { /* cleanup code */ });
Example:
afterEach(() => {
  // Delete test data created during the test
});
Real-World Use Case: Taking a screenshot of the application if a test fails so the QA team can see what went wrong.

PART B: Assertions
The difference between assertions is that expect() is a function call, you pass the actual value into the function as a parameter and it reads like a statement. While should() is a property extension, it attaches itself directly to the object you are testing and it reads like a natural English sentence.

Use expect() when:
Safety is a priority: If a web element or API response might return null or undefined, expect() will fail gracefully with a clear error message (e.g., Expected undefined to equal 'Pass').
You use modern tools: Frameworks like Jest, Playwright, and Cypress use expect() as their default build-in assertion tool.
Strict Browser Environments: You want to avoid modifying prototype chains of JavaScript objects.
Use should() when:
Readability is the goal: You want non-technical team members, product owners, or manual QAs to easily read and understand the test code.
You use Chai/Mocha: You are working in a legacy or specific Chai-based automation framework that has should() explicitly enabled.

expect()
Example 1: Checking a login status string.
expect(loginStatus).to.equal('success');

Example 2: Verifying a shopping cart item count
expect(cartItems.length).to.be.greaterThan(0);

Example 3: Validating an API response status code
expect(response.statusCode).to.equal(200);
should()
Example 1: Checking a login status string
loginStatus.should.equal('success');

Example 2: Verifying a shopping cart item count
cartItems.length.should.be.greaterThan(0);

Example 3: Validating an API response status code
response.statusCode.should.equal(200);

PART C: Basic Cypress Commands

Action
Command
Example
Visit a page
cy.visit()
cy.visit('https://example.com')
Type into a textbox
cy.type()
cy.get('#username').type('qa_user')
Click a button
cy.click()
cy.get('.btn-submit').click()
Clear a field
cy.clear()
cy.get('[name="email"]').clear()
Check a checkbox
cy.check()
cy.get('[type="checkbox"]').check()
Uncheck a checkbox
cy.uncheck()
cy.get('#terms-conditions').uncheck()
Select from a dropdown
cy.select()
cy.get('select#country').select('Kenya')
Scroll to an element
cy.scrollIntoView()
cy.get('#footer-links').scrollIntoView()
Upload a file
cy.selectFile()
cy.get('#avatar-upload').selectFile('path/to/image.png')
Hover over an element
cy.trigger('mouseover') 
cy.get('.menu-item').trigger('mouseover')
Right click
cy.rightclick()
cy.get('.context-menu').rightclick()
Double click
cy.dblclick()
cy.get('.file-icon').dblclick()
Press keyboard keys
cy.type('{keyname}')
cy.get('body').type('{enter}')


PART D: Locators
cy.get()
Searches the entire webpage for elements that match the given CSS selector.
Example: 
cy.get('button.btn-submit')
cy.contains()
Finds an element based on its visible text content rather than its HTML tags or attributes.
Example: 
cy.contains('Sign In')
.find()
Searches down the HTML tree for child elements inside a previously located parent element.
Example: 
cy.get('#navbar').find('.nav-item')
.children()
Gets the immediate next-level child elements of the selected element.
Example: 
cy.get('ul.menu-list').children()
.parent()
Moves exactly one level up the HTML tree to get the immediate parent element.
Example: 
cy.get('#child-span').parent()
.closest()
Travels up the HTML tree to find the first ancestor element that matches a specific selector.
Example: 
cy.get('.delete-btn').closest('form')
.eq()
Selects a specific element from a list of matching items based on its index number (starting at 0).
Example: 
cy.get('table tr').eq(2) (Selects the 3rd row)
.first()
Grabs the very first item from a list of matching elements.
Example: 
cy.get('ul li').first()
.last()
Grabs the very last item from a list of matching elements.
Example:
 cy.get('ul li').last()
.within()
Scopes all subsequent Cypress commands to only look inside this specific container element.
Example:
cy.get('#login-form').within(() => {
  cy.get('[name="username"]').type('user1');
  cy.get('[name="password"]').type('pass1');
});

Why are IDs preferred?
IDs are preferred because they are unique on a webpage. An ID should only belong to one element, ensuring Cypress always finds the exact item you intend to test without accidental duplicates. 

What are CSS selectors?
CSS selectors are strings used to identify and target specific HTML elements based on their tag names, classes, IDs, or relationships. Automated tests use them to tell the tool exactly which element to interact with.

What are data attributes (data-cy, data-testid)?
Data attributes are custom labels added to HTML tags specifically for automated testing. Because web designs, classes, and IDs change constantly during updates, data attributes separate your test logic from the website's design which avoids the test from breaking. The layout or colors can change completely, but as long as the test label stays the same, your tests will never break.

Why are long CSS selectors discouraged?
Long, deeply nested selectors (like div > ul > li > span > button) are highly discouraged because they are too fragile and break easily. If a developer alters the webpage layout by adding or removing even a single element in that long chain, the selector fails instantly, forcing the QA team to waste time constantly fixing broken tests.

PART E: Assertions Practice
be.visible 
  cy.get('[data-cy="success-alert"]').should('be.visible');
exist 
  cy.get('[data-cy="hidden-modal-overlay"]').should('exist');
contain
  cy.get('[data-cy="welcome-banner"]').should('contain', 'Welcome back');
have.text
  cy.get('[data-cy="submit-btn"]').should('have.text', 'Save Changes');
have.value
  cy.get('[data-cy="email-input"]').should('have.value', 'user@example.com');
have.length
  cy.get('[data-cy="cart-item"]').should('have.length', 3);
be.enabled
  cy.get('[data-cy="continue-btn"]').should('be.enabled');
be.disabled
  cy.get('[data-cy="submit-btn"]').should('be.disabled')
be.checked
  cy.get('[data-cy="agree-terms-checkbox"]').should('be.checked');
have.attr
  cy.get('[data-cy="profile-link"]').should('have.attr', 'href', '/profile');

PART F: Working with Elements
Buttons
cy.get('[data-cy="submit-button"]')
  .click()
  .should('be.disabled');

Text fields
cy.get('[data-cy="username-field"]')
  .clear()
  .type('qa_tester')
  .should('have.value', 'qa_tester');

Password fields
cy.get('[data-cy="password-input"]')
  .type('SecurePass123!', { log: false })
  .should('have.attr', 'type', 'password');

Checkboxes
cy.get('[data-cy="newsletter-checkbox"]')
  .check()
  .should('be.checked');

Radio buttons
cy.get('[data-cy="payment-method-credit"]')
  .check()
  .should('be.checked');

Dropdowns
cy.get('[data-cy="country-dropdown"]')
  .select('Kenya')
  .should('have.value', 'KE'); // Verifies the underlying value attribute

Text areas
cy.get('[data-cy="feedback-textarea"]')
  .clear()
  .type('The checkout process was fast. Great application!')
  .should('have.value', 'The checkout process was fast. Great application!');

Links
cy.get('[data-cy="privacy-policy-link"]')
  .should('have.attr', 'href', '/privacy-policy');

Images
cy.get('[data-cy="company-logo"]')
  .should('be.visible')
  .and('have.attr', 'src', '/assets/logo.png');
PART G: Waiting
Why is cy.wait(5000) considered bad practice?
Using delays like cy.wait(5000) is a bad practice because it is a hardcoded delay which makes the test slow and unreliable. If a test is delayed, it drags the overall run time because your test will instantly fail even though the application is working perfectly.

What is a better alternative?
Retry-ability
Cypress commands automatically wait up to 4 seconds (by default) for elements to exist and become visible before executing an action. You can increase this timeout on a specific command if an action is expected to take longer.

Waiting for API Requests 
The absolute best practice for handling asynchronous data is to intercept the network request, give it an alias, and tell Cypress to wait explicitly for that network call to finish.

Waiting for Page Loading
Instead of pausing for the page load event, wait for a specific visual anchor to appear on the screen that proves the page has fully loaded.

PART H: Forms
describe('User Registration Form', () => {
  beforeEach(() => {
    // 1. Visit the registration page before every test
    cy.visit('/register');
  });

  it('should successfully fill out and submit the registration form', () => {
    // 2. Intercept the form submission API request to wait for it later
    cy.intercept('POST', '/api/v1/register').as('registrationSubmit');

    // 3. Fill out Text Fields (First Name, Last Name, Email, Password)
    cy.get('[data-cy="first-name-input"]').type('John');
    cy.get('[data-cy="last-name-input"]').type('Doe');
    cy.get('[data-cy="email-input"]').type('john.doe@example.com');
    cy.get('[data-cy="password-input"]').type('SecurePass123!', { log: false });

    // 4. Fill out the Date Picker (Types the date string directly)
    cy.get('[data-cy="birth-date-picker"]').type('1995-08-15');

    // 5. Select from Dropdown (Select by visible text)
    cy.get('[data-cy="country-dropdown"]').select('Kenya');

    // 6. Check the Checkbox (Ticks the terms and conditions)
    cy.get('[data-cy="terms-checkbox"]').check();

    // 7. Choose a Radio Button (Selects the subscription plan)
    cy.get('[data-cy="premium-plan-radio"]').check();

    // 8. Click the Submit Button
    cy.get('[data-cy="submit-form-btn"]').click();

    // 9. Dynamically wait for the backend API request to finish successfully
    cy.wait('@registrationSubmit').its('response.statusCode').should('eq', 200);

    // 10. Verify submission success visually on the UI
    cy.get('[data-cy="success-message"]')
      .should('be.visible')
      .and('contain.text', 'Thank you for registering!');
    cy.url().should('include', '/dashboard');
  });
});

PART I: Tables
describe('Web Table Automation Practice', () => {

  beforeEach(() => {
    // Navigate to the demo website before each test
    cy.visit('https://testautomationpractice.blogspot.com/');
  });

  // 1. Count Rows
  it('should count the total number of rows in the table', () => {
    // Captures all row elements (including headers) and verifies the length
    cy.get('table[name="BookTable"] tr')
      .should('have.length', 7); 
  });

  // 2. Count Columns
  it('should count the total number of columns in the table', () => {
    // Looks inside the first row (the header row) to count table header (th) elements
    cy.get('table[name="BookTable"] tr').first().find('th')
      .should('have.length', 4);
  });

  // 3. Read Data from a Row
  it('should read and validate data from a specific row', () => {
    // Targets the 2nd row (index 1) and verifies the text content across its columns
    cy.get('table[name="BookTable"] tr').eq(1).within(() => {
      cy.get('td').eq(0).should('have.text', 'Learn Selenium');
      cy.get('td').eq(1).should('have.text', 'Amit');
    });
  });

  // 4. Click a Button/Action Inside a Row Based on Text
  it('should locate a specific row by its text and perform an action', () => {
    // Finds the table cell containing 'Learn Java'
    cy.contains('table[name="BookTable"] td', 'Learn Java')
      .parent('tr') // Shifts scope up to that specific row execution
      .within(() => {
        // If there were a button or checkbox inside this row, you would interact with it here
        // Example: cy.get('button').click();
        // Since this demo table lists values, we can read/click the text cell safely
        cy.get('td').eq(1).click(); 
      });
  });

  // 5. Verify Table Contents
  it('should iterate through rows to verify table contents', () => {
    // Loops through each row to verify specific criteria (e.g., finding books by Author "Amit")
    cy.get('table[name="BookTable"] tr').each(($row, index) => {
      // Skip the header row (index 0)
      if (index > 0) {
        const author = $row.find('td').eq(1).text();
        if (author === 'Amit') {
          const bookName = $row.find('td').eq(0).text();
          // Asserts that books written by Amit match expected names
          expect(bookName).to.match(/Learn Selenium|Master In JS/);
        }
      }
    });
  });

});

PART J: Browser Interactions
Browser Back; Moves one page back in the browser's history log.
cy.go('back'); 
cy.go(-1); 

Browser Forward; Moves one page forward in the browser's history log.
cy.go('forward'); 
cy.go(1); 

Reload; Refreshes the current webpage layout.
cy.reload(); 
cy.reload(true); 

Open a new tab (how Cypress handles this)
Cypress runs directly inside a single browser tab so it cannot control or switch to a second tab if one opens. By using .invoke('removeAttr', 'target'), you remove the instruction that forces a new tab, causing the link to safely open within your active Cypress window.
it('should open a new tab link in the same window', () => {
  cy.visit('https://example.com');

  // Select the link, remove the new tab attribute, and click it
  cy.get('[data-cy="external-link"]')
    .invoke('removeAttr', 'target')
    .click();

  // Your test continues smoothly on the newly loaded page
  cy.url().should('include', '/new-page-destination');
});

Browser alerts; An informational popup with an "OK" button. Cypress clicks "OK" automatically.
it('should validate the text inside a standard browser alert', () => {
  // Catch the alert event and check its message text
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('Your session is about to expire!');
  });

  // Action that triggers the alert popup
  cy.get('[data-cy="trigger-alert-btn"]').click();
});

Confirmation dialogs; A choice popup containing both "OK" and "Cancel" buttons. Cypress clicks "OK" by default.
it('should handle confirmation dialogs (Accept or Cancel)', () => {
  // Scenario A: Assert text and click 'OK' (return true)
  cy.on('window:confirm', (confirmText) => {
    expect(confirmText).to.equal('Are you sure you want to delete this?');
    return true; 
  });
  cy.get('[data-cy="delete-item-btn"]').click();

  // Scenario B: Click 'Cancel' instead (return false)
  cy.on('window:confirm', () => false);
  cy.get('[data-cy="delete-item-btn"]').click();
});

Prompt dialogs; A text input popup with "OK" and "Cancel" buttons. Since it requires a user to type, you must stub the window object before triggering it.
it('should feed test input text into a browser prompt dialog', () => {
  cy.visit('https://example.com');

  // Intercept the window object and control what the prompt returns
  cy.window().then((win) => {
    cy.stub(win, 'prompt').returns(' Nairobi, Kenya ');
  });

  // Click the button that opens the prompt
  cy.get('[data-cy="open-prompt-btn"]').click();

  // Verify that your injected stub text was processed by the UI
  cy.get('[data-cy="result-message"]').should('contain', 'Nairobi, Kenya');
});

PART K: Keyboard Actions
1. Enter - Submit a form or select a highlighted item
cy.get('[data-cy="search-input"]').type('Cypress Testing{enter}');

2. Tab - Move focus to the next input field or element
cy.get('[data-cy="first-name"]').type('John').tab();

3. Escape - Close a modal window, popup, or dropdown menu
cy.get('body').type('{esc}');

4. Arrow Up - Increase a numeric value or move up in a custom dropdown list
cy.get('[data-cy="quantity-counter"]').type('{uparrow}');

5. Arrow Down - Navigate down through a menu or autocomplete search results
cy.get('[data-cy="search-autocomplete"]').type('{downarrow}');

6. Arrow Left - Move the text cursor or shift a horizontal slider element left
cy.get('[data-cy="volume-slider"]').type('{leftarrow}');

7. Arrow Right - Move the text cursor or shift a horizontal slider element right
cy.get('[data-cy="volume-slider"]').type('{rightarrow}');

8. Delete - Remove the character immediately to the right of the text cursor
cy.get('[data-cy="promo-code-input"]').type('{del}');

9. Backspace - Erase the character immediately to the left of the text cursor
cy.get('[data-cy="username-field"]').type('{backspace}');

PART L: Scrolling
describe('Cypress Scrolling Operations', () => {

  beforeEach(() => {
    // Visit a page with a long vertical layout
    cy.visit('/long-page');
  });

  // 1. Scroll to the bottom of a page
  it('should scroll down to the bottom of the window', () => {
    // Scrolls the entire viewport window to the very bottom
    cy.scrollTo('bottom'); 
    
    // Smooth scrolling variant (optional: makes the motion visible in test recordings)
    cy.scrollTo('bottom', { duration: 1000 }); 
  });

  // 2. Scroll to the top of a page
  it('should scroll back up to the top of the window', () => {
    // First, descend to the bottom
    cy.scrollTo('bottom');
    
    // Scroll directly back to the highest coordinate point
    cy.scrollTo('top'); 
  });

  // 3. Scroll to a specific element & 4. Verify it becomes visible
  it('should scroll to a specific element and confirm its visibility', () => {
    // Locates a footer or nested element deeper down the page
    cy.get('[data-cy="footer-terms-link"]')
      .scrollIntoView()         // Tells the browser to bring this specific element into view
      .should('be.visible');    // Asserts that the element is now inside the viewport and viewable
  });

  // Pro-Tip: Scoped element scrolling
  it('should scroll inside a specific scrollable container', () => {
    // If you have a specific box (like a chat window or data table) that has its own scrollbar
    cy.get('[data-cy="scrollable-terms-box"]')
      .scrollTo('bottom');      // Scrolls only the target box, not the entire page
  });

});













