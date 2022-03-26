# complex

## MERN (MongoDB, ExpressJS, React and Node.JS) ecommerce web application

<img src='https://res.cloudinary.com/nmahara/image/upload/v1647760846/screencapture-localhost-3000-2022-03-20-12_22_05_bhtbeu.png' alt='complex'>

<hr>

## Technologies

- HTML5 and CSS3: Semantic Elements, CSS Grid, Flexbox
- React: Components, Props, Events, Hooks, Router, Axios
- Redux: Store, Reducers, Actions
- Node & Express: Web API, Body Parser, File Upload, JWT
- MongoDB: Mongoose, Aggregation
- Development: ESLint, Babel, Git, Github,
- Deployment: Heroku

<hr>

## Features

- User Sign Up and Sign In
- Authentication using JSON Web Tokens (JWT).
- Option to add, edit, view and delete all the items in our store.
- Protected Admin/User routes in both front-end and back-end
- Remain logged-in while refresh with JWT token and Local Storage
- User can increase/decrease the quantity of an item in Cart
- Admin can create new items
- Admin can ban an user, make that user can no longer log in to the system
- Display the total bill of the cart and update it as soon as the cart is updated by the user.
- Using Local Storage to store the JWT so that we only allow logged-in users to buy items.
- Option to pay and checkout using payment processing thus creating order and emptying the cart.

<hr>

## Installation process to run locally

### 1. clone the repo using this command

```bash
$ git clone https://github.com/NirajanMahara/complex.git
$ cd complex
```

<hr>

### 2. Setup MongoDB

- Local MongoDB
  - Install it from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
  - Create `.env` file in root folder
  - Set `MONGODB_URL=mongodb://localhost/complex`
  <hr>
- Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Create `.env` file in root folder
  - Set `MONGODB_URL=mongodb+srv://your-db-connection`

<hr>

#### i. Go to the parent folder of `complex` & create `.env` for connection, `JWT_SECRET`, `MONGODB_URL`, and `GOOGLE_API_KEY`.

```bash
cd complex
sudo nano .env
```

`(ctrl+x to save & nano follow instruction there)`

##### `sample code for backend .env`

```env
MONGODB_URL=YOUR_MONGODB_URL
JWT_SECRET=YOUR_JWT_SECRET
```

#### ii. create another `.env` file inside `frontend` directory for `SKIP_PREFLIGHT_CHECK`.

```bash
cd complex/frontend
sudo nano .env
```

### 3. install `npm` packages & run

#### i. install `backend` packages

```bash
npm install
npm start
```

#### ii. install `frontend` packages

```bash
# open new terminal
cd frontend
npm install
npm start
```

##### `sample code for frontend .env`

```env
SKIP_PREFLIGHT_CHECK=true
```

### 4. Seed Users and Products

- Run this on chrome browser: http://localhost:5000/api/users/seed
- It returns admin email and password
- Run this on chrome browser: http://localhost:5000/api/products/seed
- It creates 6 sample products

### 5. Admin Login

- Run http://localhost:3000/signin
- Enter admin email and password and click signin

  ```
  admin@example.com
  123456
  ```

- Enter user email and password and click signin

  ```
  john@example.com
  123456
  jane@example.com
  123456
  ```

## Support

- Q/A : [Nirajan Mahara](mailto:n.mahara2003@gmail.com)

### App Description:

    1. user can view all products
    2. user can view single product
    3. user can search products and view products by category and price range
    4. user can add to cart checkout products using paypal or credit card info
    5. user can register & sign in
    6. admin can create, edit, update & delete products
    7. admin can create categories
    8. admin can view ordered products
    9. admin can change the status of a product (processing, shipped, delivered, etc.)
