const customExpress = require('./config/customExpress.js');
require('dotenv/config');

const app = customExpress();

const port = process.env.PORT;

app.listen(port, () => console.log(`API listening on port: ${port}`));