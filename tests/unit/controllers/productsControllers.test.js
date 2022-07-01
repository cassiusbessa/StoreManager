const sinon = require("sinon");
const { expect } = require("chai");

const services = require("../../../services");
const productsControllers = require("../../../controllers/productsControllers");

describe("1 - A chamada Controllers da função getAllProducts deve: ", () => {
  describe("caso a consulta ao banco de dados não retorne nenhum produto", () => {
    const request = {};
    const response = {};
    before(() => {
      const result = [];
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services.productsServices, "getAllProducts").resolves(result);
    });
    after(() => {
      services.productsServices.getAllProducts.restore();
    });

    it("É chamado o send com código 200 e com array vazio", async () => {
      await productsControllers.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith([])).to.be.equal(true);

    });
  });

  describe("caso a consulta ao banco de dados retorne uma lista de produtos", () => {
    const request = {};
    const response = {};
    const result = [
      { id: 1, name: "product" },
      { id: 2, name: "otherProduct" },
    ];
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services.productsServices, "getAllProducts").resolves(result);
    });
    after(() => {
      services.productsServices.getAllProducts.restore();
    });
    it("deve retornar um array contendo a lista", async () => {
      await productsControllers.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(result)).to.be.equal(true);
    });
  });
});

describe("2 - A chamada Controllers da função getProductById deve: ", () => {
  describe("caso a consulta ao banco de dados não retorne nenhum produto", () => {
    const request = {};
    const response = {};
    const error = {
      message: "Product not found",
      statusCode: 404,
    };
    before(() => {
      request.params = "wrong param";
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services.productsServices, "getProductById").throws(error);
    });
    after(() => {
      services.productsServices.getProductById.restore();
    });

    it("É chamado o send com código 404 e a mensagem 'Product not found'", async () => {
      await productsControllers.getProductById(request, response);
      expect(response.status.calledWith(error.statusCode)).to.be.equal(true);
      expect(response.json.calledWith({ message: error.message })).to.be.equal(true);
    });
  });

  describe("caso a consulta retorne o objeto com o produto", () => {
    const request = {};
    const response = {};
    const result = { id: 1, name: "product" };

    before(() => {
      request.params = 1;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services.productsServices, "getProductById").resolves(result);
    });
    after(() => {
      services.productsServices.getProductById.restore();
    });
    it("deve retornar um array contendo a lista", async () => {
      await productsControllers.getProductById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(result)).to.be.equal(true);
    });
  });
});
