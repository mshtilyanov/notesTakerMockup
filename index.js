import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let dataContent = {
    "Title1": "My example note",
    "Title2": "My second example note"
};

/**
 * Middleware to serve static files from the 'public' directory.
 */
app.use(express.static('public'));

/**
 * Middleware to parse incoming request bodies.
 */
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * GET request handler for the root route.
 * Renders the 'index.ejs' template with the 'dataContent' object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/", (req, res) => {
    res.render("index.ejs", { posts: dataContent });
});

/**
 * GET request handler for the '/newNote' route.
 * Renders the 'newNote.ejs' template with the 'dataContent' object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/newNote", (req, res) => {
    res.render("newNote.ejs", { posts: dataContent });
});

/**
 * GET request handler for the '/editNote' route.
 * Renders the 'editNote.ejs' template with the specific note from 'dataContent'.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/editNote", (req, res) => {
    res.render("editNote.ejs", { posts: dataContent[req.query["title"]], title: req.query["title"] });
});

/**
 * GET request handler for the '/deleteNote' route.
 * Deletes the specific note from 'dataContent' and renders the 'index.ejs' template.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/deleteNote", (req, res) => {
    delete dataContent[req.query["title"]];
    res.render("index.ejs", { posts: dataContent });
});

/**
 * POST request handler for the '/newNote' route.
 * Adds a new note to 'dataContent' and renders the 'index.ejs' template.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post("/newNote", (req, res) => {
    dataContent[req.body["noteTitle"]] = req.body["noteContent"];
    res.render("index.ejs", { posts: dataContent });
});

/**
 * Starts the server and listens on the specified port.
 */
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
