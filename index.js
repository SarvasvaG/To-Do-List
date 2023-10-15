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

app.get("/", (req, res) => {
    taskPArr=[];
    taskWArr=[];
    
    console.log(req.body+"1");
    res.render("index.ejs");
});

app.get("/work", (req, res) => {
    console.log(req.body+"2");
    res.render("work.ejs");
});

app.get("/personal", (req, res) => {
    console.log(req.body+"3");
    res.render("personal.ejs");
});

app.post("/", (req, res) => {
    console.log(req.body+"4");
    res.render("index.ejs");
});

app.post("/personal", (req, res) => {
    console.log(req.body+"5");
    const task = req.body.task;
    const del_ = req.body.delete;

    if (del_ !== undefined)
        taskPArr = [];

    else if (task !== undefined && checkNonEmpty(task))
        taskPArr.push(task);

    res.redirect('/success-p');
});


app.get('/success-p', (req, res) => {
    console.log(req.body+"6");
    res.render("personal.ejs", { task: taskPArr, });
});


app.post("/work", (req, res) => {
    console.log(req.body+"7");
    const task = req.body.task;
    const del_ = req.body.delete;
    console.log(req.body);

    if (del_ !== undefined)
        taskWArr = [];

    else if (task !== undefined && checkNonEmpty(task))
        taskWArr.push(task);
    console.log(task);

    res.redirect('/success-w');
});

app.get('/success-w', (req, res) => {
    console.log(req.body+"8");
    res.render("work.ejs", { task: taskWArr, });
});

app.listen(port, () => {
    console.log("Listening on the port 3000.");
})