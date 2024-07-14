const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database/places.db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Ensure this line is present

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

app.post('/places', upload.single('image'), (req, res) => {
    const { name, location, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    db.run(`INSERT INTO places (name, location, description, image) VALUES (?, ?, ?, ?)`, [name, location, description, image], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, name, location, description, image });
    });
});

app.get('/places', (req, res) => {
    db.all(`SELECT * FROM places`, [], (err, places) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const placeIds = places.map(place => place.id);

        if (placeIds.length === 0) {
            return res.json([]);
        }

        db.all(`SELECT * FROM reviews WHERE place_id IN (${placeIds.join(',')})`, [], (err, reviews) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const placesWithReviews = places.map(place => {
                place.reviews = reviews.filter(review => review.place_id === place.id);
                return place;
            });

            res.json(placesWithReviews);
        });
    });
});

app.get('/places/:id/reviews', (req, res) => {
    const placeId = req.params.id;
    const sql = 'SELECT * FROM reviews WHERE place_id = ?';
    db.all(sql, [placeId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


app.post('/places/:id/reviews', (req, res) => {
    const placeId = req.params.id;
    const { name, rating, review } = req.body;
    const sql = 'INSERT INTO reviews (place_id, name, rating, review) VALUES (?, ?, ?, ?)';
    const params = [placeId, name, rating, review];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
