import Column from "./column.js";

import DATABASE from '../../columns-mock.json' assert { type: "json" };

export default class Kanban {

    constructor(root) {
        this.root = root;
        Kanban.getColumns().forEach(column => {
            const columnView = new Column(column.id, column.title);
            this.root.appendChild(columnView.elements.root);
        })
    }

    static getColumns() {
        return DATABASE.columns;
    }
}