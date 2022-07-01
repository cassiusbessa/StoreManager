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

