import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
var taskWArr = [];
var taskPArr = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function checkNonEmpty(task) {
    if (task.length === 0)
        return false;

    for (i = 0; i < task.length; i++)
        if (task[i] != ' ')
            return true;

    return false;
}

function createTask(req,arr)
{
    const task = req.body.task;
    const del_ = req.body.delete;

    if (del_ !== undefined)
        arr = [];

    else if (task !== undefined && checkNonEmpty(task))
        arr.push(task);
}

app.get("/", (req, res) => {
    taskPArr=[];
    taskWArr=[];

    res.render("index.ejs");
});

app.post("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/personal", (req, res) => {
    createTask(req,taskPArr);
    res.redirect('/success-p');
});


app.get('/success-p', (req, res) => {
    res.render("personal.ejs", { task: taskPArr, });
});


app.post("/work", (req, res) => {
    createTask(req,taskWArr);
    res.redirect('/success-w');
});

app.get('/success-w', (req, res) => {
    res.render("work.ejs", { task: taskWArr, });
});

app.listen(port, () => {
    console.log("Listening on the port 3000.");
})