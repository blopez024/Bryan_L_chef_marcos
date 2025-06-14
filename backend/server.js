import { menu } from './data.js';
import express from 'express'; // Import express

const app = express(); //Instantiate a new instance of express
const port = 8080;

// Accept and parse JSON
app.use(express.json());

// Exercise: Logging (App Level)
// Create App Level Middleware to log request sent to the serve
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
})

// Create a new endpoint on the root route
app.get('/', function (request, response) {
    // Send back to the client "Hello world"
    response.send('Hello world').end();
});

// Exercise: Chef Marco wants the search
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

// Exercise: Chef Marco needs a menu!
// Create a new endpoint to retrieve specific menu item
app.get('/menu/:menuItem', (req, res) => {
    const { menuItem } = req.params;
    const item = menu.find((item) => item.id == menuItem);

    if (item) {
        res.send(item);
    } else {
        res.status(404).json({
            error: `Menu item #${menuItem} not found.`,
        });
    }
});

// Exercise: Adding a Not Implemented response
// https://expressjs.com/en/5x/api.html#res.jsonp
// app.post('/reservations', (req, res) => {
//     res.status(501).json({ error: "Route exists but isn't implemented yet" });
// });

// Exercise: Chef Marco's Handling Reservations
// Create a new endpoint to handle reservations
app.post('/reservations', (req, res) => {
    const { name, date, time } = req.body;

    if (!name || !date || !time) {
        return res.status(400).json({
            error: 'Missing name, date, or time',
        });
    }

    res
        .status(201)
        .send(
            `${name}, thank you for reserving at Chef Marco’s Restaurant on ${date} at ${time}! Your reservation is confirmed.`,
        );
});

// Exercise: Protecting Chef Macro's Recipes (Route Level)
// Route Level Middleware to check if the client has a role of "chef" in the request handler
const checkChefRole = (req, res, next) => {
    const userRole = req.headers.role;

    if (userRole && userRole === 'chef') {
        next();
    } else {
        res.status(403).json({
            error: 'Only chefs can access this!',
        });
    }
};

// Create a new endpoint to expose chef's recipe based on middleware outcome
app.get('/chef/secret-recipe', checkChefRole, (req, res) => {
    res.json({
        recipe: 'Secret Sauce: Butter, garlic, parmesan!',
    });
});

//Tell the express app that you want it to listen on port 8080 of your computer
app.listen(port, function () {
    //This function gets executed when the app starts listening
    console.log(`Server is listening on ${port}`);
});
