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