# Lunéra Store — E-Commerce Web Application

Lunéra Store is a full-stack e-commerce web application built with Node.js, Express, and MongoDB.  
It allows users to browse products, add them to a cart, and complete purchases using PayPal Sandbox.

---

## Features

- Add and manage products
- View product list and details
- Add items to cart
- Remove items from cart
- Checkout system with total price calculation
- PayPal Sandbox payment integration
- Order saving after successful payment
- View all orders

---

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- HTML, CSS, JavaScript
- PayPal JavaScript SDK

---

## How to Run the Project

### 1. Clone the repository
```
git clone https://github.com/ilayda26/lunera-store.git
cd lunera-store
```

### 2. Install dependencies
```
npm install
```

### 3. Create a .env file
```
Create a .env file in the root folder and add:
PORT=5000
MONGO_URI=mongodb://localhost:27017/fashionstore
```

### 4. Start the server
```
npm run dev
```

### 5. Open your browser at http://localhost:5000

## PayPal Setup (Sandbox)
This project uses PayPal Sandbox for testing payments.
1. Go to https://developer.paypal.com/
2. Log in with your PayPal account
3. Create an app in Sandbox
4. Copy your Client ID
5. 5. Replace it in the following line inside `checkout.html`:

```
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=EUR"></script>
```
6. Use a Sandbox buyer account to test payments







