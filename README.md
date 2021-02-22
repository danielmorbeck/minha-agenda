# minha-agenda

## Installation

```bash
git clone https://github.com/danielmorbeck/minha-agenda.git
```

```bash
npm install
```

Install MongoDB: https://docs.mongodb.com/manual/installation/

```bash
mongod
```

```bash
npm run start
```

## Usage

```javascript
//USER: 

//GET: /users
router.get('/users', userController.index);
// POST: /users/register
router.post('/users/register', authController.register);
// POST: /users/login
router.post('/users/login', authController.login);


router.use(authMiddleware);

//TASKS:

//GET: /tasks
router.get('/tasks', taskController.index);
// POST: /tasks
router.post('/tasks', taskController.store);
```
