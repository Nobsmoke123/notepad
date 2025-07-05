import { injectable, inject } from 'tsyringe';
import type { PrismaExtendedClient } from '../../infra/client';

@injectable()
class TagRepository {
  constructor(
    @inject('PrismaExtendedClient')
    private readonly prisma: PrismaExtendedClient,
  ) {}

  /**
   * Create a new tag
   * @param name
   * @param userId
   * @returns
   */
  createTag = async (name: string, userId: string) => {
    return this.prisma.tag.create({
      data: {
        name,
        userId,
      },
    });
  };

  /**
   * Update an existing tag
   * @param id
   * @param name
   * @returns
   */
  updateTag = async (id: string, name: string) => {
    return this.prisma.tag.update({
      where: { id },
      data: { name },
    });
  };

  /**
   * Delete an existing tag
   * @param id
   * @returns
   */
  deleteTag = async (id: string) => {
    return this.prisma.tag.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  };

  /**
   * Get a tag by its ID
   * @param id
   * @returns
   */
  getTagById = async (id: string) => {
    return this.prisma.tag.findUnique({
      where: { id },
    });
  };

  /**
   * Get all tags for a specific user
   * @param userId
   * @returns
   */
  getTagsByUserId = async (userId: string) => {
    return this.prisma.tag.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  };

  /**
   * Get all tags
   */
  getAllTags = async () => {
    return this.prisma.tag.findMany({});
  };
}

export default TagRepository;
