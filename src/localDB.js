const appKey = "[ToDoApp]_";
const loaclDB = {
  get: function (key) {
    if (!localStorage.getItem(`${appKey}${key}`)) return false;
    else return JSON.parse(localStorage.getItem(`${appKey}${key}`));
  },
  set: function (key, value) {
    localStorage.setItem(
      `${appKey}${key}`,
      JSON.stringify(value)
    );
  },
};

export default loaclDB;
