import { injectable, inject } from 'tsyringe';
import TagRepository from './tag.repository';

@injectable()
class TagService {
  constructor(
    @inject('TagRepository') private readonly tagRepository: TagRepository,
  ) {}

  createTag = async (name: string) => {};
  updateTag = async (id: string, name: string) => {};
  deleteTag = async (id: string) => {};
  getTagById = async (id: string) => {};
  getAllTags = async () => {};
  getAllTagsByUserId = async (userId: string) => {};
}
