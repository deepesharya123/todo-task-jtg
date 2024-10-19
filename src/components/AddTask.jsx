import React, { useEffect, useState } from "react";
import DialogContent from "@mui/joy/DialogContent";
import DialogTitle from "@mui/joy/DialogTitle";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import { Button, InputLabel, MenuItem, Select, Switch } from "@mui/material";
import useStyles from "./AddTask.styled";

const AddTask = (props) => {
  const classes = useStyles();
  const {
    open,
    setOpen,
    setTodoList,
    editIndex,
    todoList,
    setEditIndex,
    setIsUpdating,
    isUpdating,
    priorityOptions,
  } = props;

  const [todo, setTodo] = useState(
    editIndex
      ? todoList[editIndex]
      : {
          title: "",
          description: "",
          priority: { label: "High", value: 1 },
          isCompleted: false,
        }
  );

  useEffect(() => {
    if (editIndex >= 0) {
      setTodo(todoList[editIndex]);
    }
  }, [editIndex]);

  const handleSubmit = () => {
    if (isUpdating) {
      setTodoList((prevTodoList) => {
        const newTodo = prevTodoList;
        newTodo[editIndex] = todo;
        return newTodo;
      });
      setIsUpdating(false);
    } else {
      setTodoList((prevTodoList) => [...prevTodoList, todo]);
    }
    setOpen(false);
    setTodo({
      title: "",
      description: "",
      priority: { label: "", value: 1 },
      isCompleted: false,
    });
  };

  const handleTextChange = (fieldName, val) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      [fieldName]: val,
    }));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}></div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>Fill in the information of the task.</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  autoFocus
                  required
                  value={todo?.title}
                  fieldName="title"
                  onChange={(e) => {
                    handleTextChange("title", e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  required
                  value={todo?.description}
                  fieldName="description"
                  onChange={(e) => {
                    handleTextChange("description", e.target.value);
                  }}
                />
              </FormControl>{" "}
              <InputLabel id="demo-select-small-label">Priority</InputLabel>
              <Select
                fieldName="priority"
                value={todo?.priority ? todo.priority.value : ""}
                onChange={(e) => {
                  const { value } = e.target;
                  const selectedPriority = priorityOptions.find(
                    (priority) => priority.value === value
                  );
                  setTodo((prevTodo) => ({
                    ...prevTodo,
                    priority: selectedPriority ? selectedPriority : { value },
                  }));
                }}
                sx={{ height: "4.1vh" }}
              >
                <MenuItem value={1} label="High">
                  High
                </MenuItem>
                <MenuItem value={2} label="Medium">
                  Medium
                </MenuItem>
                <MenuItem value={3} label="Low">
                  Low
                </MenuItem>
              </Select>
              <FormControl>
                <FormLabel>Completed</FormLabel>
                <Switch
                  checked={todo?.isCompleted}
                  onChange={(e) => {
                    setTodo((prevTodo) => ({
                      ...prevTodo,
                      isCompleted: e.target.checked,
                    }));
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </FormControl>{" "}
              <Button type="submit">Submit</Button>
              <Button
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>{" "}
    </div>
  );
};

export default AddTask;
