const app = require('./src/server');
const port = process.env.PORT || 3001;
app.listen(port);
console.log(`App running on http://localhost:${port}`);