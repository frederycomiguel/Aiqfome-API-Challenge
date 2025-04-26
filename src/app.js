const express = require('express');
const app = express();
const clientRoutes = require('./routes/clientRoutes');

// Configurar o middleware
app.use(express.json());
app.use('/api/clients', clientRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
