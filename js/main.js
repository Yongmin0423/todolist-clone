//유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가된다.
// delete  버튼을 누르면 할일이 삭제된다.
//check 버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
// 1.check 버튼을 클릭하는 순간 false -> true
// 2.true이면 끝난걸로 간주하고 밑줄 보여주기
// 3.false이면 안 끝난걸로 간주하고 그대로 두기

//진행 중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만 노출된다.
// 전체탭을 누르면 전체 아이템으로 돌아온다.

const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filteredList = [];

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

console.log(tabs);

function addTask(event) {
  event.preventDefault();
  const task = {
    id: randomIdGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filteredList;
  }

  let resultHTML = ``;
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += ` <div class="task" id="finish">
            <div class="task-done">${list[i].taskContent}</div>
            <div class="task-done__btn">
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
              <button onclick="deleteTask'${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>`;
    } else {
      resultHTML += ` <div class="task">
      <div>${list[i].taskContent}</div>
      <div class="task__btn">
        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      render();

      break;
    }
  }
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      render();
      break;
    }
  }
  console.log(taskList);
}

function filter(event) {
  mode = event.target.id;
  filteredList = [];
  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    //진행중인 아이템을 보여준다.
    //task.isComplete = false=
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filteredList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    //끝나는 케이스
    //task.isComplete=true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filteredList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIdGenerate() {
  return Math.random().toString(36).substr(2, 16);
}

addButton.addEventListener("click", addTask);
