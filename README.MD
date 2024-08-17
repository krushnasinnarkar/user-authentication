# User Authentication Service

This project provides a user authentication service, including registration, login, OTP-based email verification, and password reset functionality.

## Project Setup

### Environment Variables

Create a `.env` file in the root directory and add the following variables with your own values:

- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A 256-bit encryption key for signing JWT tokens. You can generate one using an online encryption key generator.
- `PORT`: The port number for the server (e.g., 5000).
- `JWT_LIFETIME`: The lifetime of the JWT token (e.g., 30d).

### Install Dependencies

To install the necessary dependencies and start the project, run the following command:

```bash
npm install && npm start
```

### Testing OTP
For testing OTP functionality, we're using Ethereal Email. You can create a free email account there and use it to send and receive OTPs.

### Postman Collection
To test all the endpoints, import the user-auth.postman_collection.json file into Postman. This collection includes pre-configured requests for all authentication-related routes, including OTP generation and verification.

- Sending OTP
- Verifying OTP
- Registering a User
- Logging in a User
- Resetting Password
