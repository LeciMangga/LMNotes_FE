import * as Y from "yjs";
import EditorJS from "@editorjs/editorjs";

export class EditorJSYBinding {
  editor: EditorJS;
  ydoc: Y.Doc;
  yarray: Y.Array<any>;
  isApplyingRemote: boolean = false;

  constructor(editor: EditorJS, ydoc: Y.Doc, key: string) {
    this.editor = editor;
    this.ydoc = ydoc;
    this.yarray = ydoc.getArray(key);

    this.loadInitial();

    // Listen Yjs → Editor
    this.yarray.observe(() => this.applyYjsUpdate());
  }

  async loadInitial() {
    if (this.yarray.length > 0) {
      await this.editor.render({ blocks: this.yarray.toArray() });
    }
  }

  /** EditorJS → Yjs */
  async applyEditorUpdate() {
    if (this.isApplyingRemote) return;

    const saved = await this.editor.save();

    this.ydoc.transact(() => {
      this.yarray.delete(0, this.yarray.length);
      this.yarray.push(saved.blocks);
    });
  }

  /** Yjs → EditorJS */
  async applyYjsUpdate() {
    this.isApplyingRemote = true;
    const blocks = this.yarray.toArray();
    await this.editor.render({ blocks });
    this.isApplyingRemote = false;
  }

  destroy() {
    this.yarray.unobserve(this.applyYjsUpdate);
  }
}
