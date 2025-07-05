import { inject, injectable } from 'tsyringe';
import type { PrismaExtendedClient } from '../../infra/client';

@injectable()
class NoteRepository {
  constructor(
    @inject('PrismaExtendedClient')
    private readonly prisma: PrismaExtendedClient,
  ) {}

  async createNote() {

  }

  async updateNote(){

  }

  async getNoteById(){

  }

  async getNotesByUserId() {

  }

  async getNotesByTag() {
    
  }

  async deleteNoteById() {

  }
}

export default NoteRepository;
