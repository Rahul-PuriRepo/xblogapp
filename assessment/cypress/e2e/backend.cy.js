describe('Blog App Backend Tests', () => {
    const apiUrl = "http://localhost:5000/api";
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
      cy.request('POST', `${apiUrl}/auth/register`, 
        { "name" : `${name}`, "email" : `${email}`,  "password" : `${password}`, "avatar" : `${avatar}`})
        .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.user.name).to.eq(`${name}`);
        expect(response.body.user.email).to.eq(`${email}`);
        expect(response.body.user.avatar).to.eq(`${avatar}`);
        expect(response.body.user.role).to.eq("user");
      });
    });

    it('User should be able to Login/Signup using Google Auth', () => {
      cy.request('POST', `${apiUrl}/auth/google-login`, 
        { "name" : `${name}`, "email" : `${email}`, "avatar" : `${avatar}`, "role" : "user"})
        .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.user.name).to.eq(`${name}`);
        expect(response.body.user.email).to.eq(`${email}`);
        expect(response.body.user.avatar).to.eq(`${avatar}`);
        expect(response.body.user.role).to.eq("user");
      });
    });

    it('User should be able to Login using his email and password', () => {
      cy.request('POST', `${apiUrl}/auth/login`, 
        { "email" : `${temp_email}`,  "password" : `${password}`})
        .then((response) => {
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
      cy.request({
        method: 'POST',
        url: `${apiUrl}/posts`, // Make sure this is the correct POST endpoint
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
      cy.request({
        method: 'GET',
        url: `${apiUrl}/posts/${post_id}`, // Make sure this is the correct POST endpoint
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
      cy.request({
        method: 'PUT',
        url: `${apiUrl}/posts/${post_id}`, // Make sure this is the correct POST endpoint
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
      cy.request({
        method: 'GET',
        url: `${apiUrl}/posts`,
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
      cy.request({
        method : 'POST',
        url: `${apiUrl}/posts/${post_id}/like`,
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
      cy.request({
        method: 'POST',
        url: `${apiUrl}/posts`, // Make sure this is the correct POST endpoint
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

      cy.request({
        method : 'DELETE',
        url: `${apiUrl}/posts/${post_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Post deleted successfully");
      });

      cy.request({
        method: 'GET',
        url: `${apiUrl}/posts`,
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
      cy.request({
        method: 'GET',
        url: `${apiUrl}/users/${user_id}`,
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
      cy.request({
        method: 'GET',
        url: `${apiUrl}/users/me`,
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
      cy.request({
        method: 'PUT',
        url: `${apiUrl}/users/me`,
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
      cy.request({
        method: 'GET',
        url: `${apiUrl}/users/me/posts`,
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
      cy.request({
        method: 'POST',
        url: `${apiUrl}/posts/${post_id}/comments`,
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
      cy.request({
        method: 'GET',
        url: `${apiUrl}/posts/${post_id}/comments`,
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
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/comments/${comment_id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Comment deleted successfully");
      });
    });

});