import { Request, Response } from "express";
import UsersService from "@/services/users.service";
import { User } from "@/interfaces/users.interface";
import { CreateUserDto } from "@/dtos/user.dto";
import { validate } from "class-validator";

class UsersController {
  public usersService = new UsersService();
  public getUsers = async (req: Request, res: Response) => {
    try {
      const users: User[] = await this.usersService.getUsers();
      res.status(200).json({ users });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user: User | null = await this.usersService.getUserById(id);
      res.status(200).json({ user });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  public createUser = async (req: Request, res: Response) => {
    if (req.body.json) {
      return res.status(404).json({
        Message: "Body is empty please insert some data",
      });
    }
    const data = new CreateUserDto();
    data.address = req.body.address;
    data.email = req.body.email;
    data.gstNumber = req.body.gstNumber;
    data.name = req.body.name;
    data.phoneNumber = req.body.phoneNumber;
    const errors = await validate(data);
    if (errors.length > 0) {
      const constraints = {};
      errors.forEach((error) => {
        const propertyName = error.property;
        const errorConstraints = Object.values(error.constraints);
        constraints[propertyName] = errorConstraints;
      });
      return res.status(400).json({ constraints });
    }
    try {
      const createUserData = await this.usersService.createUser(data);
      res.status(201).json({ data: createUserData });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userUpdate: CreateUserDto = req.body;
      const updatedUser: User = await this.usersService.updateUser(
        id,
        userUpdate
      );
      res.status(200).json({ user: updatedUser });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.usersService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
}

export default UsersController;
