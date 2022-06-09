# Running instructions
The executable file is cli.js so to run the program you have to type in the terminal
node cli.js **\*\***
and the desired commands


# Commands:
add|a <string> Add a new todo to list
image|img <Number> Get a picture of the Pokemon that will put in his Id
get|g [options] Get all todos. (-c to completed tasks, -u to uncompleted)
set-as-complete|c <Number> Set a task as complete
delete|d <Number> delete a specific task
delete-all|da delete all tasks

* I use the pokemonClient and objects from the previous exercise

* Regarding the code review about the parseInt, I tried to use but could not find a way to convert some integers separated by commas.
For example for input like 120,34,56 the parseInt would return 120, or 1203456. I wanted to return an array of numbers [120,34,56].



