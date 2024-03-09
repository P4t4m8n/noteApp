export interface Note {
    _id: string
    createdAt: number
    type: string
}

export interface TextNote extends Note {
    txt: string
}
