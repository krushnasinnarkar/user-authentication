# User Authentication

This project provides a user authentication service, including registration, login, OTP-based email verification, and password reset functionality.

## Project Setup

### Clone the Repository

Make sure you have Git installed, and clone the repository using the following command:

```bash
git clone https://github.com/krushnasinnarkar/user-authentication
```

### Environment Variables

Create a `.env` file in the root directory and add the following variables with your own values:

```bash
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
PORT=5000
JWT_LIFETIME=30d
```

### Install Dependencies

To install the necessary dependencies and start the project, run the following command:

```bash
npm install && npm start
```

### Testing OTP

- For testing OTP functionality, we're using Ethereal Email. You can create a free email account there and use it to send and receive OTPs.
- The API uses Nodemailer with Ethereal Email for testing the OTP functionality.

### Postman Collection

- Import the [`user-auth.postman_collection.json`](./user-auth.postman_collection.json) file into Postman to test all the endpoints.
- This collection includes pre-configured requests for all authentication-related routes, including OTP generation and verification.
- The collection dynamically sets up the OTP and OTP verification status.

### Postman Testing Flow

- **Send OTP:** The OTP sent in the "Send OTP" route will be automatically stored in Postman's collection variables.
- **Verify OTP:** The stored OTP will be automatically used when verifying OTP, and the verification status will be stored in the collection variables.
- **Register User:** After OTP verification, the registration route will use the OTP verification status automatically.
- **Login User:** Log in with the registered user credentials.
- **Reset Password:** You need to send and verify OTP again; the password reset will use the OTP verification status automatically.
