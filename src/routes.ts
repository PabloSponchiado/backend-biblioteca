import e, { Router } from "express"; 
import type { Request, Response } from "express"; 
import AlunoController from "./controller/AlunoController.js";
import LivroController from "./controller/LivroController.js";
import EmprestimoController from "./controller/EmprestimoController.js";
const router = Router(); 

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});

router.get("/api/alunos", AlunoController.todos);
router.post("/api/alunos/novo", AlunoController.novo);
router.get("/api/livros", LivroController.todos);
router.post("/api/livros/novo", LivroController.novo);
router.get("/api/emprestimos", EmprestimoController.todos);

export { router }; // Exporta o roteador