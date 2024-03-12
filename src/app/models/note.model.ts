export interface NoteModel {
    _id: string
    createdAt: number
    type: string
    bgc: string
    txt: string
    imgs: string[]
    labels: string[]
    isPinned:boolean

}

