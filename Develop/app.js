const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "./team.html");

const render = require("./lib/htmlRenderer");
const teamMembers = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
    inquirer.prompt( [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the Manager\'s name: ',
    },
    {
        type: 'input',
        name: 'id',
        message: 'Enter the Manager\'s id: '
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter  your email: '
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Enter the office number: '
    }
    ])
        .then(answers => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            teamMembers.push(manager);
            determineEmployee();
        });

    function determineEmployee() {
        inquirer.prompt({
            type: 'list',
            choices: ['Add Engineer', 'Add Intern', 'Done'],
            name: 'choice',
            message: 'What would you like to do: ',
        })
            .then(answers => {
                if (answers.choice === 'Add Engineer') {
                    createEngineer();
                } else if (answers.choice === 'Add Intern') {
                    createIntern();
                } else if (answers.choice === 'Done') {
                    createHTML();
                }
            })
    };

function createIntern() {
    inquirer.prompt( [
        {
            type: 'input',
            name: 'name',
            message: 'Enter the Intern\'s name: ',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the Intern\'s id: '
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email: '
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter your school: '
        }
        ])
            .then(answers => {
                const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                teamMembers.push(intern);
                determineEmployee();
            });
        }

function createEngineer(){
    inquirer.prompt( [
        {
            type: 'input',
            name: 'name',
            message: 'Enter the Engineer\'s name: ',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter the Engineer\'s id: '
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your Email: '
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub: '
        }
        ])
            .then(answers => {
                const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                teamMembers.push(engineer);
                determineEmployee();
            });
}

function createHTML() {
    fs.writeFileSync(outputPath, render(teamMembers));
}