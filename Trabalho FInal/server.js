const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Post = require('./models/Post');

const app = express();

// Middleware para processar JSON
app.use(express.json());

// --- CONEXÃO AO MONGODB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Sucesso: Ligado ao MongoDB Atlas!'))
  .catch(err => console.error('❌ Erro de conexão:', err));

// --- ROTAS DA API ---

// 1. Rota de Boas-vindas (Teste inicial)
app.get('/', (req, res) => {
  res.send('API do Blog a funcionar! 🚀');
});

// 2. CRIAR um novo Post (POST)
app.post('/posts', async (req, res) => {
  try {
    const novoPost = new Post(req.body);
    const postGuardado = await novoPost.save();
    res.status(201).json(postGuardado);
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao criar post', erro: err.message });
  }
});

// 3. LISTAR todos os Posts (GET)
app.get('/posts', async (req, res) => {
  try {
    const todosPosts = await Post.find();
    res.json(todosPosts);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao procurar posts', erro: err.message });
  }
});

// 4. ATUALIZAR um Post por ID (PUT)
app.put('/posts/:id', async (req, res) => {
  try {
    const postAtualizado = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Retorna o post já com as alterações feitas
    );
    res.json(postAtualizado);
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao atualizar post', erro: err.message });
  }
});

// 5. ELIMINAR um Post por ID (DELETE)
app.delete('/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Post eliminado com sucesso!' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao eliminar post', erro: err.message });
  }
});

// --- INICIAR SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor a rodar em http://localhost:${PORT}`);
});