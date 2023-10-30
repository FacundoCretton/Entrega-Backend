import express, {Express} from 'express';
import { DBConection } from '../database/config';
import cors from 'cors';
import authRoutes from '../routes/auth';
import ordersRoutes from '../routes/orders';
import issuesRoutes from '../routes/issues'

export class Server {
    app: Express;
    port: string | number| undefined;
    authPath: string;
    ordersPath: string;
    issuesPath: string;

    constructor() {
        this.app = express();
        this.port= process.env.PORT;
        this.authPath = '/auth';
        this.ordersPath = '/orders';
        this.issuesPath = '/issues';
        this.middlewares();
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
        this.app.use(this.ordersPath, ordersRoutes);
        this.app.use(this.issuesPath, issuesRoutes)
    };

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`El server esta corriendo en el puerto ${this.port}`);
        });
    };
    
}