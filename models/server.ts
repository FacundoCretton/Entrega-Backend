import express, {Express} from 'express';
import { DBConection } from '../database/config';
import cors from 'cors';
import authRoutes from '../routes/auth';

export class Server {
    app: Express;
    port: string | number| undefined;
    authPath: string;

    constructor() {
        this.app = express();
        this.port= process.env.PORT;
        this.middlewares();
        this.authPath = '/auth'
        this.routes();
        this.conectarDB();
    }

    
    async conectarDB(): Promise<void>{
        await DBConection();
    }

    middlewares(): void {
        this.app.use(express.json());
        this.app.use(cors())

    };



    routes(): void {
        this.app.use(this.authPath, authRoutes);
    };

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`El server esta corriendo en el puerto ${this.port}`);
        });
    };
    
}