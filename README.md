# Chef Marco's Express Server

This project sets up a basic **Express.js** server simulating a restaurant service for **Chef Marco**, offering endpoints for menu browsing, reservations, and a protected secret recipe.

---

## 📦 Features

- 🌐 Express server running on **port 8080**
- 🧾 App-level logging middleware for all incoming requests
- 🔎 Endpoints to retrieve and filter menu items
- 📅 Reservation handling with validation
- 🔐 Protected route using role-based access control

---

## 🔧 Middleware

### App-level Logging

Logs the method, URL, and timestamp for every request:

```text
[2025-06-13T12:00:00.000Z] GET /menu
```

### Role-based Access Control

Used to protect the `/chef/secret-recipe` route, allowing access only if the request includes:

```http
role: chef
```

---

## 📡 API Endpoints

### `GET /`

Returns a simple welcome message:

```
Hello world
```

---

### `GET /menu`

Returns the full menu or filters by `maxPrice`.

#### Optional Query Parameters:

- `maxPrice`: Return items with a price ≤ this value.

#### Example:

```http
GET /menu?maxPrice=15
```

#### Responses:

- `200 OK`: Filtered or full menu
- `404 Not Found`: If no items match the filter

---

### `GET /menu/:menuItem`

Returns a specific menu item by `id`.

#### Example:

```http
GET /menu/2
```

#### Responses:

- `200 OK`: Menu item found
- `404 Not Found`: If item does not exist

---

### `POST /reservations`

Creates a new reservation.

#### Expected JSON body:

```json
{
  "name": "Alice",
  "date": "2025-06-15",
  "time": "18:30"
}
```

#### Responses:

- `201 Created`: Confirmation message
- `400 Bad Request`: If any field is missing

---

### `GET /chef/secret-recipe`

Protected route for chefs only.

#### Required Header:

```http
role: chef
```

#### Responses:

- `200 OK`: Returns the secret recipe
- `403 Forbidden`: If role is missing or incorrect

---

## 📁 Data Source

The menu is imported from an external file:

```js
import { menu } from './data.js';
```

The structure of each menu item is assumed to include at least:

- `id`
- `name`
- `price`

---

## 🧑‍🍳 Made for Chef Marco

Happy cooking!
