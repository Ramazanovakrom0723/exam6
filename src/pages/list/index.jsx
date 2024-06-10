import React, { useState } from "react";
import "./list.css";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";

const taskStatuses = ["open", "pending", "inprog", "complete"];

function Index() {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({ title: "", status: "open" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const addTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask({ title: "", status: "open" });
    setIsModalOpen(false);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === currentTask.index
        ? { title: currentTask.title, status: currentTask.status }
        : task
    );
    setTasks(updatedTasks);
    setIsModalOpen(false);
  };

  const openModal = (task = null, index = null) => {
    if (task) {
      setCurrentTask({ ...task, index });
    } else {
      setCurrentTask(null);
    }
    setIsModalOpen(true);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="list">
      <Box sx={{ p: 2 }}>
        <Button variant="contained" onClick={() => openModal()} sx={{ p: 3 }}>
          Add Task
        </Button>
        {taskStatuses.map((status) => (
          <Box
            key={status}
            sx={{
              mt: 4,
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" gutterBottom>
              {status.charAt(0).toUpperCase() + status.slice(1)} Tasks
            </Typography>
            <Grid container spacing={1} direction="column">
              {getTasksByStatus(status).map((task, index) => (
                <Grid item xs={12} key={index}>
                  <Card className="border">
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {task.title}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() =>
                          openModal(
                            task,
                            tasks.findIndex((t) => t === task)
                          )
                        }
                        variant="outlined"
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        onClick={() =>
                          deleteTask(tasks.findIndex((t) => t === task))
                        }
                        variant="outlined"
                        color="error"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DialogTitle>{currentTask ? "Edit Task" : "Add Task"}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Title"
              fullWidth
              value={currentTask ? currentTask.title : newTask.title}
              onChange={(e) =>
                currentTask
                  ? setCurrentTask({ ...currentTask, title: e.target.value })
                  : setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <TextField
              select
              margin="dense"
              label="Status"
              fullWidth
              value={currentTask ? currentTask.status : newTask.status}
              onChange={(e) =>
                currentTask
                  ? setCurrentTask({ ...currentTask, status: e.target.value })
                  : setNewTask({ ...newTask, status: e.target.value })
              }
            >
              {taskStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={currentTask ? updateTask : addTask} type="submit">
              {currentTask ? "Update Task" : "Add Task"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default Index;
