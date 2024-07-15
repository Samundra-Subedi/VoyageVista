const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const db = new sqlite3.Database('./database/places.db');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Ensure this line is present

const mindsdbApiUrl = process.env.MINDSDB_API_URL;
const mindsdbApiKey = process.env.MINDSDB_API_KEY;

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
            return res.status(500).json({ error: err.message });
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
            return res.status(500).json({ error: err.message });
        }
        
        // Return the ID of the newly inserted review
        res.json({ id: this.lastID });
    });
});

const createMLEngine = async () => {
    const query = `
        CREATE ML_ENGINE minds_endpoint_engine
        FROM minds_endpoint
        USING
            minds_endpoint_api_key = '${mindsdbApiKey}';
    `;

    await axios.post(mindsdbApiUrl, { query }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const createModel = async () => {
    const query = `
    CREATE MODEL mindsdb.travel_suggestions
    PREDICT suggestions
    USING
        engine = 'minds_endpoint_engine',
        max_tokens = 512,
        prompt_template = 'Based on the following available places: {{places}}, and the question: {{user_question}}, suggest place to visit. Provide short result with name and location of that place. Only provides places from above places list.';
    `;

    await axios.post(mindsdbApiUrl, { query }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    await new Promise(resolve => setTimeout(resolve, 4000));
};

const queryModel = async (places, user_question) => {
    const placesString = places.map(place => `${place.name} in ${place.location}`).join(', ');
    const query = `
        SELECT suggestions
        FROM mindsdb.travel_suggestions
        WHERE places = '${placesString}' AND user_question = '${user_question}';
    `;

    const response = await axios.post(mindsdbApiUrl, { query }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data.data;
};


app.post('/suggestions', async (req, res) => {
    const { places, question } = req.body;

    if (!places || !Array.isArray(places) || places.length === 0 || !question) {
        return res.status(400).json({ error: 'Invalid input. Please provide an array of places and a question.' });
    }

    try {
        // Create the ML engine and model if they don't exist
        await createMLEngine();
        await createModel();

        // Wait for model creation
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Query the model
        const suggestions = await queryModel(places, question);

        if (suggestions) {
            res.json({ places, question, suggestions });
        } else {
            res.status(500).json({ error: 'Failed to generate suggestions' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating suggestions' });
    }
});


const createSentimentAnalysisModel = async () => {
    const query = `
    CREATE MODEL mindsdb.sentiment_classifier_model
    PREDICT sentiment
    USING
        engine = 'minds_endpoint_engine',
        max_tokens = 512,
    prompt_template = 'describe the sentiment, highlights and negative_feedback of the reviews    
                     "{{review}}.":
                     Format the result as {"sentiment":"......","highlights":".......", "negative_feedback":"....."}.'
    `;

    await axios.post(mindsdbApiUrl, { query }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    await new Promise(resolve => setTimeout(resolve, 4000));
};


app.post('/sentiment-analysis', async (req, res) => {
    const { reviews } = req.body;
    console.log(reviews)
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
        return res.status(400).json({ error: 'Invalid input. Please provide an array of reviews.' });
    }

    try {
        // Create the ML engine and model if they don't exist
        await createMLEngine();
        await createSentimentAnalysisModel();

        // Wait for model creation
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Prepare reviews for model querying
        const reviewsString = reviews.join(' '); // Join reviews into a single string
        const query = `
            SELECT review, sentiment
            FROM sentiment_classifier_model
            WHERE review = '${reviewsString}';
        `;

        const response = await axios.post(mindsdbApiUrl, { query }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = response.data.data;
        // console.log(result)
        if (result) {
            res.json(result);
        } else {
            res.status(500).json({ error: 'Failed to analyze sentiment' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while analyzing sentiment' });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
