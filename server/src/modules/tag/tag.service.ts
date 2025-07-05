import { injectable, inject } from 'tsyringe';
import TagRepository from './tag.repository';
import AppLogger from '../../core/logger';
import { BadRequestError, NotFoundError } from '../../shared/errors';

@injectable()
class TagService {
  constructor(
    @inject(TagRepository) private readonly tagRepository: TagRepository,
  ) {}

  /**
   * Creates a new tag for a user.
   * @param name - The name of the tag to create.
   * @param userId - The ID of the user creating the tag.
   * @returns The created tag.
   */
  createTag = async (name: string, userId: string) => {
    const existingTag = await this.tagRepository.getTagByName(name, userId);
    if (existingTag) {
      AppLogger.error(
        `Tag with name ${name} already exists for user ${userId}`,
      );
      throw new BadRequestError(`Tag with name ${name} already exists`);
    }
    return await this.tagRepository.createTag(name, userId);
  };

  /**
   * Updates an existing tag by its ID.
   * @param id - The ID of the tag to update.
   * @param name - The new name for the tag.
   * @returns The updated tag.
   */
  updateTag = async (id: string, name: string) => {
    const existingTag = await this.getTagById(id);
    const checkName = await this.tagRepository.getTagByName(
      name,
      existingTag?.userId!,
    );
    if (checkName) {
      AppLogger.error(
        `Tag with name ${name} already exists for user ${existingTag?.userId!}`,
      );
      throw new BadRequestError(`Tag with name ${name} already exists`);
    }
    return await this.tagRepository.updateTag(existingTag?.id!, name);
  };

  /**
   * Deletes a tag by setting its deletedAt field to the current date.
   * @param id - The ID of the tag to delete.
   * @returns The updated tag with the deletedAt field set.
   */
  deleteTag = async (id: string) => {
    const existingTag = await this.getTagById(id);
    return await this.tagRepository.deleteTag(existingTag?.id!);
  };

  /**
   * Retrieves a tag by its ID.
   * @param id - The ID of the tag to retrieve.
   * @returns The tag with the specified ID, or null if not found.
   */
  getTagById = async (id: string) => {
    const tag = await this.tagRepository.getTagById(id);
    if (!tag) {
      AppLogger.error(`Tag with ID ${id} not found`);
      throw new NotFoundError(`Tag with ID ${id} not found`);
    }
    return tag;
  };

  /**
   * Retrieves all tags.
   * @returns An array of all tags.
   */
  getAllTags = async () => {
    return await this.tagRepository.getAllTags();
  };

  /**
   * Retrieves all tags for a specific user.
   * @param userId - The ID of the user whose tags to retrieve.
   * @returns An array of tags associated with the specified user.
   */
  getAllTagsByUserId = async (userId: string) => {
    return await this.tagRepository.getTagsByUserId(userId);
  };
}

export default TagService;
