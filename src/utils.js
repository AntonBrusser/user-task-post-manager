import axios from "axios";

export const AllUsers = () => {
  return async (dispatch) => {
    getAllUsers().then((res) =>
      dispatch({
        type: "Get",
        payload: res,
      })
    );
  };
};

const getAllUsers = async () => {
  let userArr = [];

  let getUsers = await axios.get("https://jsonplaceholder.typicode.com/users");
  let getTodos = await axios.get("https://jsonplaceholder.typicode.com/todos");
  let getPosts = await axios.get("https://jsonplaceholder.typicode.com/posts");

  let users = getUsers.data;
  let todos = getTodos.data;
  let posts = getPosts.data;

  users.forEach((user) => {
    let oneUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      todosArr: [],
      postArr: [],
    };
    todos.forEach((todo) => {
      if (user.id === todo.userId) {
        oneUser.todosArr.push(todo);
      }
    });
    posts.forEach((post) => {
      if (user.id === post.userId) {
        oneUser.postArr.push(post);
      }
    });
    userArr.push(oneUser);
  });
  return userArr;
};

export default { AllUsers };
