# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

For sorting the todos based on priority. I used the javascript sort function in which , used the logic to sort the todos on the basis of their priority.
Also if 2 todos are having the same priority, then kept the completed at bottom as asked in task description.

For searching , created the local state which holds the text that is searched in the search box. And there is an event attached to that search box which leads to trigger a function upon every change.
And if the todos are found which contains the searched string , then those todos are stored in separate list.
Used the conditional rendering for showing the list.
If the searched text length is 0 , then that means user haven't searched anyhitng so just show the all the todos that were there.
else if the length of searched string is greater than 0 , then user searched something , and on that basis we will be having the separate List(searchedList) which has the todos based on searched string.

Now as the searchedList have length greater than 0 , so show this searchedList . If searchedList have length 0 , then that means searched text doesn't match with any of the todos.

User can sort the task upon searching and in normal mode as well.
