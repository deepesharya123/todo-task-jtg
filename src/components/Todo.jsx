import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import useStyles from "./AddTask.styled";
import ShowTodos from "./ShowTodos";

const Todo = (props) => {
  const classes = useStyles();
  const [todoList, setTodoList] = useState(props.initialTodoList || []);
  const [open, setOpen] = React.useState(false);
  const priorityOptions = [
    { label: "High", value: 1 },
    { label: "Medium", value: 2 },
    { label: "Low", value: 3 },
  ];
  const [editIndex, setEditIndex] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todoList");
    if (storedTodos) {
      setTodoList(JSON.parse(storedTodos));
    }
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div style={{ marginLeft: "2vw" }}>
      <p style={{ fontSize: "24px" }}>Todo App</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ width: "70%", marginTop: "4vh", fontSize: "20px" }}
          endIcon={
            <IconButton aria-label="delete">
              <AddIcon style={{ color: "white" }} />
            </IconButton>
          }
          onClick={() => {
            setOpen(true);
          }}
        >
          Add New Task
        </Button>
      </div>{" "}
      {open && (
        <AddTask
          open={open}
          setOpen={setOpen}
          setTodoList={setTodoList}
          todoList={todoList}
          priorityOptions={priorityOptions}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          setIsUpdating={setIsUpdating}
          isUpdating={isUpdating}
        />
      )}
      <ShowTodos
        todoList={todoList}
        priorityOptions={priorityOptions}
        setTodoList={setTodoList}
        setEditIndex={setEditIndex}
        setOpen={setOpen}
        setIsUpdating={setIsUpdating}
      />
    </div>
  );
};

// getServerSideProps function
export async function getServerSideProps(context) {
  const initialTodoList = [
    {
      title: "title 1",
      description: "demo 1",
      priority: { label: "Medium", value: 2 },
      isCompleted: true,
    },
    {
      title: "title 2",
      description: "demo 2",
      priority: { label: "Easy", value: 3 },
      isCompleted: false,
    },
    {
      title: "title 3",
      description: "demo 3",
      priority: { value: 1, label: "High" },
      isCompleted: true,
    },
    {
      title: "title 4",
      description: "demo 4",
      priority: { value: 1, label: "High" },
      isCompleted: true,
    },
    {
      title: "title 5",
      description: "demo 5",
      priority: { label: "Medium", value: 2 },
      isCompleted: false,
    },
    {
      title: "title 6",
      description: "demo 6",
      priority: { label: "Medium", value: 2 },
      isCompleted: false,
    },
  ];

  return {
    props: {
      initialTodoList,
    },
  };
}

export default Todo;
