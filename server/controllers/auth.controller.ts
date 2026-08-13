import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema, signupSchema } from "../lib/validationSchema.js";
import { z } from "zod";

const SALT = 10;
const register = async (req: Request, res: Response) => {
  try {
    const validateData = signupSchema.parse(req.body);
    const { name, email, password, username } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) return res.status(400).json({ Message: "User already exists!" });
    const hashedPassword = await bcrypt.hash(password, SALT);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        username: username,
      },
      include: {
        applications: true,
      },
    });

    const token = jwt.sign(
      { id: newUser.id, name: newUser.name },
      process.env.JWT_SECRET ?? "",
      { expiresIn: "1d" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    if(error instanceof z.ZodError) return res.status(400).json({ error: error.message});
    return res.status(400).json({ error: (error as Error).message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const validateData = loginSchema.parse(req.body)
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user)
      return res.status(400).json({ Message: "User doesn't already exist!" });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(400).json({ Message: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET ?? "",
      { expiresIn: "1d" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    if (error instanceof z.ZodError)
      return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: (error as Error).message });
  }
};

const logout = async (req: Request, res: Response) => { 
  res.clearCookie('token');
  return res.status(200).json({message:"User loggedout successfully"})
}
export { register,login,logout };
