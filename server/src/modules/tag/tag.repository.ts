import { injectable, inject } from 'tsyringe';
import type { PrismaExtendedClient } from '../../infra/client';

@injectable()
class TagRepository {
  constructor(
    @inject('PrismaExtendedClient')
    private readonly prisma: PrismaExtendedClient,
  ) {}

  createTag = async (name: string, userId: string) => {
    return this.prisma.tag.create({
      data: {
        name,
        userId,
      },
    });
  };

  updateTag = async (id: string, name: string) => {
    return this.prisma.tag.update({
      where: { id },
      data: { name },
    });
  };

  deleteTag = async (id: string) => {
    
  }
}

export default TagRepository;
