// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: 'innomsipha@gmail.com', // Your email address
        pass: 'your-email-password' // Replace with your email password or App Password
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the email server!'); // Simple response for root URL
});

// Make sure your Node.js server has the following POST route to handle email sending:
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body; // Destructure the request body

    const mailOptions = {
        from: email, // Sender's email address
        to: 'innomsipha@gmail.com', // Your email address where you want to receive messages
        subject: `New Contact Form Submission from ${name}`, // Subject line
        text: `You have received a new message from ${name} (${email}):\n\n${message}` // Message content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString()); // Respond with error status if email fails to send
        }
        res.status(200).send('Email sent: ' + info.response); // Respond with success message
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
