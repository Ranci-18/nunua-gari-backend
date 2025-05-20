import express from 'express';
import cors from 'cors'
import connect2DB from '../../lib/mongodb';
import Car from '../../models/Car';

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json()); // to parse JSON bodies

// add new car endpoint
app.post('/api/add_new_car', async (req, res) => {
    const carData = req.body;
    console.log(carData); // log the received data

     // Validate required fields
     if (
        !carData.make ||
        !carData.model ||
        !carData.year ||
        !carData.price ||
        !carData.mileage ||
        !carData.color ||
        !carData.transmission ||
        !carData.fuelType ||
        !carData.bodyStyle ||
        !carData.description ||
        !carData.images ||
        !Array.isArray(carData.images) ||
        carData.featured === undefined ||
        !carData.features ||
        !Array.isArray(carData.features) ||
        !carData.specifications ||
        !carData.specifications.performance ||
        carData.specifications.performance.zeroToSixty === undefined ||
        carData.specifications.performance.topSpeed === undefined ||
        carData.specifications.performance.fuelEconomyCity === undefined ||
        carData.specifications.performance.fuelEconomyHighway === undefined
    ) {
        return res.status(400).json({ message: 'Missing required car data' });
    }
    
    try {
        const newCar = new Car(carData);
        await newCar.save();
        
        // If validation passes, proceed to save the car data
        res.status(201).json({ message: 'Car added successfully', data: newCar });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});