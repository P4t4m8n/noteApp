export interface NoteModel {
    _id: string
    createdAt: number
    type: string
    bgc: string
    
}

export interface TextNoteModel extends NoteModel {
    txt: string
}
