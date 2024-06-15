import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import twilio from 'twilio'; 

dotenv.config();
const app = express();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(cookieParser());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  connectTimeout: 10000,
  multipleStatements: true,
});


const handleDisconnect = () => {
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('Connected to the MySQL database');
    }
  });
};

db.on('error', (err) => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    handleDisconnect();
  } else {
    throw err;
  }
});

handleDisconnect();

app.listen(5000, () => {
  console.log('Server Listening to port 5000');
});

app.post('/auth', (req, res) => {
  const { firstName, lastName, phoneNumber, email, password, role } = req.body;
  const values = [firstName, lastName, phoneNumber, email, password, role].map((val) => (val !== undefined ? val : null));

  db.execute(
    'INSERT INTO Auth (firstname,lastname,phonenumber,email,password,role) VALUES (?, ?, ?, ?, ?, ?)',
    values,
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(201).json({ Status: 'Success' });
    }
  );
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM Auth WHERE email = ?', [email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ Error: 'Internal Login Error' });
    }
    if (data.length > 0) {
      const user = data[0];
      if (password === user.password) {
        const token = jwt.sign({ email: user.email, name: user.name, role: user.role }, 'test', { expiresIn: '1h' });
        const { password, ...userData } = user;
        res
          .cookie('AccessToken', token, {
            httpOnly: true,
            secure: true,
          })
          .status(200)
          .json({ success: true, Status: 'Success', token, data: userData });
      } else {
        return res.json({ success: false, Error: 'Password not matched' });
      }
    } else {
      return res.json({ Error: 'Email Not Existed' });
    }
  });
});

app.post('/property', (req, res) => {
  const {
    propertyName,
    propertyDescription,
    propertyLocation,
    propertyArea,
    propertyBedrooms,
    propertyBathrooms,
    propertyNearby,
    propertyPrice,
    propertyType,
    userId,
  } = req.body;
  const values = [
    propertyName,
    propertyDescription,
    propertyLocation,
    propertyArea,
    propertyBedrooms,
    propertyBathrooms,
    propertyNearby,
    propertyPrice,
    propertyType,
    userId,
  ].map((val) => (val !== undefined ? val : null));

  db.execute(
    'INSERT INTO property (name,description,location,area,bedrooms,bathrooms,nearby,price,type,userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    values,
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(201).json({ Status: 'Success' });
    }
  );
});

app.post('/send-message', async (req, res) => {
  
  const { propertyId, userId } = req.body;
  
  try {
    // Fetch property details from the database
    const [property] = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM property WHERE id = ?', [propertyId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Fetch the user details using Clerk
    console.log(userId);
    const user = await users.getUser(userId); // Use the `users` object directly
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the user's phone number
    const phoneNumber = user.phoneNumbers ? user.phoneNumbers[0].phoneNumber : null;
    if (!phoneNumber) {
      return res.status(400).json({ message: 'User phone number not available' });
    }

    // Initialize Twilio client
    const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    // Send a message using Twilio
    const message = await twilioClient.messages.create({
      body: `A booking request has been made for your property ${property.name}.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    res.status(200).json({ message: 'Message sent successfully', twilioMessage: message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/property/:id', (req, res) => {
  const propertyId = req.params.id;
  console.log('Fetching property with ID:', propertyId);

  const sql = 'SELECT * FROM property WHERE id = ?';

  db.query(sql, [propertyId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Error: 'Internal Server Error' });
    }
    if (data.length > 0) {
      console.log('Property found:', data[0]);
      res.send(data[0]); // Assuming 'data' is an array of property objects
    } else {
      console.log('Property not found with ID:', propertyId);
      res.status(404).json({ Error: 'Property Not Found' });
    }
  });
});

app.get('/AllProperty', (req, res) => {
  const sql = 'SELECT * FROM property';

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Error: 'Internal Login Error' });
    }
    if (data.length > 0) {
      res.send(data);
    } else {
      res.status(404).json({ Error: 'User Not Found' });
    }
  });
});

// Optionally, set the maximum number of listeners for the database connection
db.setMaxListeners(20); // Adjust this number based on your needs
