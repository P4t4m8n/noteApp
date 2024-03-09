export interface NoteModel {
    _id: string
    createdAt: number
    type: string
}

export interface TextNoteModel extends NoteModel {
    txt: string
}
