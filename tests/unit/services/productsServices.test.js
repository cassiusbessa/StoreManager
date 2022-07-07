const sinon = require("sinon");
const { expect } = require("chai");

const models = require("../../../models");
const productsServices = require("../../../services/productsServices");
const ErrorObject = require("../../../helpers/errorObject");

describe("1 - A chamada Services da função getAllProducts deve: ", () => {
  describe("caso a consulta ao banco de dados não retorne nenhum produto", () => {
    before(() => {
      const result = [];
      sinon.stub(models.productsModels, "getAllProducts").resolves(result);
    });
    after(() => {
      models.productsModels.getAllProducts.restore();
    });

    it("retorna um array vazio", async () => {
      const products = await productsServices.getAllProducts();
      expect(products).to.be.an("array").that.is.empty;
    });
  });

    describe("caso a consulta retorne uma lista de produtos", () => {
      const result = [{ id: 1, name: 'product' }, { id: 2, name: "otherProduct" }];
      before(() => {
        sinon.stub(models.productsModels, "getAllProducts").resolves(result);
      })
      after(() => {
        models.productsModels.getAllProducts.restore();
      });
      
      it("deve retornar um array contendo a lista", async () => {
        const products = await productsServices.getAllProducts();
        expect(products).to.be.an("array").that.be.equal(result);
      });
  });
});


describe("2 - A chamada Services da função getProductById deve: ", () => {
  describe("caso a consulta ao banco de dados não retorne nenhum produto", () => {
    const err = new ErrorObject
    before(() => {
      const result = [];
      sinon.stub(models.productsModels, "getProductById").resolves(result);
    });
    after(() => {
      models.productsModels.getProductById.restore();
    });

    it("Lançar um erro", async () => {
      try {
        await productsServices.getProductById('wrong param');
        expect.fail("deveria lançar um erro");

      } catch (error) {
        expect(error.message).to.equals("Product not found");        
      }
    });
  });

  describe("caso a consulta retorne o array com o produto", () => {
    const result = [
      { id: 2, name: "otherProduct" },
    ];
    before(() => {
      sinon.stub(models.productsModels, "getProductById").resolves(result);
    });
    after(() => {
      models.productsModels.getProductById.restore();
    });

    it("deve retornar o produto encontrado", async () => {
      const products = await productsServices.getProductById();
      expect(products).to.deep.equal(...result)
    });
  });
});


describe('3 - A chamada Services da função addProduct deve:', () => {
  describe("caso o nome do produto não tenha sido informado", () => {
    const productName = ""
    it('lançar um erro com a mensagem: "name" is required', async () => {
      try {
        await productsServices.addProduct(productName);
        expect.fail('deveria lançar um erro');
      } catch (err) {
        expect(err.message).to.equals('"name" is required');
      }
    });
  });

  describe("caso o nome do produto tenha menos que 5 caractéres", () => {
    const productName = '>5'
    it('lançar um erro com a mensagem: "name" length must be at least 5 characters long', async () => {
      try {
        await productsServices.addProduct(productName);
        expect.fail('deveria lançar um erro');
      } catch (err) {
        expect(err.message).to.equals('"name" length must be at least 5 characters long');
      }
    });
  });

  describe("caso o nome do produto seja informado corretamente", () => {
    const newProduct = { name: "ProdutoX", id: 4 }
    before(() => {
      sinon.stub(models.productsModels, 'addProduct').resolves(newProduct);
    });
    after(() => {
      models.productsModels.addProduct.restore();
    });
    it('retornar o produto cadastrado', async () => {
      const result = await productsServices.addProduct(newProduct.name);
      expect(result).to.deep.equals(newProduct);
    });
  });
});

describe("7 - A chamada Services da função updateProduct deve:", () => {
  describe("caso o nome do produto não tenha sido informado", () => {
    const productName = "";
    it('lançar um erro com a mensagem: "name" is required', async () => {
      try {
        await productsServices.updateProduct(1, productName);
        expect.fail("deveria lançar um erro");
      } catch (err) {
        expect(err.message).to.equals('"name" is required');
      }
    });
  });

  describe("caso o nome do produto tenha menos que 5 caractéres", () => {
    const productName = ">5";
    it('lançar um erro com a mensagem: "name" length must be at least 5 characters long', async () => {
      try {
        await productsServices.updateProduct(1, productName);
        expect.fail("deveria lançar um erro");
      } catch (err) {
        expect(err.message).to.equals(
          '"name" length must be at least 5 characters long'
        );
      }
    });
  });

  describe("caso o nome do produto seja informado corretamente, mas não encontre o produto", () => {
    const affectedRows = 0;
    const productName = 'Luva de Predero';
    before(() => {
      sinon.stub(models.productsModels, "updateProduct").resolves(affectedRows);
    });
    after(() => {
      models.productsModels.updateProduct.restore();
    });
    it("lançar um erro com a mensagem: Product not found", async () => {
      try {
        await productsServices.updateProduct(1, productName);
        expect.fail("deveria lançar um erro");
      } catch (err) {
        expect(err.message).to.equals("Product not found");
      }
    });
  });
  describe("caso o nome seja informado corretamente e o produto seja encontrado", () => {
    const affectedRows = 1;
    const productName = "Luva de Predero";
    const result = {id: "1",  name: "Luva de Predero"};
    before(() => {
      sinon.stub(models.productsModels, "updateProduct").resolves(affectedRows);
    });
    after(() => {
      models.productsModels.updateProduct.restore();
    });
    it('retornar a quantidade de produtos atualizados', async () => {
      const updatedProduct = await productsServices.updateProduct(result.id, result.name);
      expect(updatedProduct).to.equals(affectedRows);
    });
  });
});

describe("8 - A chamada Services da função deleteProduct deve:", () => {
  describe("caso o id do produto a ser deletado não seja encontrado", () => {
  const affectedRows = 0;
  before(() => {
    sinon.stub(models.productsModels, "deleteProduct").resolves(affectedRows);
  });
  after(() => {
    models.productsModels.deleteProduct.restore();
  });
  it("lançar um erro com a mensagem: Product not found", async () => {
    try {
      await productsServices.deleteProduct(1);
      expect.fail("deveria lançar um erro");
    } catch (err) {
      expect(err.message).to.equals("Product not found");
    }
  });
});
  describe("caso o id do produto seja encontrado", () => {
    const affectedRows = 1;
    const productId = 1;
    before(() => {
      sinon.stub(models.productsModels, "deleteProduct").resolves(affectedRows);
    });
    after(() => {
      models.productsModels.deleteProduct.restore();
    });
    it("retornar a quantidade de produtos atualizados", async () => {
      const updatedProduct = await productsServices.deleteProduct(productId);
      expect(updatedProduct).to.equals(affectedRows);
    });
  });
});

