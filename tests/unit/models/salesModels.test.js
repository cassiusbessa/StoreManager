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

describe("5 - A chamada Models da função getAllSales deve:", () => {
  describe('caso não tenham dados no banco', () => {
    const result = [[]];

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(result);
    });

    afterEach(() => {
      connection.execute.restore();
    })

    it('retornar um array vazio', async () => {
      const result = await salesModels.getAllSales();
      expect(result).to.be.an('array').that.is.empty;
    })
  });
  describe('caso tenham dados no banco, retorna array de objetos com os dados', () => {
      const result = [[
        { date: "2022-07-06T15:54:07.000Z", saleId: 1, productId: 1, quantity: 5 },
        { date: "2022-07-06T15:54:07.000Z", saleId: 1, productId: 2, quantity: 10 },
        { date: "2022-07-06T15:54:07.000Z", saleId: 2, productId: 3, quantity: 15 },
      ]];
      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(result);
      });
      afterEach(() => {
        connection.execute.restore();
      })
      it('retorna um array', async () => {
        const result = await salesModels.getAllSales();
        expect(result).to.be.an('array');
      })
      it('com os dados das vendas', async () => {
        const sales = await salesModels.getAllSales();
        expect(sales).to.deep.equals(result[0]);
      })
    })
});

describe("6 - A chamada Models da função getSalesById deve:", () => {
  describe("caso não tenham dados no banco", () => {
    const result = [[]];

    beforeEach(() => {
      sinon.stub(connection, "execute").resolves(result);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it("retornar um array vazio", async () => {
      const result = await salesModels.getSalesById(1);
      expect(result).to.be.an("array").that.is.empty;
    });
  });
  describe("caso tenham dados no banco, retorna array de objetos com os dados", () => {
    const result = [[
        { date: "2022-07-06T15:54:07.000Z",  saleId: 1, productId: 1, quantity: 5 },
        { date: "2022-07-06T15:54:07.000Z",  saleId: 1, productId: 2, quantity: 10 },
      ]];
    beforeEach(() => {
      sinon.stub(connection, "execute").resolves(result);
    });
    afterEach(() => {
      connection.execute.restore();
    });
    it("retorna um array", async () => {
      const result = await salesModels.getAllSales(1);
      expect(result).to.be.an("array");
    });
    it("com os dados das vendas", async () => {
      const sales = await salesModels.getAllSales(1);
      expect(sales).to.deep.equals(result[0]);
    });
  });
});

describe("9 - A chamada Models da função deleteSales deve:", () => {
  describe("Quando não recebe parâmetros", () => {
    before(() => {
      sinon.stub(connection, "execute").throws();
    });
    after(() => {
      connection.execute.restore();
    });
    it("lança um erro", async () => {
      try {
        await salesModels.deleteSales();
      } catch (err) {
        expect(err).to.exist;
      }
    });
  });
  describe("Quando chamado corretamente", () => {
    const result = [{ affectedRows: 1 }];
    before(() => {
      sinon.stub(connection, "execute").resolves(result);
    });
    after(() => {
      connection.execute.restore();
    });
    it("somente uma coluna deve ter sido alterada", async () => {
      const updateProduct = await salesModels.deleteSales(1);
      expect(updateProduct).to.equals(result[0].affectedRows);
    });
  });
});


