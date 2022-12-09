require('dotenv').config();
const express = require('express');
const app = express();
const wa = require('venom-bot');
const PORT = process.env.PORT;
const APP_ACCESS_TOKEN = process.env.APP_ACCESS_TOKEN;
app.listen(PORT, () => console.log('listen on http://localhost:' + PORT))
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: APP_ACCESS_TOKEN
});
wa.create('venom-bot').then((client) => WhatsApp(client, app)).catch(err => console.log(err))


async function WhatsApp(client, app) {
    client.onMessage((message) => {
        if (message.body.includes('pix')) {
            mercadopago.payment.create({
                installments: 1,
                transaction_amount: parseFloat(message.body.split(' ')[1]),
                payer: {
                    email: 'erick110999@gmail.com',
                },
                payment_method_id: 'pix',
                notification_url: 'http://15.228.21.196:' + PORT + '/callback_payment'
            }).then((response) => client.sendText(message.from, `Chave copia e cola: \n\n${response.body.point_of_interaction.transaction_data.qr_code}`))
        }
    })

    app.get('/', (req, res) => res.send('OK'))
    app.post('/callback_payment', (req, res) => {
        mercadopago.payment.get(req.query.id).then(res => console.log(res))
    })
}