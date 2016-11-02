import json, os

class Recurso():
    nome = None
    descricao = None

    def carrega_propriedades(self,recurso):
        pasta = os.path.join(os.getcwd(),os.path.join("projetos",recurso))
        with open(os.path.join(pasta,"propriedades.json")) as arquivo:
            propriedades = json.load(arquivo)
        self.nome = propriedades['nome']
        self.descricao = propriedades['descricao']