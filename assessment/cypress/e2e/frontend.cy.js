describe('Blog App Frontend Tests', () => {
    let name = `Test-User_${Date.now()}`;
    let email = `test-user_${Date.now()}@gmail.com`;
    let password = "12345678";
    let temp_name = name;
    let temp_email = email;

    beforeEach(() => {
      cy.visit('http://localhost:3001');
    });
  
    it('Should Display Blog App at the Top-left Corner of the App (in the Navbar)', () => {
      cy.get('nav').within(() => {
        cy.contains('Blog App').should('be.visible');
      });
    });

    it('Should have "Home", "Login" and "Signup" buttons in the Navbar', () => {
      cy.get('nav').within(() => {
        cy.contains('Home').should('be.visible');
        cy.contains('Login').should('be.visible');
        cy.contains('Signup').should('be.visible');
      });
    });

    it('Should display "Explore Posts" section on the homepage', () => {
      cy.contains('Explore Posts').should('be.visible');
    });

    it('Should have "Search by keyword" & "Filter by tags" Input Options', () => {
      cy.get('input[placeholder="Search by keyword..."]').should('exist').and('be.visible');
      cy.get('input[placeholder="Filter by tags (comma-separated)"]').should('exist').and('be.visible');
    })

    it('Should allow typing into the "Search by keyword" & "Filter by tags" inputs', () => {
      cy.get('input[placeholder="Search by keyword..."]')
        .type('React')
        .should('have.value', 'React');
    
      cy.get('input[placeholder="Filter by tags (comma-separated)"]')
        .type('frontend')
        .should('have.value', 'frontend');
    });

    it('Should have an option to signup with google', () => {
      cy.contains('Signup').click();
      cy.contains('Sign Up').should('be.visible');
      cy.contains('Sign Up with Google').should('be.visible');
    });

    it('Should have an option to login with google', () => {
      cy.contains('Login').click();
      cy.contains('Login').should('be.visible');
      cy.contains('Login with Google').should('be.visible');
    });


    it('User should be able to Signup through the UI', () => {
      cy.contains('Signup').click();
      cy.contains('Sign Up').should('be.visible');

      cy.get('input[name="name"]').type(temp_name);
      cy.get('input[name="email"]').type(temp_email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait(2000);

      cy.url().should('include', '/');
      cy.contains('Blog App').should('be.visible');
      cy.contains('Logout').should('be.visible');
    });

    it('User should be able to Login through the UI', () => {
      cy.contains('Login').click();
      cy.contains('Login').should('be.visible');

      cy.get('input[name="email"]').type(temp_email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait(2000);

      cy.url().should('include', '/');
      cy.contains('Blog App').should('be.visible');
      cy.contains('Logout').should('be.visible');
    });

    it('User should be able to see his profile in the UI', () => {
      cy.contains('Login').click();
      cy.contains('Login').should('be.visible');

      cy.get('input[name="email"]').type(temp_email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait(2000);

      cy.contains('Profile').click();

      cy.contains(temp_email).should('be.visible');
      cy.contains(temp_name).should('be.visible');
      cy.contains("Total Posts: 0").should('be.visible');
      
    });

    it('User should be able to Update his profile in the UI', () => {
      cy.contains('Login').click();
      cy.contains('Login').should('be.visible');

      cy.get('input[name="email"]').type(temp_email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait(2000);

      cy.contains('Profile').click();

      cy.wait(2000);

      cy.get('input[name="name"]').should('be.visible');    
      cy.get('input[name="name"]').clear();
      cy.get('input[name="name"]').type('Crio.Do');
      cy.contains('Update Profile').click();

      cy.wait(2000);

      cy.reload();

      cy.contains("Crio.Do").should('be.visible');
    });

    it('User should be able to see his dashboard in the UI', () => {
      cy.contains('Login').click();
      cy.contains('Login').should('be.visible');

      cy.get('input[name="email"]').type(temp_email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait(2000);

      cy.contains('Dashboard').click();

      cy.wait(1000);

      cy.contains('My Posts').should('be.visible');
      cy.contains('You have no posts yet.').should('be.visible');
      cy.contains('+ Create Post').should('be.visible');
    });

    it('User should be able to create a post', () => {
      cy.contains('Login').click();
      cy.contains('Login').should('be.visible');

      cy.get('input[name="email"]').type(temp_email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait(2000);

      cy.contains('Profile').click();

      cy.wait(1000);

      cy.get('input[name="name"]').should('be.visible');    
      cy.get('input[name="name"]').clear();
      cy.get('input[name="name"]').type('Crio.Do');
      cy.contains('Update Profile').click();

      cy.contains('Dashboard').click();

      cy.wait(1000);

      cy.contains('+ Create Post').click();

      cy.get('input[name="title"]').type("Test Post by Crio.Do");
      cy.get('textarea[name="content"]').type("This is a Test Post by Crio.Do. May your Implementation pass all the tests. All the best!");
      cy.get('input[name="tags"]').type("crio.do, mern, blog, developer");
      cy.get('button[type="submit"]').click();

      cy.wait(1000);

      cy.url().should('not.include', '/create');
    });

    it('User should be able to view his posts in the dashboard', () => {
      cy.contains('Login').click();
      cy.contains('Login').should('be.visible');

      cy.get('input[name="email"]').type(temp_email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait(2000);

      cy.contains('Profile').click();

      cy.wait(1000);

      cy.get('input[name="name"]').should('be.visible');    
      cy.get('input[name="name"]').clear();
      cy.get('input[name="name"]').type('Crio.Do');
      cy.contains('Update Profile').click();

      cy.contains('Dashboard').click();

      cy.wait(1000);

      cy.contains('+ Create Post').click();

      cy.get('input[name="title"]').type("Test Post by Crio.Do");
      cy.get('textarea[name="content"]').type("This is a Test Post by Crio.Do. May your Implementation pass all the tests. All the best!");
      cy.get('input[name="tags"]').type("crio.do, mern, blog, developer");
      cy.get('button[type="submit"]').click();

      cy.wait(1000);

      cy.url().should('not.include', '/create');

      cy.contains('Dashboard').click();
      cy.wait(1000);

      cy.contains("Test Post by Crio.Do").should("be.visible");
      cy.contains("View").should("be.visible");
      cy.contains("Edit").should("be.visible");
      cy.contains("Delete").should("be.visible");
    });

    it('User should be able to edit a post', () => {
      cy.contains('Login').click();
      cy.contains('Login').should('be.visible');

      cy.get('input[name="email"]').type(temp_email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait(2000);

      cy.contains('Profile').click();

      cy.wait(1000);

      cy.get('input[name="name"]').should('be.visible');    
      cy.get('input[name="name"]').clear();
      cy.get('input[name="name"]').type('Crio.Do');
      cy.contains('Update Profile').click();

      cy.contains('Dashboard').click();

      cy.wait(1000);

      cy.contains('+ Create Post').click();

      cy.get('input[name="title"]').type("Test Post by Crio.Do");
      cy.get('textarea[name="content"]').type("This is a Test Post by Crio.Do. May your Implementation pass all the tests. All the best!");
      cy.get('input[name="tags"]').type("crio.do, mern, blog, developer");
      cy.get('button[type="submit"]').click();

      cy.wait(1000);

      cy.url().should('not.include', '/create');

      cy.contains('Dashboard').click();

      cy.wait(1000);

      cy.contains("Test Post by Crio.Do").should("be.visible");
      cy.contains("Edit").click();
      
      cy.wait(1000);

      cy.get('input[name="title"]').should('be.visible');    
      cy.get('input[name="title"]').clear();
      cy.get('input[name="title"]').type('Edited Test Post by Crio.Do');
      cy.contains('Update Post').click();

      cy.wait(1000);

      cy.contains('Dashboard').click();

      cy.wait(1000);

      cy.contains("Edited Test Post by Crio.Do").should("be.visible");
    });

    it('User should be able to like a post', () => {
      cy.contains('Login').click();
      cy.contains('Login').should('be.visible');

      cy.get('input[name="email"]').type(temp_email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait(2000);

      cy.contains('Profile').click();

      cy.wait(1000);

      cy.get('input[name="name"]').should('be.visible');    
      cy.get('input[name="name"]').clear();
      cy.get('input[name="name"]').type('Crio.Do');
      cy.contains('Update Profile').click();

      cy.contains('Dashboard').click();

      cy.wait(1000);

      cy.contains('+ Create Post').click();

      cy.get('input[name="title"]').type("Test Post by Crio.Do");
      cy.get('textarea[name="content"]').type("This is a Test Post by Crio.Do. May your Implementation pass all the tests. All the best!");
      cy.get('input[name="tags"]').type("crio.do, mern, blog, developer");
      cy.get('button[type="submit"]').click();

      cy.wait(1000);

      cy.url().should('not.include', '/create');

      cy.contains('Dashboard').click();

      cy.wait(1000);

      cy.contains("Test Post by Crio.Do").should("be.visible");
      cy.contains("View").click();
      
      cy.wait(1000);

      cy.contains("Like (0)").click();

      cy.wait(1000);

      cy.contains("Unlike (1)").should("be.visible");

    });

    it('User should be able to add a comment on a post', () => {
      cy.contains('Login').click();
      cy.contains('Login').should('be.visible');

      cy.get('input[name="email"]').type(temp_email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.wait(2000);

      cy.contains('Profile').click();

      cy.wait(1000);

      cy.get('input[name="name"]').should('be.visible');    
      cy.get('input[name="name"]').clear();
      cy.get('input[name="name"]').type('Crio.Do');
      cy.contains('Update Profile').click();

      cy.contains('Dashboard').click();

      cy.wait(1000);

      cy.contains('+ Create Post').click();

      cy.get('input[name="title"]').type("Test Post by Crio.Do");
      cy.get('textarea[name="content"]').type("This is a Test Post by Crio.Do. May your Implementation pass all the tests. All the best!");
      cy.get('input[name="tags"]').type("crio.do, mern, blog, developer");
      cy.get('button[type="submit"]').click();

      cy.wait(1000);

      cy.url().should('not.include', '/create');

      cy.contains('Dashboard').click();

      cy.wait(1000);

      cy.contains("Test Post by Crio.Do").should("be.visible");
      cy.contains("View").click();
      
      cy.wait(1000);

      cy.get('input[name="comment"]').type("Test Comment by Crio.Do");
      cy.contains('Add Comment').click();

      cy.wait(1000);

      cy.contains("Test Comment by Crio.Do").should("be.visible");
    });

});
  