const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compileCode = require('./backend/compiler');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Route to compile code
app.post('/compile', (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }

    // Compile and execute the code
    const result = compileCode(code);

    // Send the response
    res.json({ output: result });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
