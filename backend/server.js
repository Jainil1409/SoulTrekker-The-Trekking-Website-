const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL,
  "https://your-movie-booking-app.vercel.app",
  "https://movie-booking-app.vercel.app",
  /\.vercel\.app$/,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));
const bookingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: String,
  gender: String,
  height: String,
  weight: String,
  email: String,
  idProof: String,
  mobile: String,
  bloodGroup: String,
  address: String,
  profilePicture: String,
  trekName: String,
  location: String,
  trekDate: String,
  travelMode: String,
  price: String
});

const Booking = mongoose.model('Booking', bookingSchema);
app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Booking saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving booking" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
