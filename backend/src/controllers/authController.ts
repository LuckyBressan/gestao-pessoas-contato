import { Request, RequestHandler, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ErrorMessage } from "@/@types/Error";

export const register: RequestHandler = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({
        error: {
          title: "Usuário já existe."
        }
      } as ErrorMessage);
      return;
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    await prisma.user.create({
      data: { nome, email, senha: hashedPassword },
    });
    res.status(201).json({ message: "Usuário criado com sucesso." });
  } catch (error) {
    res.status(500).json({
        error: {
          title: "Erro ao criar usuário",
          description: 'Verifique o console',
          trace: error
        }
      } as ErrorMessage);
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({
        error: {
          title: "Usuário não encontrado"
        }
      } as ErrorMessage);
      return;
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      res.status(400).json({
        error: {
          title: "Senha incorreta."
        }
      } as ErrorMessage);
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user.id, nome: user.nome, email: user.email },
    });
  } catch (error) {
    res.status(500).json({
        error: {
          title: "Erro no login.",
          description: 'Verifique o console',
          trace: error
        }
      } as ErrorMessage);
  }
};
