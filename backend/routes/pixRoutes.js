const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

// Gerar PIX
router.post('/generate', async (req, res) => {
    try {
        const { amount, description } = req.body;
        
        // Aqui você integraria com um gateway de pagamento real (Stripe, MercadoPago, etc.)
        // Para demonstração, vamos gerar um QR Code mockado
        
        const pixKey = 'chave.pix@rcptecnologia.com.br';
        const merchant = 'RCP Tecnologia';
        const city = 'SAO PAULO';
        
        // Formato PIX simplificado (em produção use uma biblioteca específica)
        const pixPayload = `00020126580014BR.GOV.BCB.PIX0136${pixKey}5204000053039865404${amount.toFixed(2)}5802BR5913${merchant}6009${city}62070503***6304E2C9`;
        
        const qrCode = await QRCode.toDataURL(pixPayload);
        
        res.json({
            qrCode: qrCode,
            pixCode: pixPayload
        });
    } catch (error) {
        console.error('Erro ao gerar PIX:', error);
        res.status(500).json({ error: 'Erro ao gerar PIX' });
    }
});

module.exports = router;