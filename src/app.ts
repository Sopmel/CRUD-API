import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

const port = process.env.PORT || 3001;

app.get('*', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});