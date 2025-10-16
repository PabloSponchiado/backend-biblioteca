import { Router } from "express"; 
import type { Request, Response } from "express"; 
const router = Router(); 
router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({mensagem: "Servidor da Biblioteca funcionando!"}); 
});

export { router }