import KanbanApi from "../api/kanban-api.js";
import Dropzone from "./dropzone.js";
import Item from "./item.js";

export default class Column {
    
    constructor(id, title) {
        const TOP_DROP_ZONE = Dropzone.createDropZone();

        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban__column-title");
        this.elements.items = this.elements.root.querySelector(".kanban__column-items");
        this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");
        this.elements.addItem.setAttribute('title', 'Adicionar tarefa');
        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        this.elements.items.appendChild(TOP_DROP_ZONE);

        KanbanApi.getItems(id).forEach(item => {
            this.renderItem(item);
        });
        
        this.elements.addItem.addEventListener("click", () => {
            const newItem = KanbanApi.insertItem(id, "");
            this.renderItem(newItem);
        });

    }

    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban__column">
                <div class="kanban__column-title"></div>
                <div class="kanban__column-items"></div>
                <button class="kanban__add-item">+ Add</button>
            </div>
        `).children[0];
    }

    renderItem(data) {
        const item = new Item(data.id, data.content);
        this.elements.items.appendChild(item.elements.root);
    }
}