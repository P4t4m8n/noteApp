import { NoteFilterModal } from "./noteFIlter.modal"

export interface NoteModel extends NoteFilterModal {
    _id: string
    createdAt: number
    bgc: string
    txt: string
    imgs: string[]
    labels: string[]
    isPinned:boolean

}

