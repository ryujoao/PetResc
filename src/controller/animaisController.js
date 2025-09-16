const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// GET - Buscar animais com filtros 
router.get('/search', async (req, res) => {
  const { especie, porte, status, sexo } = req.query;

  try {
    const animais = await prisma.animal.findMany({
      where: {
        AND: [
          especie ? { especie: { contains: especie, mode: 'insensitive' } } : {},
          porte ? { porte: { contains: porte, mode: 'insensitive' } } : {},
          status ? { status: { equals: status } } : {},
          sexo ? { sexo: { equals: sexo } } : {}
        ]
      },
      include: {
        ong: {
          include: { account: true }
        }
      }
    });

    res.json(animais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar animais com filtros' });
  }
});

// GET 
router.get('/ong/:ongId', async (req, res) => {
  const { ongId } = req.params;

  try {
    const animais = await prisma.animal.findMany({
      where: { ongId: parseInt(ongId) },
      include: {
        ong: {
          include: { account: true }
        }
      }
    });

    if (animais.length === 0) {
      return res.status(404).json({ error: 'Nenhum animal encontrado para essa ONG' });
    }

    res.json(animais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar animais da ONG' });
  }
});

// GET 
router.get('/', async (req, res) => {
  try {
    const animais = await prisma.animal.findMany({
      include: { 
        ong: {
          include: { account: true }
        } 
      },
    });
    res.json(animais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar animais' });
  }
});

// GET 
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const animal = await prisma.animal.findUnique({
      where: { id: parseInt(id) },
      include: { 
        ong: {
          include: { account: true }
        } 
      },
    });
    
    if (!animal) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }
    
    res.json(animal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar animal' });
  }
});

// POST
router.post('/', async (req, res) => {
  const { name, especie, raca, idade, status, porte, sexo, descricao, photoURL, ongId } = req.body;

  if (!name || !especie || !ongId) {
    return res.status(400).json({ error: 'Nome, espécie e ONG são obrigatórios' });
  }

  try {
    const novoAnimal = await prisma.animal.create({
      data: {
        name,
        especie,
        raca: raca || null,
        idade: idade ? parseInt(idade) : null,
        status: status || 'DISPONIVEL',
        porte: porte || null,
        sexo: sexo || null,
        descricao: descricao || null,
        photoURL: photoURL || null,
        ongId: parseInt(ongId),
      },
      include: {
        ong: {
          include: { account: true }
        }
      }
    });

    res.status(201).json(novoAnimal);
  } catch (err) {
    console.error('Erro detalhado:', err);
    res.status(500).json({ error: 'Erro ao cadastrar animal' });
  }
});

// PUT 
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, especie, raca, idade, status, porte, sexo, descricao, photoURL } = req.body;

  try {
    const animalAtualizado = await prisma.animal.update({
      where: { id: parseInt(id) },
      data: {
        name,
        especie,
        raca,
        idade: idade ? parseInt(idade) : null,
        status,
        porte,
        sexo,
        descricao,
        photoURL,
      },
      include: { 
        ong: {
          include: { account: true }
        }
      },
    });

    res.json(animalAtualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar animal' });
  }
});

// DELETE 
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.animal.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar animal' });
  }
});

module.exports = router;
