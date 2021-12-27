import KanbanApi from "./api/kanban-api.js";
import Kanban from "./view/kanban.js";

// Tests and insert data
// console.log(KanbanApi.getItems(3));
// console.log(KanbanApi.insertItem(3, 'rematricula'));
// console.log(KanbanApi.updateItem(77, {
//     columnId: 2,
//     position: 1,
//     content: 'teste 3 [att]'
// }));
// KanbanApi.deleteItem(75);

new Kanban(document.querySelector(".kanban"));