import http from 'http'
import app from './app/app.js';

const PORT = process.env.PORT || 5001;
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is up and running on port ${PORT}`))

// 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