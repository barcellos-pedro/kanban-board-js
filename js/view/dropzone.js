import KanbanApi from "../api/kanban-api.js";

export default class Dropzone {
    
    static createDropZone() {
        const range = document.createRange();
        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
            <div class="kanban__dropzone"></div>
        `).children[0];

        dropZone.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropZone.classList.add("kanban__dropzone--active");
        });

        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("kanban__dropzone--active");
        });

        dropZone.addEventListener("drop", (event) => {
            event.preventDefault();
            dropZone.classList.remove("kanban__dropzone--active");

            const columnElement = dropZone.closest(".kanban__column");
            const columnId = +columnElement.dataset.id;
            const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));
            const droppedIndex = dropZonesInColumn.indexOf(dropZone);
            const itemId = +event.dataTransfer.getData("text/plain");
            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);
            const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ?
            dropZone.parentElement : dropZone;

            // Don't update the localStorage if we drag the item into its own bottom dropzone
            if (droppedItemElement.contains(dropZone)) {
                return;
            }

            insertAfter.after(droppedItemElement);

            KanbanApi.updateItem(itemId, {
                columnId,
                position: droppedIndex,
            });

        });

        return dropZone;
    }
}