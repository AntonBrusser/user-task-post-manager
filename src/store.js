function reducer(state = { users: "", chosen: "", newUser: "",addNew: false, userCount: 0, toDoCout: 0, postCount: 0, showPosts: false, showTodos: false , showUsers: true}, action) {
  let currentUsers;
  let chosenUser;
  switch (action.type) {
    case "Get":
      let userNum = action.payload.length
      let toDoNum = action.payload[action.payload.length-1].todosArr[action.payload[action.payload.length-1].todosArr.length-1].id
      let postsNum = action.payload[action.payload.length-1].postArr[action.payload[action.payload.length-1].postArr.length-1].id

      return { ...state, users: action.payload, userCount:userNum, toDoCout: toDoNum, postCount: postsNum};

    case "Delete":
      let i = state.users.findIndex((x) => x.id === action.payload);
      if (state.chosen.id === action.payload) {
        state.chosen = ''
      }
      currentUsers = state.users;
      currentUsers.splice(i, 1);
      return { ...state, users: currentUsers };

      case "Edit":
      let i1 = state.users.findIndex((x) => x.id === action.payload.id);
      currentUsers = state.users;
      currentUsers[i1] = action.payload;
      return { ...state, users: currentUsers };

      case "Choose":
        state.addNew = false
        let i2 = state.users.findIndex((x) => x.id === action.payload.id);
        currentUsers = state.users;
        chosenUser = currentUsers[i2]
        return{...state, chosen: chosenUser}

      case "Posts":
        state.showPosts = true
        state.showTodos = false
        state.showUsers = false
        return{...state}
      
      case "Todos":
        state.showTodos = true
        state.showPosts = false
        state.showUsers = false
        return{...state}

      case "Users":
        state.showUsers = true
        state.showPosts = false
        state.showTodos = false
        return{...state}
      
      case "AddTodo":
        let chosen = state.chosen
        console.log(chosen)
        let todoArr = chosen.todosArr
        state.toDoCout ++
        let todo = {
          userId: chosen.id,
          id: state.toDoCout,
          title: action.payload.title,
          completed: action.payload.completed
        }
        let newTodoArr = [todo].concat(todoArr)
        state.chosen.todosArr = newTodoArr
        let i3 = state.users.findIndex((x) => x.id === state.chosen.id);
        currentUsers = state.users;
        currentUsers[i3] = state.chosen
        return{...state, users: currentUsers}

      case "AddPost":
        let postArr = state.chosen.postArr
        state.postCount ++
        let post = {
          userId: state.chosen.id,
          id: state.postCount,
          title: action.payload.title,
          body: action.payload.body
        }
        let newPostArr = [post].concat(postArr)
        state.chosen.postArr = newPostArr
        let i4 = state.users.findIndex((x) => x.id === state.chosen.id);
        currentUsers = state.users;
        currentUsers[i4] = state.chosen
        return{...state, users: currentUsers}

      case "AddNewUser":
        state.chosen = ""
        state.addNew = true
        state.showUsers = false
        state.showPosts = false
        state.showTodos = false
        return{...state}

      case "CancelNewUser":
        state.showUsers = true
        state.addNew = false
        state.showPosts = false
        state.showTodos = false
        return{...state}
      
      case "SaveNewUser":
        state.showUsers = true
        state.addNew = false
        state.showPosts = false
        state.showTodos = false
        state.userCount ++
        state.newUser = {
          id: state.userCount,
          name: action.payload.name,
          email: action.payload.email,
          todosArr: [],
          postArr:[],
          address: {
            street: '',
            city: '',
            zipcode: ''
          }
        }
        state.users.push(state.newUser)
        console.log(state.users);
        return{...state}
      
      case "CompleteTodo":
        let i5 = state.users.findIndex((x) => x.id === state.chosen.id);
        let i6 = state.users[i5].todosArr.findIndex((x) => x.id === action.payload);
        state.users[i5].todosArr[i6].completed = true
        console.log(state.users)
        return {...state}

      case "ClearChosen":
        console.log('not chosen');
        
        return {...state, chosen: ""}

    default:
      return state;
  }
}

export default reducer;
