const d = new Date();
export default function Item(title, type, desc) {
  this.id = Date.now();
  this.title = title;
  this.type = type;
  this.desc = desc;
  this.completed = false;
  this.date = `${d.getUTCFullYear()}/${d.getMonth() + 1}/${d.getUTCDate()}`;
}
