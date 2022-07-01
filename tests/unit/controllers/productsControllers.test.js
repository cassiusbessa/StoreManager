const sinon = require("sinon");
const { expect } = require("chai");

const services = require("../../../services");
const productsControllers = require("../../../controllers/productsControllers");
const httpStatusCode = require("../../../helpers/httpStatusCode");


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

  describe("Caso ocorre algum erro não especificado", async () => {
    const request = {};
    const response = {};
    const next = sinon.spy();
    const err = { status: httpStatusCode.INTERNAL_SERVER, message: "Internal Server Error" };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services.productsServices, "getAllProducts").throws(err);
    });
    after(() => {
      services.productsServices.getAllProducts.restore();
    });
    it("é chamada a função next passando como parâmetro um ojeto de erro", async () => {
      await productsControllers.getAllProducts(request, response, next);
      expect(next.calledWith(err)).to.be.equal(true);
    });      
  })

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
    const next = sinon.spy();
    const err = { status: httpStatusCode.NOT_FOUND, message: "Product not found" };
    before(() => {
      request.params = "wrong param";
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services.productsServices, "getProductById").throws(err);
    });
    after(() => {
      services.productsServices.getProductById.restore();
    });

    it("é chamada a função next passando como parâmetro um ojeto de erro", async () => {
      await productsControllers.getProductById(request, response, next);
      expect(next.calledWith(err)).to.be.equal(true);
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
