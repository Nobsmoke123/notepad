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
}

export default TagRepository;
