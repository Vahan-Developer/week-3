const express = require("express");
const app = express();
const path = require("path");
const mainRoute = require("./routes/main");
const gamesRouter = require("./routes/games");
const bodyParser = require("body-parser");
const cors = require("./middlewares/cors");
const PORT = 3000;

app.use (
cors,
express.static(path.join(__dirname, "public")),
bodyParser.json(),
mainRoute, 
gamesRouter
);

app.listen(PORT, () => {
console.log (`Приложение запущено тут: http://localhost:${PORT}`);
});
