// ---------------- FRONTEND TESTS ----------------
import "cypress-real-events/support";
import dotenv from 'dotenv';
dotenv.config();

describe('Blog App Frontend Tests', () => {
  let name = `Test-User_${Date.now()}`;
  let email = `test-user_${Date.now()}@gmail.com`;
  let password = "12345678";
  let temp_name = name;
  let temp_email = email;

  beforeEach(() => {
    cy.visit(`/`);
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

// ---------------- BACKEND API TESTS ----------------
describe('Blog App Backend Tests', () => {
    let name = `Test-User_${Date.now()}`;
    let email = `test-user_${Date.now()}@gmail.com`;
    const password = "12345678";
    const avatar = "https://picsum.photos/seed/picsum/200/300";
    let token;
    let temp_email = email;
    let user_id;
    let post_id;
    let total_posts;
    let comment_id; 
  
    it('User should be able to Signup using his details', () => {
        cy.backendRequest({
          method: "POST",
          url: "/api/auth/register",
          body:  { "name" : `${name}`, "email" : `${email}`,  "password" : `${password}`, "avatar" : `${avatar}`},
        })
        .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.user.name).to.eq(`${name}`);
        expect(response.body.user.email).to.eq(`${email}`);
        expect(response.body.user.avatar).to.eq(`${avatar}`);
        expect(response.body.user.role).to.eq("user");
      });
    });

    it('User should be able to Login/Signup using Google Auth', () => {
        cy.backendRequest({
          method: "POST",
          url: `/api/auth/google-login`,
          body:  { "name" : `${name}`, "email" : `${email}`, "avatar" : `${avatar}`, "role" : "user"},
        })
        .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.user.name).to.eq(`${name}`);
        expect(response.body.user.email).to.eq(`${email}`);
        expect(response.body.user.avatar).to.eq(`${avatar}`);
        expect(response.body.user.role).to.eq("user");
      });
    });

    it('User should be able to Login using his email and password', () => {
      cy.backendRequest({
        method : 'POST', 
        url : `/api/auth/login`,
        body : { "email" : `${temp_email}`,  "password" : `${password}`}
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.user.name).to.eq(`${name}`);
        expect(response.body.user.email).to.eq(`${temp_email}`);
        expect(response.body.user.avatar).to.eq(`${avatar}`);
        expect(response.body.user.role).to.eq("user");
        expect(response.body.token).to.not.be.empty;
        token = response.body.token;
        user_id = response.body.user.id;
      });
    });

    it('User should be able to Create a Post', () => {
      cy.backendRequest({
        method: 'POST',
        url: `/api/posts`, // Make sure this is the correct POST endpoint
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          title: "test post 1",
          content: "test post 1 content",
          tags: ["tag1", "tag2"],
          image: "https://picsum.photos/seed/picsum/200/300"
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.title).to.eq("test post 1");
        expect(response.body.content).to.eq("test post 1 content");
        expect(response.body.tags).to.deep.eq(["tag1", "tag2"]);
        expect(response.body.image).to.eq("https://picsum.photos/seed/picsum/200/300");
        expect(response.body.author).to.eq(user_id);
        expect(response.body._id).to.not.be.empty;
        expect(response.body.createdAt).to.not.be.empty;
        expect(response.body.updatedAt).to.not.be.empty;
        expect(response.body.likes).to.deep.eq([]);
        expect(response.body.comments).to.deep.eq([]);
        post_id = response.body._id;
      });
    });
    
    it('User should be able to get a Post by Id', () => {
      cy.backendRequest({
        method: 'GET',
        url: `/api/posts/${post_id}`, // Make sure this is the correct POST endpoint
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq("test post 1");
        expect(response.body.content).to.eq("test post 1 content");
        expect(response.body.tags).to.deep.eq(["tag1", "tag2"]);
        expect(response.body.image).to.eq("https://picsum.photos/seed/picsum/200/300");
        expect(response.body.author._id).to.eq(user_id);
        expect(response.body._id).to.eq(post_id);
        expect(response.body.createdAt).to.not.be.empty;
        expect(response.body.updatedAt).to.not.be.empty;
        expect(response.body.likes).to.deep.eq([]);
        expect(response.body.comments).to.deep.eq([]);
      });
    });

    it('User should be able to Update an existing Post', () => {
      cy.backendRequest({
        method: 'PUT',
        url: `/api/posts/${post_id}`, // Make sure this is the correct POST endpoint
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          title: "updated test post 1"
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq("updated test post 1");
        expect(response.body.content).to.eq("test post 1 content");
        expect(response.body.tags).to.deep.eq(["tag1", "tag2"]);
        expect(response.body.image).to.eq("https://picsum.photos/seed/picsum/200/300");
        expect(response.body.author).to.eq(user_id);
        expect(response.body._id).to.not.be.empty;
        expect(response.body.createdAt).to.not.be.empty;
        expect(response.body.updatedAt).to.not.be.empty;
        expect(response.body.likes).to.deep.eq([]);
        expect(response.body.comments).to.deep.eq([]);
        post_id = response.body._id;
      });
    });

    it('User should be able to get all Posts', () => {
      cy.backendRequest({
        method: 'GET',
        url: `/api/posts`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        total_posts = response.body.length;
      });
    });

    it('User should be able to Like a post', () => {
      cy.backendRequest({
        method : 'POST',
        url: `/api/posts/${post_id}/like`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Post liked");
        expect(response.body.totalLikes).to.eq(1);
      });
    });

    it('User should be able to delete a Post', () => {
      let new_post_id;
      cy.backendRequest({
        method: 'POST',
        url: `/api/posts`, // Make sure this is the correct POST endpoint
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          title: "test post 2",
          content: "test post 2 content",
          tags: ["tag3", "tag4"],
          image: "https://picsum.photos/seed/picsum/200/300"
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body._id).to.not.be.empty;
        new_post_id = response.body._id;
      });

      cy.backendRequest({
        method : 'DELETE',
        url: `/api/posts/${post_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Post deleted successfully");
      });

      cy.backendRequest({
        method: 'GET',
        url: `/api/posts`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.eq(total_posts);
      });
    });
    
    it('Anyone should be able to get User profile by Id', () => {
      cy.backendRequest({
        method: 'GET',
        url: `/api/users/${user_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(`${name}`);
        expect(response.body.email).to.eq(`${temp_email}`);
        expect(response.body.avatar).to.eq(`${avatar}`);
        expect(response.body.postCount).to.eq(1);
        expect(response.body._id).to.eq(user_id);
      });
    });

    it('User should be able to get his own profile', () => {
      cy.backendRequest({
        method: 'GET',
        url: `/api/users/me`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(`${name}`);
        expect(response.body.email).to.eq(`${temp_email}`);
        expect(response.body.avatar).to.eq(`${avatar}`);
        expect(response.body.postCount).to.eq(1);
        expect(response.body._id).to.eq(user_id);
      });
    });

    it('User should be able to Update his profile', () => {
      cy.backendRequest({
        method: 'PUT',
        url: `/api/users/me`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          name: "Updated Test User"
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq("Updated Test User");
        expect(response.body.email).to.eq(`${temp_email}`);
        expect(response.body.avatar).to.eq(`${avatar}`);
        expect(response.body._id).to.eq(user_id);
      });
    });

    it('User should be able to get all his posts', () => {
      cy.backendRequest({
        method: 'GET',
        url: `/api/users/me/posts`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.eq(1);
      });
    });

    it('User should be able to Comment on a Post', () => {
      cy.backendRequest({
        method: 'POST',
        url: `/api/posts/${post_id}/comments`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          text: "test comment 1"
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.text).to.eq("test comment 1");
        expect(response.body.post).to.eq(post_id);
        expect(response.body.author).to.eq(user_id);
        expect(response.body._id).to.not.be.empty;  
        comment_id = response.body._id;
      });
    });

    it('User should be able to get all comments on a Post', () => {   
      cy.backendRequest({
        method: 'GET',
        url: `/api/posts/${post_id}/comments`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
      });
    });  

    it('User should be able to delete his own comment', () => {
      cy.backendRequest({
        method: 'DELETE',
        url: `/api/comments/${comment_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Comment deleted successfully");
      });
    });

});
