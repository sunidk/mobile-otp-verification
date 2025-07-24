# Mobile OTP Verification

A Node.js application for sending and verifying OTPs (One-Time Passwords) via SMS using Twilio.

## Features

- Send OTP to any mobile number via SMS
- Verify OTP using Twilio Verify API
- REST API endpoints for sending and verifying OTPs

## How to Use

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Set up environment variables:**  
   Create a `.env` file in the root directory with:
   ```
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_MESSAGING_SERVICE_SID=your_twilio_messaging_service_sid
   PORT=3000
   ```

3. **Start the server:**
   ```sh
   node index.js
   ```

4. **Send OTP:**  
   Make a POST request to `/send-otp` with JSON body:
   ```json
   { "phoneNumber": "+1234567890" }
   ```

5. **Verify OTP:**  
   Make a POST request to `/verify-otp` with JSON body:
   ```json
   { "phoneNumber": "+1234567890", "otp": "123456" }
   ```

## Files

- `index.js` – Main server file

## Dependencies

- express
- twilio
- dotenv

## License

This project is open source and available under the [MIT License](LICENSE).