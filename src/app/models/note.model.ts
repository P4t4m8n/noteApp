export interface Note {
    _id: string
    createdAt: number
}

export interface TextNote extends Note {
    txt: string
}
