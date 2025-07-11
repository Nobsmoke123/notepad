import { inject, injectable } from 'tsyringe';
import type { PrismaExtendedClient } from '../../infra/client';
import { CreateNoteDto, UpdateNoteDto } from './note.types';

@injectable()
class NoteRepository {
  constructor(
    @inject('PrismaExtendedClient')
    private readonly prisma: PrismaExtendedClient,
  ) {}

  async createNote(note: CreateNoteDto, userId: string) {
    const { tag: id, content } = note;

    // Create the note with the associated tag
    const createdNote = await this.prisma.note.create({
      data: {
        content,
        userId,
        tags: {
          connect: { id },
        },
      },
      include: {
        tags: true,
      },
    });

    return createdNote;
  }

  async updateNote(id: string, data: UpdateNoteDto) {
    const { tag, content } = data;

    return await this.prisma.note.update({
      where: { id },
      data: {
        ...(tag && {
          tags: {
            set: [{ id: tag }],
          },
        }),
        ...(content && { content }),
      },
      include: {
        tags: true,
      },
    });
  }

  async getNoteById(id: string) {
    return await this.prisma.note.findUnique({
      where: { id },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getNotesByUserId(userId: string) {
    return await this.prisma.note.findMany({
      where: { userId },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getNotesByTag(tagId: string) {
    return await this.prisma.note.findMany({
      where: {
        tags: {
          some: {
            id: tagId,
          },
        },
      },
    });
  }

  async deleteNoteById(id: string, userId: string) {
    return await this.prisma.note.update({
      where: { id, userId },
      data: { deletedAt: new Date() },
    });
  }
}

export default NoteRepository;
