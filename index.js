import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

function checkNonEmpty(task) {
    if (task.length === 0)
        return false;

    for (var i = 0; i < task.length; i++)
        if (task[i] != ' ')
            return true;

    return false;
}

app.get("/", (req, res) => {
    req.session.taskPArr = [];
    req.session.taskWArr = [];

    res.render("index.ejs");
});

app.post("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/personal", (req, res) => {
    const task = req.body.task;
    const del_ = req.body.delete;

    if (del_ !== undefined)
        req.session.taskPArr = [];
    else if (task !== undefined && checkNonEmpty(task))
        req.session.taskPArr.push(task);

    res.redirect('/success-p');
});


app.get('/success-p', (req, res) => {
    res.render("personal.ejs", { task: req.session.taskPArr, });
});


app.post("/work", (req, res) => {
    const task = req.body.task;
    const del_ = req.body.delete;

    if (del_ !== undefined)
        req.session.taskWArr = [];
    else if (task !== undefined && checkNonEmpty(task))
        req.session.taskWArr.push(task);

    res.redirect('/success-w');
});

app.get('/success-w', (req, res) => {
    res.render("work.ejs", { task: req.session.taskWArr, });
});

app.listen(port, () => {
    console.log("Listening on the port 3000.");
});