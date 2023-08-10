import { User } from "@interfaces/users.interface";
import { CreateUserDto } from "@dtos/user.dto";
import { userModel } from "@models/user";
import { HttpException } from "@/exceptions/HttpException";

class UsersService {
  public users = userModel;

  public getUsers = async (): Promise<User[]> => {
    const users: User[] = await this.users.find();
    return users;
  };

  public getUserById = async (id: string): Promise<User> => {
    try {
      const findUser: User = await this.users.findOne({ _id: id });
      if (!findUser) throw new HttpException(409, "User doesn't exist");

      return findUser;
    } catch (e) {
      throw new Error(e);
    }
  };

  public createUser = async (data: User): Promise<User> => {
    const checkUser: User = await this.users.findOne({
      email: data.email,
    });
    if (checkUser) {
      throw new HttpException(409, `this email ${data.email} alredy exists`);
    }
    const createUser: User = await this.users.create(data);
    return createUser;
  };

  public updateUser = async (
    id: string,
    data: CreateUserDto
  ): Promise<User> => {
    const updateUserById: User = await this.users.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  };

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }
}

export default UsersService;
