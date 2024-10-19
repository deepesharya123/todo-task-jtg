import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, styled, TextField } from "@mui/material";
import { yellow } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import useStyles from "./ShowTodos.styled";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(yellow[500]),
  backgroundColor: yellow[500],
  "&:hover": {
    backgroundColor: yellow[700],
  },
}));

const ShowTodos = (props) => {
  const {
    todoList,
    priorityOptions,
    setTodoList,
    setEditIndex,
    setOpen,
    setIsUpdating,
  } = props;
  const classes = useStyles();

  useEffect(() => {}, [todoList]);

  const [sortingOrder, setSortingOrder] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedList, setSearchedList] = useState([]);

  const handleSort = (ar, setArr) => {
    const newTodo = ar;
    newTodo.sort(function (a, b) {
      const keyA = a.priority.value,
        keyB = b.priority.value;
      const completedA = a.isCompleted;
      if (sortingOrder === 1) {
        if (keyA < keyB) return -1;
        else if (keyA > keyB) return 1;
        else if (completedA) return 1;
        else return -1;
      } else {
        if (keyA < keyB) return 1;
        else if (keyA > keyB) return -1;
        else if (completedA) return 1;
        else return -1;
      }
    });
    setArr((prevTodo) => [...newTodo]);
    setSortingOrder((prevSorting) => (prevSorting === 1 ? 3 : 1));
  };

  const handleDelete = (index) => {
    setTodoList((prevTodos) => {
      const newTodos = prevTodos.filter((todo, ind) => index !== ind);
      return newTodos;
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setOpen(true);
    setIsUpdating(true);
  };

  const handleSearch = (text) => {
    if (text.length === 0) return;
    const response = todoList.filter(
      (todo) => todo.title.includes(text) || todo.description.includes(text)
    );
    setSearchedList([...response]);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginLeft: "14vw",
          width: "70vw",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search Task"
          variant="outlined"
          sx={{
            margin: "1vh 1vh",
            width: "50%",
            "@media screen and (max-width: 900px)": {
              padding: 0,
              width: "88vw !important",
              fontSize: "10px",
            },
          }}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="warning"
          sx={{
            fontSize: "10px",
            height: "4.1vh",
            width: "40%",
            marginLeft: "54%",
            marginTop: "1.7vh",
            float: "right",
            right: "2vw",
            position: "relative",
            "@media screen and (max-width: 900px)": {
              width: "88vw !important",
              fontSize: "8px",
              margin: "0",
              padding: "3vh 0vh",
              marginTop: "1vh",
              marginLeft: "1vw",
            },
          }}
          onClick={() => {
            if (searchText.length > 0)
              handleSort(searchedList, setSearchedList);
            else handleSort(todoList, setTodoList);
          }}
        >
          Sort By{" "}
          {sortingOrder === 1 ? "High to Low Priority" : "Low to High Priority"}
        </Button>
      </div>
      {searchText.length > 0 ? (
        searchedList.length > 0 ? (
          <div
            style={{
              marginLeft: "3vw",
              width: "90vw",
              justifyContent: "center",
            }}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell
                      spacing={2}
                      sx={{
                        "&.MuiTableCell-root": {
                          padding: "0",
                        },
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      align="center"
                      spacing={2}
                      sx={{
                        "&.MuiTableCell-root": {
                          padding: "0",
                        },
                        width: "6vw",
                      }}
                    >
                      Priority
                    </TableCell>
                    <TableCell
                      align="center"
                      spacing={2}
                      sx={{
                        "&.MuiTableCell-root": {
                          padding: "0",
                        },
                      }}
                    >
                      Completed
                    </TableCell>
                    <TableCell
                      align="center"
                      spacing={2}
                      sx={{
                        "&.MuiTableCell-root": {
                          padding: "0",
                        },
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchedList.map((row, index) => {
                    return (
                      <TableRow
                        key={row.index}
                        className={row.isCompleted && classes.completedTask}
                        sx={{
                          textDecoration: row.isCompleted
                            ? "line-through"
                            : "none",
                          color: row.isCompleted ? "gray" : "inherit", // Optionally, change text color for completed tasks
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            textDecoration: row.isCompleted
                              ? "line-through"
                              : "none",
                            color: row.isCompleted ? "gray" : "inherit",
                          }}
                        >
                          {row.title}
                        </TableCell>
                        <TableCell
                          sx={{
                            textDecoration: row.isCompleted
                              ? "line-through"
                              : "none",
                            color: row.isCompleted ? "gray" : "inherit",
                          }}
                        >
                          {row.description}
                        </TableCell>
                        <TableCell align="center">
                          {row.priority?.value !== 2 ? (
                            <Button
                              variant="contained"
                              color={
                                row.priority?.value === 1
                                  ? "error"
                                  : row.priority?.value === 2
                                  ? "yellow"
                                  : "success"
                              }
                              sx={{
                                "@media screen and (max-width: 900px)": {
                                  width: "10vw",
                                  padding: 0,
                                  fontSize: "10px",
                                },
                              }}
                            >
                              {row.priority?.value === 1 ? "High" : "Low"}
                            </Button>
                          ) : (
                            <ColorButton
                              variant="contained"
                              sx={{
                                "@media screen and (max-width: 900px)": {
                                  width: "10vw",
                                  padding: 0,
                                  fontSize: "10px",
                                },
                              }}
                            >
                              Medium
                            </ColorButton>
                          )}{" "}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            "@media screen and (max-width: 900px)": {
                              width: "6vw",
                              fontSize: "10px",
                              padding: 0,
                            },
                            textDecoration: row.isCompleted
                              ? "line-through"
                              : "none",
                            color: row.isCompleted ? "gray" : "inherit",
                          }}
                        >
                          {row.isCompleted ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="center">
                          {
                            <div
                              style={{
                                // display: "flex",
                                justifyContent: "center",
                                "@media screen and (max-width: 900px)": {
                                  flexDirection: "column",
                                  color: "green",
                                  display: "block",
                                },
                              }}
                            >
                              <DeleteIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  handleDelete(index);
                                }}
                              />
                              <EditIcon
                                style={{ marginLeft: "1vw", cursor: "pointer" }}
                                onClick={() => {
                                  handleEdit(index);
                                }}
                              />
                            </div>
                          }
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            "No Task Found"
          </div>
        )
      ) : todoList.length > 0 ? (
        <div
          style={{ marginLeft: "3vw", width: "90vw", justifyContent: "center" }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell
                    spacing={2}
                    sx={{
                      "&.MuiTableCell-root": {
                        padding: "0",
                      },
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    align="center"
                    spacing={2}
                    sx={{
                      "&.MuiTableCell-root": {
                        padding: "0",
                      },
                      width: "6vw",
                    }}
                  >
                    Priority
                  </TableCell>
                  <TableCell
                    align="center"
                    spacing={2}
                    sx={{
                      "&.MuiTableCell-root": {
                        padding: "0",
                      },
                    }}
                  >
                    Completed
                  </TableCell>
                  <TableCell
                    align="center"
                    spacing={2}
                    sx={{
                      "&.MuiTableCell-root": {
                        padding: "0",
                      },
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todoList.map((row, index) => {
                  return (
                    <TableRow
                      key={row.index}
                      className={row.isCompleted && classes.completedTask}
                      sx={{
                        textDecoration: row.isCompleted
                          ? "line-through"
                          : "none",
                        color: row.isCompleted ? "gray" : "inherit", // Optionally, change text color for completed tasks
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          textDecoration: row.isCompleted
                            ? "line-through"
                            : "none",
                          color: row.isCompleted ? "gray" : "inherit",
                        }}
                      >
                        {row.title}
                      </TableCell>
                      <TableCell
                        sx={{
                          textDecoration: row.isCompleted
                            ? "line-through"
                            : "none",
                          color: row.isCompleted ? "gray" : "inherit",
                        }}
                      >
                        {row.description}
                      </TableCell>
                      <TableCell align="center">
                        {row.priority?.value !== 2 ? (
                          <Button
                            variant="contained"
                            color={
                              row.priority?.value === 1
                                ? "error"
                                : row.priority?.value === 2
                                ? "yellow"
                                : "success"
                            }
                            sx={{
                              "@media screen and (max-width: 900px)": {
                                width: "10vw",
                                padding: 0,
                                fontSize: "10px",
                              },
                            }}
                          >
                            {row.priority?.value === 1 ? "High" : "Low"}
                          </Button>
                        ) : (
                          <ColorButton
                            variant="contained"
                            sx={{
                              "@media screen and (max-width: 900px)": {
                                width: "10vw",
                                padding: 0,
                                fontSize: "10px",
                              },
                            }}
                          >
                            Medium
                          </ColorButton>
                        )}{" "}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          "@media screen and (max-width: 900px)": {
                            width: "6vw",
                            fontSize: "10px",
                            padding: 0,
                          },
                          textDecoration: row.isCompleted
                            ? "line-through"
                            : "none",
                          color: row.isCompleted ? "gray" : "inherit",
                        }}
                      >
                        {row.isCompleted ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="center">
                        {
                          <div
                            style={{
                              // display: "flex",
                              justifyContent: "center",
                              "@media screen and (max-width: 900px)": {
                                flexDirection: "column",
                                color: "green",
                                display: "block",
                              },
                            }}
                          >
                            <DeleteIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleDelete(index);
                              }}
                            />
                            <EditIcon
                              style={{ marginLeft: "1vw", cursor: "pointer" }}
                              onClick={() => {
                                handleEdit(index);
                              }}
                            />
                          </div>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          No Task to show. Please add the task.
        </div>
      )}
    </div>
  );
};

export default ShowTodos;
