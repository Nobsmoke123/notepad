export interface CreateNoteDto {
  tag: string;
  content: string;
}

export interface UpdateNoteDto {
  tag?: string;
  content?: string;
}
