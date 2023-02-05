import { FastifyInstance } from 'fastify';
import WebPush from 'web-push'; 
import { z } from 'zod';

console.log(WebPush.generateVAPIDKeys());

const publicKey ='BB9x1tHgEe-69vWQ2iC7H5hUfHvzqVvtHKrRyosGTf6y7CGzkxMqEso-AbG_cudUg2fJNoZKNYM55dW13GtjIcY';
const privateKey = 'nDpxiBiaQxIFzl9mqJG3oL_ncFPF2KtcxLYEKXl6D2M';

WebPush.setVapidDetails(
    'http://localhost:3333',
    publicKey,
    privateKey
)

export async function notificationRoutes(app: FastifyInstance) {

    app.get('/push/public_key', () => {
        return {
            publicKey
        };
    });

    app.post('/push/register', (req, rep) => {
        console.log(req.body);

        return rep.status(201).send();
    });

    app.post('/push/send', async (req, rep) => {
        console.log(req.body);
        subscription: {
            
          }
        const sendPushBody = z.object({
            subscription: z.object({
                endpoint: z.string(),
                keys: z.object({
                    p256dh: z.string(),
                    auth: z.string()
                })
            })
        })

        const { subscription } = sendPushBody.parse(req.body);

        WebPush.sendNotification(subscription, 'Hello World, from Backend')

        return rep.status(201).send();
    })

}


