const sinon = require("sinon");
const { expect } = require("chai");

const services = require("../../../services");
const salesControllers = require("../../../controllers/salesControllers");
const httpStatusCode = require("../../../helpers/httpStatusCode");


describe("4 - A chamada Controllers da função newsSales deve:", () => {
  describe("Caso a camada Controllers retorne algum erro", () => {
    const request = {};
    const response = {};
    const next = sinon.spy();
    const err = {
      status: httpStatusCode.BAD_REQUEST,
      message: 'error message',
    };
    before(() => {
      request.body = [{ productId: 1, quantity:0 }, { productId: 2, quantity: 5 }];
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services.salesServices, "newsSales").throws(err);
    });
    after(() => {
      services.salesServices.newsSales.restore();
    });
    it("é chamada a função next passando como parâmetro um objeto de erro", async () => {
      await salesControllers.newsSales(request, response, next);
      expect(next.calledWith(err)).to.be.equal(true);
    });
  });
  describe("Caso o registro de venda esteja correto", () => {
    const request = {};
    const response = {};
    const next = sinon.spy();
    const result = {
      id: 3,
      itemsSold: [{productId: 1, quantity: 1}, {productId: 2, quantity: 5 }]
    };
    before(() => {
      request.body = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services.salesServices, "newsSales").resolves(result);
    });
    after(() => {
      services.salesServices.newsSales.restore();
    });
    it("a resposta dever ser a venda cadastrada", async () => {
      await salesControllers.newsSales(request, response, next);
      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(result)).to.be.equal(true);
    });
  });
});

describe("5 - A chamada Controllers da função getAllSales deve:", () => {
  describe("Caso a camada Controllers retorne algum erro", () => {
    const request = {};
    const response = {};
    const next = sinon.spy();
    const err = {
      status: httpStatusCode.BAD_REQUEST,
      message: 'error message',
    };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services.salesServices, "getAllSales").throws(err);
    });
    after(() => {
      services.salesServices.getAllSales.restore();
    });
    it("é chamada a função next passando como parâmetro um objeto de erro", async () => {
      await salesControllers.getAllSales(request, response, next);
      expect(next.calledWith(err)).to.be.equal(true);
    });
  });
  describe("Caso a camada Controllers retorne o array de vendas buscado", () => {
    const request = {};
    const response = {};
    const next = sinon.spy();
    const result = [
    { date: "2022-07-06T15:54:07.000Z", saleId: 1, productId: 1, quantity: 5 },
    { date: "2022-07-06T15:54:07.000Z", saleId: 1, productId: 2, quantity: 10 },
    { date: "2022-07-06T15:54:07.000Z", saleId: 2, productId: 3, quantity: 15 }];
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services.salesServices, "getAllSales").resolves(result);
    });
    after(() => {
      services.salesServices.getAllSales.restore();
    });
    it("a resposta dever ser o array de vendas cadastrada", async () => {
      await salesControllers.getAllSales(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(result)).to.be.equal(true);
    });
  });
});

describe("6 - A chamada Controllers da função getSalesById deve:", () => {
  describe("Caso a camada Controllers retorne algum erro", () => {
    const request = {};
    const response = {};
    const next = sinon.spy();
    const err = {
      status: httpStatusCode.BAD_REQUEST,
      message: 'error message',
    };
    before(() => {
      request.params = "wrong param";
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services.salesServices, "getSalesById").throws(err);
    });
    after(() => {
      services.salesServices.getSalesById.restore();
    });
    it("é chamada a função next passando como parâmetro um objeto de erro", async () => {
      await salesControllers.getSalesById(request, response, next);
      expect(next.calledWith(err)).to.be.equal(true);
    });
  });
  describe("Caso a camada Controllers retorne o array de vendas buscado", () => {
    const request = {};
    const response = {};
    const next = sinon.spy();
    const result = [
    { date: "2022-07-06T15:54:07.000Z", saleId: 1, productId: 1, quantity: 5 },
    { date: "2022-07-06T15:54:07.000Z", saleId: 1, productId: 2, quantity: 10 },
    ];
    before(() => {
      request.params = 1;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services.salesServices, "getSalesById").resolves(result);
    });
    after(() => {
      services.salesServices.getSalesById.restore();
    });
    it("a resposta dever ser o array de vendas cadastrada", async () => {
      await salesControllers.getSalesById(request, response, next);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(result)).to.be.equal(true);
    });
  });
});

describe("9 - A chamada Controllers da função deleteSales deve:", () => {
  describe("Caso o id da venda não seja encontrado no banco de dados", () => {
    const request = {};
    const response = {};
    const next = sinon.spy();
    const err = {
      status: httpStatusCode.NOT_FOUND,
      message: "Sale not found",
    };
    before(() => {
      request.params = "id not found";
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(services.salesServices, "deleteSales").throws(err);
    });
    after(() => {
      services.salesServices.deleteSales.restore();
    });
    it("ser chamada a função next passando como parâmetro um objeto de erro", async () => {
      await salesControllers.deleteSales(request, response, next);
      expect(next.calledWith(err)).to.be.equal(true);
    });
  });
  describe("Caso o id da venda seja encontrado no banco de dados", () => {
    const request = {};
    const response = {};
    const next = sinon.spy();

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      sinon.stub(services.salesServices, "deleteSales").resolves(1);
    });
    after(() => {
      services.salesServices.deleteSales.restore();
    });
    it("a resposta dever ter o corpo vazio e o status 204", async () => {
      await salesControllers.deleteSales(request, response, next);
      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });
});

