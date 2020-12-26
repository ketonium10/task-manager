//toggle modes from dark to light mode
const changeMode = () => {
  let element = document.getElementById("mode");
  if (element.getAttribute("value") == "dark") {
    document.documentElement.setAttribute("data-theme", "light"); //changing the root element prop.
    element.setAttribute("value", "light"); //changing child element prop
    element.setAttribute("src", "./images/icon-moon.svg");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    element.setAttribute("value", "dark");
    element.setAttribute("src", "./images/icon-sun.svg");
  }
};
// function to add a new task
const newTaskElement = document.getElementById("newTask");

//adding new tasks
newTaskElement.onkeydown = (Event) => {
  try {
    if (Event.keyCode == 13) {
      //when enter key is pressed add the task
      Event.preventDefault();
      const val = Event.target.value; // task the value entered
      if (val.length == 0) {
        throw new Error("Please write a text");
      }
      //appending the new task to UI
      updateUI(val);
      updateDB(val);
    }
  } catch (error) {
    window.alert(error.message);
  }
};

//function to add new task to UI
const updateUI = (val) => {
  let div = document.createElement("div"); //create the div element
  div.className = "boxList";
  let para = document.createElement("p"); //create the para element
  let node = document.createTextNode(val);
  para.appendChild(node);
  let button = document.createElement("button"); //create the button element
  button.className = "button"; //adding the class name for css
  button.onclick = "statusUpdation()";
  let block = document.getElementsByClassName("taskContainer");
  div.appendChild(button);
  div.appendChild(para);
  block[0].prepend(div);
  newTaskElement.value = ""; //reseting the value of input
};

//function to add new task to DB
const updateDB = async (val) => {
  //assigning header
  var myHeaders = new Headers();
  //right now the token ID is hard coded for testing.
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmU3MjIwNTRmMjBhNTMwOTRjZTNmN2UiLCJpYXQiOjE2MDg5ODMwNDV9.P0iu_ZYqGtdBLQmW6KNsi_tmRaac-bCpdAQmyhF5Q8k"
  );
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({ description: val, completed: false });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const response = await fetch("http://localhost:3000/task", requestOptions);
  if (response.status == 500) {
    //  if status is 400 then throw error
    console.log(response);
    throw new Error("Some error");
  }
};

//function to fetch exisiting tasks of user
const fetchTasks = async () => {
  //assigning header
  var myHeaders = new Headers();
  //right now the token ID is hard coded for testing.
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmU3MjIwNTRmMjBhNTMwOTRjZTNmN2UiLCJpYXQiOjE2MDg5ODMwNDV9.P0iu_ZYqGtdBLQmW6KNsi_tmRaac-bCpdAQmyhF5Q8k"
  );
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch("http://localhost:3000/getTask", requestOptions);
  if (response.status == 500) {
    //  if status is 400 then throw error
    console.log(response);
    throw new Error("Some error");
  }
  const result = await response.json();
  //if no element is there
  if (result.length != 0) {
    result.map((task) => {
      updateUI(task.description);
    });
  }
  //updating the number of items
  document.getElementById("items").innerHTML = `${result.length} items left`;
};

//updating the status of task
const statusUpdation = () => {};
