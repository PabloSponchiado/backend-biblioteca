import { server } from "./server.js";

const port = 3333; 

server.listen(port, () => {
    console.log(`Server executando no endereço http://localhost:${port}`);
});