import viewport from 'viewport';
import {Bounds} from "scenegraph";
import uuid from 'v4-uuid';
import {editDocument} from "application";

/**
 * Message data
 */
export default class Message {
    public readonly uuid: string = uuid();
    public content: string = '';
    public authorUUID: string = '';
    public readonly date: number = Date.now();
    public viewportCenter: Bounds;

    public constructor(object: any = {}) {
        this.viewportCenter = viewport.bounds;

        this.uuid = object['uuid'] ?? this.uuid;
        this.content = object['content'] ?? this.content;
        this.authorUUID = object['authorUUID'] ?? this.authorUUID;
        this.date = object['date'] ?? this.date;
        this.viewportCenter = object['viewportCenter'] ?? this.viewportCenter;
    }

    /**
     * Scroll into the viewport of the current contents
     */
    public scrollTo(): void {
        editDocument(() =>
            viewport.scrollToCenter(this.viewportCenter.x + this.viewportCenter.width / 2,
                this.viewportCenter.y + this.viewportCenter.height / 2)
        );
    }
}
