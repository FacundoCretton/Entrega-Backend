import express, {Express} from 'express';

export class Server {
    app: Express;
    port: string | number| undefined;

    constructor() {
        this.app = express();
        this.port= process.env.PORT;
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`El server esta corriendo en el puerto ${this.port}`);
        });
    };
    
}