import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
var taskWArr = [];
var taskPArr = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function checkNonEmpty(task){
    if(task.length===0)
    return false;

    for(i=0;i<task.length;i++)
    if(task[i]!=' ')
    return true;

    return false;
}

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/work", (req, res) => {
    res.render("work.ejs");
});

app.get("/personal", (req, res) => {
    res.render("personal.ejs");
});

app.post("/", (req, res) => {
    res.render("home.ejs");
});

app.post("/personal", (req, res) => {
    console.log(req.body);
    const task = req.body.task;
    const del_=req.body.delete;

    if(del_!==undefined)
    taskPArr=[];

    else if (task !== undefined && checkNonEmpty(task))
        taskPArr.push(task);

    res.redirect('/success-p');
});


app.get('/success-p', (req, res) => {
    res.render("personal.ejs", { task: taskPArr, });
});


app.post("/work", (req, res) => {
    const task = req.body.task;
    const del_=req.body.delete;
    console.log(req.body);

    if(del_!==undefined)
    taskPArr=[];

    else if (task !== undefined&& checkNonEmpty(task))
        taskWArr.push(task);
    console.log(task);

    res.redirect('/success-w');
});

app.get('/success-w', (req, res) => {
    res.render("work.ejs", { task: taskWArr, });
});

app.listen(port, () => {
    console.log("Listening on the port 3000.");
})