import { User } from "@interfaces/users.interface";
import { CreateUserDto } from "@dtos/user.dto";
import { userModel } from "@models/user";
import { HttpException } from "@/exceptions/HttpException";

class UsersService {
  public users = userModel;

  public getUsers = async (): Promise<User[]> => {
    try {
      const users: User[] = await this.users.find();
      return users;
    } catch (e) {
      throw new Error(e);
    }
  };

  public getUserById = async (id: string): Promise<User> => {
    if (id === null) {
      throw new HttpException(400, "user id is empty");
    }
    try {
      const findUser: User = await this.users.findOne({ _id: id });
      if (!findUser) throw new HttpException(409, "User doesn't exist");

      return findUser;
    } catch (e) {
      throw new Error(e);
    }
  };

  public createUser = async (data: User): Promise<User> => {
    if (data === null) {
      throw new HttpException(400, "user data is empty");
    }
    try {
      const checkUser: User = await this.users.findOne({
        email: data.email,
      });
      if (checkUser) {
        throw new HttpException(409, `this email ${data.email} alredy exists`);
      }
      const createUser: User = await this.users.create(data);
      return createUser;
    } catch (e) {
      throw new Error(e);
    }
  };

  public updateUser = async (
    id: string,
    data: CreateUserDto
  ): Promise<User> => {
    if (id && data === null) {
      throw new HttpException(400, "user data is empty");
    }
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
