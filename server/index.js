import express ,{response } from "express";
import mysql from "mysql2";
import cors from "cors";
import jwt, { decode } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


dotenv.config();
const app=express();
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use(cookieParser());

const db=mysql.createConnection({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port:process.env.MYSQL_PORT,
    database:process.env.MYSQL_DATABASE
})


app.listen(5000,()=>{
    console.log("Server Listening to port 5000");
})

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'test', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.userId = decoded.email; // Assuming the JWT token contains a user email
        next();
    });
};

app.post('/auth', (req, res) => {
    const { firstName, lastName, phoneNumber, email, password, role } = req.body;
    const values = [firstName, lastName, phoneNumber, email, password, role].map(val => (val !== undefined ? val : null));

    

    db.execute(
        'INSERT INTO Auth (firstname,lastname,phonenumber,email,password,role) VALUES (?, ?, ?, ?, ?, ?)',
        values,
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ Status: "Success" });
            
        }
    );
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM Auth WHERE email = ?', [email], (err, data) => {
        if (err) {
            console.log(err);
            return res.json({ Error: "Internal Login Error" });
        }
        if (data.length > 0) {
            const user = data[0];
            if (password === user.password) {
                const token = jwt.sign({ email: user.email, name: user.name, role: user.role }, 'test', { expiresIn: '1h' });
                const { password, ...userData } = user;
                res
                    .cookie("AccessToken", token, {
                        httpOnly: true,
                        secure: true,
                    })
                    .status(200)
                    .json({ success: true, Status: "Success", token, data: userData });
            } else {
                return res.json({ success: false, Error: "Password not matched" });
            }
        } else {
            return res.json({ Error: "Email Not Existed" });
        }
    });
});



app.get('/verifyToken', verifyToken, (req, res) => {
    res.json({ message: 'Token verified' });
});
app.get("/singleUser", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.decode(token);
    console.log(decodedToken)
    const sql = 'SELECT * FROM Auth WHERE email = ?';
    db.query(sql, [decodedToken.email], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Error: "Internal Login Error" });
        }
        if (data.length > 0) {
            res.send(data[0]);
        } else {
            res.status(404).json({ Error: "User Not Found" });
        }
    });
});




app.post('/property', (req, res) => {
    const { propertyName, propertyDescription, propertyLocation, propertyArea, propertyBedrooms,propertyBathrooms,propertyNearby,propertyPrice,propertyType,userId} = req.body;
    const values = [propertyName, propertyDescription, propertyLocation, propertyArea, propertyBedrooms,propertyBathrooms,propertyNearby,propertyPrice,propertyType,userId].map(val => (val !== undefined ? val : null));

    

    db.execute(
        'INSERT INTO property (name,description,location,area,bedrooms,bathrooms,nearby,price,type,userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        values,
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ Status: "Success" });
            
        }
    );
});
app.get('/Property/:userId', (req, res) => {
    const userId = req.params.userId;

    
    const sql = `
    SELECT * FROM property WHERE userID = ?`;

    db.query(sql, [userId], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Error: "Internal Login Error" });
        }
        if (data.length > 0) {
            res.send(data);
        } else {
            res.status(404).json({ Error: "User Not Found" });
        }
    });
});



app.get('/AllProperty', (req, res) => {
    
    
    const sql = `
    SELECT * FROM property `;

    db.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Error: "Internal Login Error" });
        }
        if (data.length > 0) {
            res.send(data);
        } else {
            res.status(404).json({ Error: "User Not Found" });
        }
    });
});

// app.delete('/property/:id', verifyToken, (req, res) => {
//     const propertyId = req.params.id;
//     const userId = req.userId;

//     const sql = 'DELETE FROM property WHERE id = ? AND userID = ?';
//     db.execute(sql, [propertyId, userId], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'Internal Server Error' });
//         }
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'Property not found or unauthorized' });
//         }
//         res.status(200).json({ message: 'Property deleted successfully' });
//     });
// });