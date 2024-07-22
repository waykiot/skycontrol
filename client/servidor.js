const express = require("express");
const path = require("path");

const app = express();

// Ajusta esta línea para asegurarte de que apunta al directorio correcto
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", function (req, res) {
    // Ajusta esta línea para asegurarte de que apunta al archivo index.html correcto
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
