import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, avatarFile: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    const userUpdated = { ...user };
    userUpdated.avatar = avatarFile;

    await this.usersRepository.update(userUpdated, user);
  }
}

export { UpdateUserAvatarUseCase };
