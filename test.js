require('dotenv').config()
const APP_ACCESS_TOKEN = process.env.APP_ACCESS_TOKEN;
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: APP_ACCESS_TOKEN
});

//resumindo= cria uma chave pix copia e cola => aguarda notification => consulta payment status com o id que retorna na notification
mercadopago.payment.get('52369026643').then(res => console.log(res))