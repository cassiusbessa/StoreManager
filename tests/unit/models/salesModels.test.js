const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../helpers/connection");
const salesModels = require("../../../models/salesModels");

describe("4 - A chamada Models da função dateSale deve:", () => {
  describe("cadastrar corretamente a data e o id de uma venda bem sucedida", () => {
    const result = [{
        insertId: 4,
    }];
    before(() => {
      sinon.stub(connection, "execute").resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });
    it('deve retornar o id da venda', async () => {
      const id = await salesModels.newsSales.dateSale();
      expect(id).to.equals(result[0].insertId);
    });
  });
});

describe("4 - A chamada Models da função productSale deve:", () => {
  describe("cadastrar corretamente uma venda bem sucedida", () => {
    const result = [];
    const sale = { id: 2, productId: 4, quantity: 3}
    before(() => {
      sinon.stub(connection, "execute").resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });
    it("deve retornar o objeto da venda com id da venda, id do produto e quantidade", async () => {
      const sales = await salesModels.newsSales.productSale(2, 4, 3);
      expect(sales).to.deep.equals(sale);
    });
  });
});

