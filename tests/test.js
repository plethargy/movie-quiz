const chai = require('../backend/node_modules/chai');
const chaiHttp = require('../backend/node_modules/chai-http');
const chaiArray = require('../backend/node_modules/chai-arrays');

chai.use(chaiHttp);
chai.use(chaiArray);
chai.should();


const host = "localhost:5000";

describe('/user GET pass', () => {
    const path = '/user';

   
    it('Passed GET', () => {
       return chai
        .request(host)
        .get(path)
        .send()
        .then((res) => {
            chai.expect(res).to.have.status(200); 
        }, (err) => {
            chai.expect(err.response).to.have.status(500);
        });
    });
   
});

describe('/user POST success', () => {
    const path = '/user';

    it('passed POST', () => {
       return chai
        .request(host)
        .post(path)
        .send()
        .then((res) => {
            chai.expect(res).to.have.status(200);  
        }, (err) => {
            chai.expect(err.response).to.have.status(500);
        });
    });
   
});

describe('/user returns array', () => {
    const path = '/user';

  
    it('Array returned', () => {
       return chai
        .request(host)
        .get(path)
        .send()
        .then((res) => {
            chai.expect(res.body.result).to.be.array(); 
        }, (err) => {
            chai.expect(err.response).to.have.status(500);
        });
    });
    
});

describe('/user/create succesfully creates new user', () => {
    const path = '/user/create';

  
    it('Status true returned', () => {
        return chai
        .request(host)
        .post(path)
        .send(
            {
                name : "Emmet",
                password: "testpassword"
            }
        )
        .then((res) => {
            chai.expect(res).to.have.status(200); 
        }, (err) => {
            chai.expect(err.response).to.have.status(500);
        });
    });
    
});

describe('/user/create succesfully returns user already created', () => {
    const path = '/user/create';

  
    it('error message returned', () => {
        return chai
        .request(host)
        .post(path)
        .send(
            {
                name : "Emmet",
                password: "testpassword"
            }
        )
        .then((res) => {
            chai.expect(res.body.result).to.be.equal("User already exists."); 
        }, (err) => {
            chai.expect(err.response).to.have.status(500);
        });
    });
    
});

describe('/user/update successfully updates score', () => {
    const path = '/user/update';

  
    it('score updated', () => {
        return chai
        .request(host)
        .post(path)
        .send(
            {
                name : "Emmet",
                score : 10
            }
        )
        .then((res) => {
            chai.expect(res.body.status).to.be.equal(true); 
        }, (err) => {
            chai.expect(err.response).to.have.status(500);
        });
    });
    
});

describe('/user/update successfully does not update score', () => {
    const path = '/user/update';

  
    it('score not updated', () => {
        return chai
        .request(host)
        .post(path)
        .send(
            {
                name : "Emmet",
                score : 5
            }
        )
        .then((res) => {
            chai.expect(res.body.result).to.be.equal("User already has a higher score."); 
        }, (err) => {
            chai.expect(err.response).to.have.status(500);
        });
    });
    
});

describe('/user/login successfully authenticates user', () => {
    const path = '/user/login';

  
    it('user authenticated', () => {
        return chai
        .request(host)
        .post(path)
        .send(
            {
                name : "Emmet",
                password : "testpassword"
            }
        )
        .then((res) => {
            chai.expect(res.body.status).to.be.equal(true); 
        }, (err) => {
            chai.expect(err.response).to.have.status(500);
        });
    });
    
});

describe('/user/login successfully shows user as not authenticated', () => {
    const path = '/user/login';

  
    it('user invalid', () => {
        return chai
        .request(host)
        .post(path)
        .send(
            {
                name : "Emmet",
                password : "testpassword123"
            }
        )
        .then((res) => {
            chai.expect(res.body.result).to.be.equal("User not authenticated."); 
        }, (err) => {
            chai.expect(err.response).to.have.status(500);
        });
    });
    
});

describe('/user/login successfully invalidates if user does not exist', () => {
    const path = '/user/login';

  
    it('user does not exist', () => {
        return chai
        .request(host)
        .post(path)
        .send(
            {
                name : "Emmethdoesntexist",
                password : "testpassword123"
            }
        )
        .then((res) => {
            chai.expect(res.body.result).to.be.equal("User does not exist."); 
        }, (err) => {
            chai.expect(err.response).to.have.status(500);
        });
    });
    
});


describe('/category successfully returns categories', () => {
    const path = '/category';

  
    it('category list retrieved', () => {
        return chai
        .request(host)
        .get(path)
        .send()
        .then((res) => {
            chai.expect(res).to.have.status(200); 
            chai.expect(res.body.results).to.be.array(); 
        }, (err) => {
            chai.expect(err.response).to.have.status(500);
        });
    });
    
});

describe('/category fails as expected', () => {
    const path = '/category';

  
    it('category failed on POST', () => {
        return chai
        .request(host)
        .post(path)
        .send()
        .then((res) => {
            chai.expect(res).to.have.status(404); 
        }, (err) => {
            chai.expect(err.response).to.have.status(500);
        });
    });
    
});

