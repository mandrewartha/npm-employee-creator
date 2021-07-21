var {prompt} = require("inquirer")
var Engineer = require("./lib/Engineer")
var Intern = require("./lib/Intern")
var Manager = require("./lib/Manager")

var fs = require("fs")
var path = require("path")

const managerArray = []
const internArray = []
const engineerArray = []

function createManager() {
    prompt([
        {
        type: "input",
        message: "What is the manager's name?",
        name: "managerName"
        },
        {
            type:"input",
            message: "What is the employee id?",
            name: "employeeId"
        },
        {
            type:"input",
            message: "What is employee email?",
            name: "employeeEmail"
        },
        {
            type:"input",
            message: "What is employee office number",
            name: "employeeOfficeNumber"
        }
    ]) .then ((answers) => {
        const manager = new Manager(answers.managerName, answers.employeeId, answers.employeeEmail, answers.employeeOfficeNumber)
        managerArray.push(manager)
        console.log(managerArray)
       
        nextQuestion()
    })
    
}

createManager()

function createEngineer() {
    prompt([
        {
        type: "input",
        message: "What is the engineer's name?",
        name: "engineerName"
        },
        {
            type:"input",
            message: "What is the employee id?",
            name: "employeeId"
        },
        {
            type:"input",
            message: "What is employee email?",
            name: "employeeEmail"
        },
        {
            type:"input",
            message: "What is your github username?",
            name: "employeeGit"
        }
    ]) .then ((answers) => {
        const engineer = new Engineer (answers.engineerName, answers.employeeId, answers.employeeEmail, answers.employeeGit)
        engineerArray.push(engineer)
        console.log(engineerArray)
       
        nextQuestion()
    })
    
}



function createIntern() {
    prompt([
        {
        type: "input",
        message: "What is the intern's name?",
        name: "internName"
        },
        {
            type:"input",
            message: "What is the employee id?",
            name: "employeeId"
        },
        {
            type:"input",
            message: "What is employee email?",
            name: "employeeEmail"
        },
        {
            type:"input",
            message: "What school does the intern go to?",
            name: "internSchool"
        }
    ]) .then ((answers) => {
        const intern = new Intern (answers.internName, answers.employeeId, answers.employeeEmail, answers.internSchool)
        internArray.push(intern)
        console.log(internArray)
       
        nextQuestion()
    })
    
}



function nextQuestion() {
    prompt([
        {
            type:"list",
            message: "what type of employee do you want to create?",
            choices: ["Manager", "Intern", "Engineer", "none"],
            name: "buildNextEmployee"
        }
    ]) .then(answers => {
        if (answers.buildNextEmployee === "Manager") {
            createManager()
        } else if (answers.buildNextEmployee === "Intern") {
            createIntern()
        } else if (answers.buildNextEmployee === "Engineer") {
            createEngineer()
        } else {
            buildHtml()
        }
    }) 

    }

 

    function buildHtml() {
        fs.writeFile("index.html", `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>
                Employees
            </h1>
        </div>
        <div>
            <div>
                ${createManagerCard()}
                ${createInternCard()}
                ${createEngineerCard()}
            </div>
            
        </div>
    </div>
</body>
</html>
        `, (err) => 
        err ? console.log(err) : console.log("Successfully created index.html!"))
    }

    function createManagerCard() {
        let manager = ``;
        for (let i = 0; i < managerArray.length; i++) {
            const managerIndex = managerArray[i];
            manager+= `
            <div>
                    <div>
                        <div>
                            <h3>${managerIndex.name}</h3>
                            <p>id: ${managerIndex.id}</p>
                            <p>office number: ${managerIndex.officeNumber}</p>
                            <p>email: ${managerIndex.email}</p>
                            
                        </div>
                    </div>
                </div>
            `
        }
        return manager
    }

    function createEngineerCard() {
        let engineer = ``;
        for (let i = 0; i < engineerArray.length; i++) {
            const engineerIndex = engineerArray[i];
            engineer+= `
            <div>
                    <div>
                        <div>
                            <h3>${engineerIndex.name}</h3>
                            <p>id: ${engineerIndex.id}</p>
                            <p>github: ${engineerIndex.github}</p>
                            <p>email: ${engineerIndex.email}</p>
                        </div>
                    </div>
                </div>
            `
        }
        return engineer
    }

    function createInternCard() {
        let intern = ``;
        for (let i = 0; i < internArray.length; i++) {
            const internIndex = internArray[i];
            intern+= `
            <div>
                    <div>
                        <div>
                            <h3>${internIndex.name}</h3>
                            <p>id: ${internIndex.id}</p>
                            <p>school: ${internIndex.school}</p>
                            <p>email: ${internIndex.email}</p>
                        </div>
                    </div>
                </div>
            `
        }
        return intern
    }