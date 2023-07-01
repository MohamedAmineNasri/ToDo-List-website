import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddTaskForm from './Components/AddTaskForm';
import ToDo from './Components/ToDo'
import UpdateForm from './Components/UpdateForm'

import './App.css';

function App() {
  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([
    
  ]);
  
  localStorage.setItem("todoList", JSON.stringify(toDo));

  // Temp state
  const [newTask, setNewTask] = useState('');
  const [updateData, setupdateData] = useState('');

  // Add Task
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status:false }
      setToDo([...toDo,newEntry])
      setNewTask('');
    }
  }

  // Delete task
  const deleteTask = (id) => {
    let newTasks = toDo.filter( task=> task.id !== id )
    setToDo(newTasks)
  };

  // Mark task as done or completed
  const markDone = (id) => {
    let newTask = toDo.map(task =>{
      if(task.id === id){
        return ({ ...task, status: !task.status})
      }
      return task;
    })
    setToDo(newTask);
  };

  // Cancel Update
  const cancelUpdate = () => {
    setupdateData('');
  };

  // Change task for Update
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    }
    setupdateData(newEntry);
  };

  // Update Task
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id)
    let updateObject = [...filterRecords,updateData]
    setToDo(updateObject);
    setupdateData('');
  };




  return (
    <div className="container App">
      <br></br>
      <h2>To Do List App</h2>
      <br></br>

      {/* Update Task */}
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}

      {/* Display toDos */}

      <ToDo 
        toDo = {toDo}
        markDone = {markDone}
        setupdateData = {setupdateData}
        deleteTask = {deleteTask}
      />
    </div>
  );
}

export default App;
