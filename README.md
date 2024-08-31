# [Project : Node E Commerce Project (Still Under Construction)]()
## Table of contents

  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Built with](#built-with)
  - [Useful resources](#useful-resources)



## The challenge
Project aims to develop a safe e commerce site; where admin can manage products and users can signup, signin and buy products online.

## Problem Statement

- Develop an app which requires email and password for signup. 
- Provides a verification link in email.
- Stores user passwords in the database as encrypted.
- Sends reset password link to user email address in case user forgets the password.
- User change the password when already signed in.
- Admin creates, updates and deletes products using dashboard, which is designed for admin.
- Admin changes status of order using dashboard, which is designed for admin.
- Users can search products according to name, price, product rate and sort products in different varieties. 
- Users can add products to the Cart, %5 tax and $7.5 shipping cost added automatically per order.
- If a specific product is out of stock, user cannot order.
- User can make the payment with card.
- User can see reviews for any product but can write a product only if he/she had bought the product. And can update the review afterwards.
- Average rating is recalculated, every time a user gave a new rating, the rating is updated or deleted.
- Inventory level for each product is updated after each order create, order delete and order status change (pending, failed, paid, delivered, canceled).
<hr>




## Screenshot
<p align="center">
<img src="E-Commerce(1).gif" alt="gif">
</p>





### Project Information
- For backend Node.js and Express.js is used,
- Verification Emails and Reset Password Emails are being sent by using Sendgrid package,
- For encryption and decryption jwt package is used,
- For backend security; express-rate-limit, helmet, xss-clean, cors, express-mongo-sanitize packages are used,
- Token exchange between frontend and backend provided by adding double layered cookies (authentication token, refreshtoken),
- Frontend is developed by using React,
- Global state management is done by using Redux-persist,
- For providing multipage experience to user, React Router Dom is used,
- For styling, traditidional Tailwind CSS is used.

------
I used;
- Node.js
- Express.js
- jwt
- Sendgrid
- React
- Redux-persist
- React Router
- Tailwind CSS





## Lesson Learned

- This project took a long time. Mainly because I had other responsibilities during daytime and I had only 1 or 2 hours in a day to develop this project. So it was difficult for me to concentrate to the project. And because this project is very detailed it was difficult to foresee the structure at the beginnig. So I've wrote some code and changed structure at some points. If I start to a project like this or more complicated, I would try to focus on planning more. 

### Useful resources

- [W3 Schoold](https://www.w3schools.com/) 
- [MDN](https://developer.mozilla.org/en-US/)
- [NODE.JS](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html)
- [EXPRESS.JS](https://expressjs.com/)
- [JASONWEBTOKEN](https://jwt.io/introduction)
- [SENDGRID](https://sendgrid.com/en-us)
- [REACT](https://reactjs.org/) 
- [REACT ROUTER](https://reactrouter.com/en/main) 
- [TAILWINDCSS](https://styled-components.com/)
- [STRIPE](https://docs.stripe.com/)









<center> &#8987; Happy Coding  &#9997; </center>
