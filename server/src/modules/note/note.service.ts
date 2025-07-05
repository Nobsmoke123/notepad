import { injectable, inject } from 'tsyringe';
import NoteRepository from './note.repository';
import { CreateNoteDto, UpdateNoteDto } from './note.types';
import { NotFoundError } from '../../shared/errors';
import TagRepository from '../tag/tag.repository';

@injectable()
class NoteService {
  constructor(
    @inject(NoteRepository) private readonly noteRepository: NoteRepository,
    @inject(TagRepository) private readonly tagRepository: TagRepository,
  ) {}

  createNote = async (data: CreateNoteDto, userId: string) => {
    const { tag } = data;
    const tagExists = await this.tagRepository.getTagById(tag);
    if (!tagExists) throw new NotFoundError(`Tag with id ${tag} not found`);
    return await this.noteRepository.createNote(data, userId);
  };

  updateNote = async (id: string, data: UpdateNoteDto) => {
    const { tag } = data;
    const tagExists = await this.tagRepository.getTagById(tag!);
    if (!tagExists) throw new NotFoundError(`Tag with id ${tag} not found`);

    const note = await this.noteRepository.getNoteById(id);
    if (!note) throw new NotFoundError(`Note with id ${id} not found`);

    return await this.noteRepository.updateNote(id, data);
  };

  getNote = async (id: string) => {
    const note = await this.noteRepository.getNoteById(id);
    if (!note) throw new NotFoundError(`Note with id ${id} not found`);
    return note;
  };

  deleteNote = async (id: string, userId: string) => {
    const note = await this.noteRepository.getNoteById(id);
    if (!note) throw new NotFoundError(`Note with id ${id} not found`);
    return await this.noteRepository.deleteNoteById(id, userId);
  };

  getNotesByUserId = async (userId: string) => {
    return await this.noteRepository.getNotesByUserId(userId);
  };
}

export default NoteService;
