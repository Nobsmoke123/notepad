import { injectable, inject } from 'tsyringe';
import NoteRepository from './note.repository';

@injectable()
class NoteService {
  constructor(
    @inject(NoteRepository) private readonly noteRepository: NoteRepository,
  ) {}

  
}

export default NoteService;
