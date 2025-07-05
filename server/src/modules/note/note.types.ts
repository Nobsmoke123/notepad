export interface CreateNoteDto {
  tag: string;
  content: string;
}

export interface UpdateNoteDto {
  id: string;
  tag?: string;
  content?: string;
}
