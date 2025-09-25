const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

 //PÚBLICO Lista todos os animais disponíveis ou com filtros.
 
const listarAnimais = async (req, res) => {
  const { especie, porte, status, sexo } = req.query;
  try {
    const animais = await prisma.animal.findMany({
      where: {
        AND: [
          especie ? { especie: { contains: especie, mode: 'insensitive' } } : {},
          porte ? { porte: { contains: porte, mode: 'insensitive' } } : {},
          status ? { status: { equals: status } } : { status: 'DISPONIVEL' }, 
          sexo ? { sexo: { equals: sexo } } : {}
        ]
      },
      include: {
        ong: {
          select: { name: true, account: { select: { email: true } } } 
        }
      }
    });
    res.json(animais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar animais' });
  }
};

//PÚBLICO Busca um animal específico pelo seu ID.
 
const buscarAnimalPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const animal = await prisma.animal.findUnique({
      where: { id: parseInt(id) },
      include: { 
        ong: {
          select: { name: true, descricao: true, endereco: true, account: { select: { email: true } } }
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
};



 // ONG/ADMIN Cria um novo animal.
 
const criarAnimal = async (req, res) => {
  const { name, especie, raca, idade, status, porte, sexo, descricao, photoURL } = req.body;
  const usuarioLogado = req.account;

  if (!name || !especie) {
    return res.status(400).json({ error: 'Nome e espécie são obrigatórios' });
  }

  try {
    const ong = await prisma.ong.findUnique({ where: { accountId: usuarioLogado.id } });
    if (!ong) {
      return res.status(403).json({ error: 'Apenas ONGs podem cadastrar animais.' });
    }

    const novoAnimal = await prisma.animal.create({
      data: {
        name,
        especie,
        raca,
        idade: idade ? parseInt(idade) : null,
        status: status || 'DISPONIVEL',
        porte,
        sexo,
        descricao,
        photoURL,
        ongId: ong.id, 
      },
      include: { ong: true }
    });
    res.status(201).json(novoAnimal);
  } catch (err) {
    console.error('Erro detalhado:', err);
    res.status(500).json({ error: 'Erro ao cadastrar animal' });
  }
};


 //ONG/ADMIN Atualiza os dados de um animal.
 
const atualizarAnimal = async (req, res) => {
  const { id } = req.params;
  const usuarioLogado = req.account;
  const dataToUpdate = req.body; 
  try {
    const animal = await prisma.animal.findUnique({ where: { id: parseInt(id) } });
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado.' });

    let temPermissao = false;
    if (usuarioLogado.role === 'ADMIN') {
        temPermissao = true;
    } else if (usuarioLogado.role === 'ONG') {
        const ong = await prisma.ong.findUnique({ where: { accountId: usuarioLogado.id } });
        if (ong && animal.ongId === ong.id) {
            temPermissao = true;
        }
    }

    if (!temPermissao) {
        return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para editar este animal.' });
    }

    // Garante que a idade seja um inteiro se for fornecida
    if (dataToUpdate.idade) {
        dataToUpdate.idade = parseInt(dataToUpdate.idade);
    }

    const animalAtualizado = await prisma.animal.update({
      where: { id: parseInt(id) },
      data: dataToUpdate,
      include: { ong: true },
    });
    res.json(animalAtualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar animal' });
  }
};


 //ONG/ADMIN Deleta um animal
 
const deletarAnimal = async (req, res) => {
  const { id } = req.params;
  const usuarioLogado = req.account;

  try {
    const animal = await prisma.animal.findUnique({ where: { id: parseInt(id) } });
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado.' });
    
    let temPermissao = false;
    if (usuarioLogado.role === 'ADMIN') {
        temPermissao = true;
    } else if (usuarioLogado.role === 'ONG') {
        const ong = await prisma.ong.findUnique({ where: { accountId: usuarioLogado.id } });
        if (ong && animal.ongId === ong.id) {
            temPermissao = true;
        }
    }

    if (!temPermissao) {
        return res.status(403).json({ error: 'Acesso negado. Você não pode deletar este animal.' });
    }
    
    // Antes de deletar o animal, deletar os pedidos de adoção relacionados
    await prisma.adocao.deleteMany({
      where: { animalId: parseInt(id) }
    });
    
    await prisma.animal.delete({ where: { id: parseInt(id) } });
    
    res.status(200).json({ message: 'Animal removido com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar animal' });
  }
};


module.exports = {
  listarAnimais,
  buscarAnimalPorId,
  criarAnimal,
  atualizarAnimal,
  deletarAnimal
};