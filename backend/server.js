import { menu } from './data.js';
import express from 'express'; // Import express
const app = express(); //Instantiate a new instance of express

// Create a new endpoint on the root route
app.get('/', function (request, response) {
    // Send back to the client "Hello world"
    response.send('Hello world').end();
});

// Create a new endpoint for menu with pricing option
app.get('/menu', (req, res) => {
    const { maxPrice } = req.query;

    // If maxPrice is not provided or invalid, return the full menu
    if (isNaN(maxPrice)) {
        return res.json(menu);
    }

    const filteredMenu = menu.filter((item) => item.price <= maxPrice);

    if (filteredMenu.length === 0) {
        return res.status(404).json({
            error: `No menu items found with a price less than or equal to ${maxPrice}.`,
        });
    }

    res.json(filteredMenu);
});

// Create a new endpoint to retrieve specific menu item
app.get('/menu/:menuItem', (req, res) => {
    const { menuItem } = req.params;
    res.send(menu.filter((item) => item.id == menuItem));
});

// https://expressjs.com/en/5x/api.html#res.jsonp
app.post('/reservations', (req, res) => {
    res.status(501).json({ error: "Route exists but isn't implemented yet" });
});

//Tell the express app that you want it to listen on port 8080 of your computer
app.listen(8080, function () {
    //This function gets executed when the app starts listening
    console.log('Server is listening on 8080');
});
