import express from 'express';
import * as path from 'path';

const app = express();
const PORT = parseInt(process.env.PORT || '8080', 10);

// Serve static files from the root directory
app.use(express.static(__dirname));

// Default route to list pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'tsgabrielle®_homepage', 'code.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});