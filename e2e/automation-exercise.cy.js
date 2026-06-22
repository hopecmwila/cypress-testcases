describe("Automation Exercise E-commerce Test Suite", () => {
  const dynamicEmail = `student${Date.now()}@test.com`;
  const password = "TestPassword123";

  beforeEach(() => {
    cy.visit("https://automationexercise.com");
    cy.get("body").then(($body) => {
      if ($body.find(".modal-content").length > 0) {
        cy.get(".modal-content").invoke("remove");
      }
    });
  });

  it("Test Case 1: Verify Homepage Loads", () => {
    cy.url().should("include", "automationexercise.com");
    cy.get(".logo img").should("be.visible");
    cy.get(".nav.navbar-nav").should("be.visible");
    cy.contains("Signup / Login").should("be.visible");
    //cy.screenshot("homepage-loaded-successfully");
  });

  it("Test Case 2: Register a New User", () => {
    cy.contains("Signup / Login").click();
    cy.get('[data-qa="signup-name"]').type("User");
    cy.get('[data-qa="signup-email"]').type(dynamicEmail);
    cy.get('[data-qa="signup-button"]').click(); // Details & Address

    cy.get("#id_gender1").click();
    cy.get('[data-qa="password"]').type(password);
    cy.get('[data-qa="first_name"]').type("J");
    cy.get('[data-qa="last_name"]').type("D");
    cy.get('[data-qa="address"]').type("1 St");
    cy.get('[data-qa="country"]').select("United States");
    cy.get('[data-qa="state"]').type("S");
    cy.get('[data-qa="city"]').type("C");
    cy.get('[data-qa="zipcode"]').type("1");
    cy.get('[data-qa="mobile_number"]').type("2");
    cy.get('[data-qa="create-account"]').click(); // Verify & Clean

    cy.contains("Account Created!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();
    //cy.contains("Delete Account").click();
    //cy.contains("Account Deleted!").should("be.visible");
    cy.screenshot("a-new-user-account-should-be-created-successfully.");
  });

  it("Test Case 3: Login and Logout Successfully", () => {
    const uniqueEmail = `login_test_${Date.now()}@test.com`;

    cy.contains("Signup / Login").click();
    cy.get('[data-qa="signup-name"]').type("Login Tester");
    cy.get('[data-qa="signup-email"]').type(uniqueEmail);
    cy.get('[data-qa="signup-button"]').click();

    cy.get('[data-qa="password"]').type("Password123");
    cy.get('[data-qa="first_name"]').type("John");
    cy.get('[data-qa="last_name"]').type("Doe");
    cy.get('[data-qa="address"]').type("123 Main St");
    cy.get('[data-qa="state"]').type("CA");
    cy.get('[data-qa="city"]').type("LA");
    cy.get('[data-qa="zipcode"]').type("001");
    cy.get('[data-qa="mobile_number"]').type("1234567890");
    cy.get('[data-qa="create-account"]').click();

    cy.get('[data-qa="continue-button"]').click();

    cy.contains("Logout").click();

    cy.contains("Signup / Login").click();
    cy.get('[data-qa="login-email"]').type(uniqueEmail);
    cy.get('[data-qa="login-password"]').type("Password123");
    cy.get('[data-qa="login-button"]').click();

    cy.contains("Logged in as").should("be.visible");
    cy.contains("Logout").click();
  });

  it("Test Case 4: Verify Invalid Login Attempts", () => {
    cy.contains("Signup / Login").click();
    cy.get('[data-qa="login-email"]').type("wrongemail@test.com");
    cy.get('[data-qa="login-password"]').type("WrongPassword");
    cy.get('[data-qa="login-button"]').click();

    cy.contains("Your email or password is incorrect!").should("be.visible");
  });

  it("Test Case 5: Search for a Product", () => {
    cy.contains("Products").click();
    cy.url().should("include", "/products");
    cy.get("#search_product").type("dress");
    cy.get("#submit_search").click();
    cy.get(".title").should("contain", "Searched Products");
    //cy.screenshot("search-results-related-to-dresses-should-be-displayed.");
  });

  it("Test Case 6: View Product Details", () => {
    cy.contains("Products").click();
    cy.get(".choose > .nav > li > a").first().click();
    cy.url().should("include", "/product_details");

    // Explicit attribute check list
    cy.get(".product-information h2").should("be.visible"); // Name
    cy.get(".product-information p").contains("Category:").should("be.visible");
    cy.get(".product-information span span").should("be.visible"); // Price
    cy.get(".product-information b")
      .contains("Availability:")
      .should("be.visible");
    cy.get(".product-information b")
      .contains("Condition:")
      .should("be.visible");
    cy.get(".product-information b").contains("Brand:").should("be.visible");
  });

  it("Test Case 7: Add Product to Cart", () => {
    cy.contains("Products").click();
    cy.get(".add-to-cart").first().click();
    cy.contains("View Cart").click();
    cy.get("#cart_info_table").should("be.visible");
    cy.get(".cart_description").should("be.visible");
    cy.get(".cart_quantity").should("be.visible");
    cy.get(".cart_price").should("be.visible");
  });

  it("Test Case 8: Remove Product From Cart", () => {
    cy.contains("Products").click();
    cy.get(".add-to-cart").first().click();
    cy.contains("View Cart").click();
    cy.get(".cart_quantity_delete").click();
    cy.get("#empty_cart").should("be.visible");
  });

  it("Test Case 9: Submit Contact Us Form", () => {
    cy.contains("Contact us").click();
    cy.get('[data-qa="name"]').type("QA Tester");
    cy.get('[data-qa="email"]').type("tester@test.com");
    cy.get('[data-qa="subject"]').type("Bug Report");
    cy.get('[data-qa="message"]').type(
      "Found an issue with automated assertions workflow.",
    );

    // Evaluates native system prompt events
    cy.get('[data-qa="submit-button"]').click();
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Press OK");
    });

    cy.get(".status.alert.alert-success").should("be.visible");
  });
  //Part 10
  it("Challenge 2: Verify Product Quantity modification", () => {
    cy.get(".choose > .nav > li > a").first().click();
    cy.get("#quantity").clear().type("3");
    cy.get("button.cart").click();
    cy.contains("View Cart").click();
    cy.get(".cart_quantity button").should("have.text", "3");
  });

  it("Challenge 3: Subscribe to Newsletter via Footer", () => {
    cy.get("#footer").scrollIntoView();
    cy.get("#susbscribe_email").type("subscriber@test.com");
    cy.get("#subscribe").click();
    cy.get(".alert-success").should("be.visible");
  });
});
