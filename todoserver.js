const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/todoViews/index.html");
});

app.post("/todo", function (req, res) {
    saveTodoInFile(req.body, function (err) {
        if(err){
            res.status(500).send("error");
            return; 
        }
        res.status(200).send("success");
    })
});

app.get("/todo-data", function (req, res) {
    readAllTodos(function (err, data) {
        if(err) {
            res.status(500).send("error");
            return;
        }

        // res.status(200).send(data);
        res.status(200).json(data);
    });
});

app.delete("/delete-todo", function (req, res) {
    const todoToDelete = req.body;

    // Implement the logic to delete the task from the file
    deleteTodoFromFile(todoToDelete, function (err) {
        if (err) {
            console.error("Error deleting task:", err);
            res.status(500).send("Error deleting task.");
        } else {
            res.status(200).send("Task deleted successfully.");
        }
    });
});


app.get("/about", function(req,res) {
    res.sendFile(__dirname + "/todoViews/about.html");
});

app.get("/contact", function (req, res) {
    res.sendFile(__dirname + "/todoViews/contact.html");
});

app.get("/todo", function (req, res) {
    res.sendFile(__dirname + "/todoViews/todo.html");
});

app.get("/scripts/todoScript.js", function (req, res) {
    res.sendFile(__dirname + "/todoViews/scripts/todoScript.js");
});

app.listen(3000, function () {
    console.log("connection brabar chhe");
});


function readAllTodos(callback){
    fs.readFile("./treasures.mp4", "utf-8", function (err, data) {
        if (err){
            callback(err);
            return;
        }

        if (data.length === 0){
            data = "[]";
        }

        try{
            data = JSON.parse(data);
            callback(null, data);
        } catch (err) {
            callback(err);
        }
    });
}

function saveTodoInFile(todo, callback){
    readAllTodos(function (err, data) {
        if(err){
            callback(err);
            return;
        }


        data.push(todo);

        fs.writeFile("./treasures.mp4", JSON.stringify(data), function (err) {
            if(err) {
                callback(err);
                return;
            }

            callback(null);
        });
    });
}


function deleteTodoFromFile(todo, callback) {
    readAllTodos(function (err, data) {
        if (err) {
            callback(err);
            return;
        }

        // Find and remove the task with matching todoText
        data = data.filter((item) => item.todoText !== todo.todoText);

        fs.writeFile("./treasures.mp4", JSON.stringify(data), function (err) {
            if (err) {
                callback(err);
                return;
            }

            callback(null);
        });
    });
}


// New function to update the checked status of a task in the file
function updateCheckedStatusInFile(todoText, checkedStatus, callback) {
    readAllTodos(function (err, data) {
        if (err) {
            callback(err);
            return;
        }

        // Find the task with the matching todoText
        const taskToUpdate = data.find((task) => task.todoText === todoText);
        if (taskToUpdate) {
            taskToUpdate.checked = checkedStatus;
        }

        fs.writeFile("./treasures.mp4", JSON.stringify(data), function (err) {
            if (err) {
                callback(err);
                return;
            }

            callback(null);
        });
    });
}