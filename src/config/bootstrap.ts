import 'dotenv/config';
import { env } from './env';
import { configApp } from './app';

export async function bootstrap() {
    const app = await configApp();
    await app.listen(env.server.port);
}
