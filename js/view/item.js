import KanbanApi from "../api/kanban-api.js";
import Dropzone from "./dropzone.js";

export default class Item {

    constructor(id, content) {
        const BOTTOM_DROP_ZONE = Dropzone.createDropZone();

        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban__item-input");
        this.elements.input.setAttribute('title', 'Segure e arraste para mover.\nDois cliques para deletar.')
        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;
        this.elements.root.appendChild(BOTTOM_DROP_ZONE);

        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim();
            
            if(newContent == this.content) {
                return;
            }

            this.content = newContent;

            KanbanApi.updateItem(id, {
                content: this.content
            });
        };

        this.elements.input.addEventListener("blur", onBlur);

        this.elements.root.addEventListener("dblclick", () => {
            const check = confirm("Are you sure you want to delete this item?");
            if (check) {
                KanbanApi.deleteItem(id);
                this.elements.input.removeEventListener("blur", onBlur);
                this.elements.root.parentElement.removeChild(this.elements.root);
            }
        })

        this.elements.root.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", id);
        });

        // Prevents the display of the item id being dragged to appear when you drop it on another kanban__item
        this.elements.input.addEventListener("drop", (event) => {
            event.preventDefault();
        })
    }

    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban__item" draggable="true">
                <div class="kanban__item-input" contenteditable></div>
            </div>
        `).children[0];
    }
}