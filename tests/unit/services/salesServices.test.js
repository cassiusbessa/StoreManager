const sinon = require("sinon");
const { expect } = require("chai");

const models = require("../../../models");
const salesServices = require("../../../services/salesServices");

describe("4 - A chamada Services da função newsSales deve:", () => {
  afterEach(() => {
    sinon.restore(); 
  })
  describe('caso o id de algum produto não tenha sido informado', () => {
    const id = 1;
    const itemsSold = [
      { productId: "", quantity: 3 },
      { productId: 2, quantity: 5 },
    ];
    beforeEach(() => {
      const allProducts = [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
      ];
      sinon.stub(models.productsModels, "getAllProducts").resolves(allProducts);
      sinon.stub(models.salesModels.newsSales, "dateSale").resolves(id);
      sinon.stub(salesServices, "salesValidator").throws();
      sinon.stub(models.salesModels.newsSales, "productSale")
        .onCall(0).resolves(itemsSold)
        .onCall(1).resolves(itemsSold);
    });
    it('lançar um erro com a mensagem: "productId" is required', async () => {
      try {
        await salesServices.newsSales(itemsSold);
        expect.fail('deveria lançar um erro');
      } catch (err) {
        expect(err.message).to.equals('"productId" is required');
      }
    })
  });
  describe("caso o id de algum produto não exista  no banco de dados", () => {
    const id = 1;
    const itemsSold = [
      { productId: "not found", quantity: 3 },
      { productId: 2, quantity: 5 },
    ];
    beforeEach(() => {
      const allProducts = [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
      ];
      sinon.stub(models.productsModels, "getAllProducts").resolves(allProducts);
      sinon.stub(models.salesModels.newsSales, "dateSale").resolves(id);
      sinon.stub(salesServices, "salesValidator").throws();
      sinon.stub(models.salesModels.newsSales, "productSale")
        .onCall(0).resolves(itemsSold)
        .onCall(1).resolves(itemsSold);
    });
    it("lançar um erro com a mensagem: Product not found", async () => {
      try {
        await salesServices.newsSales(itemsSold);
        expect.fail("deveria lançar um erro");
      } catch (err) {
        expect(err.message).to.equals("Product not found");
      }
    });
  });
  describe("caso a quantidade de algum produto não tenha sido informada", () => {
    const id = 1;
    const itemsSold = [
      { productId: 1 },
      { productId: 2, quantity: 5 },
    ];
    beforeEach(() => {
      const allProducts = [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
      ];
      sinon.stub(models.productsModels, "getAllProducts").resolves(allProducts);
      sinon.stub(models.salesModels.newsSales, "dateSale").resolves(id);
      sinon.stub(salesServices, "salesValidator").throws();
      sinon.stub(models.salesModels.newsSales, "productSale")
        .onCall(0).resolves(itemsSold)  
        .onCall(1).resolves(itemsSold);
    });
    it('lançar um erro com a mensagem: "quantity" is required', async () => {
      try {
        await salesServices.newsSales(itemsSold);
        expect.fail("deveria lançar um erro");
      } catch (err) {
        expect(err.message).to.equals('"quantity" is required');
      }
    });
  });
  describe("caso a quantidade de algum produto seja menor que 1", () => {
    const id = 1;
    const itemsSold = [{ productId: 1, quantity:0 }, { productId: 2, quantity: 5 }];
    beforeEach(() => {
      const allProducts = [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
      ];
      sinon.stub(models.productsModels, "getAllProducts").resolves(allProducts);
      sinon.stub(models.salesModels.newsSales, "dateSale").resolves(id);
      sinon.stub(salesServices, "salesValidator").throws();
      sinon
        .stub(models.salesModels.newsSales, "productSale")
        .onCall(0).resolves(itemsSold)
        .onCall(1).resolves(itemsSold);
    });
    it('lançar um erro com a mensagem: "quantity" must be greater than or equal to 1', async () => {
      try {
        await salesServices.newsSales(itemsSold);
        expect.fail("deveria lançar um erro");
      } catch (err) {
        expect(err.message).to.equals('"quantity" must be greater than or equal to 1');
      }
    });
  });
  describe("caso o registro de venda tenha sido feito corretamento", () => {
    const id = 1;
    const itemsSold = [
      { productId: 1, quantity: 3 },
      { productId: 2, quantity: 5 },
    ];
    beforeEach(() => {
      const allProducts = [
        { id: 1, name: "Martelo de Thor" },
        { id: 2, name: "Traje de encolhimento" },
      ];
      sinon.stub(models.productsModels, "getAllProducts").resolves(allProducts);
      sinon.stub(models.salesModels.newsSales, "dateSale").resolves(id);
      sinon.stub(salesServices, "salesValidator").returns();
      sinon.stub(models.salesModels.newsSales, "productSale")
        .onCall(0).resolves(itemsSold)
        .onCall(1).resolves(itemsSold);
    });
    it("Deve registrar corretamente a venda", async () => {
      const registredSale = await salesServices.newsSales(itemsSold);
      expect(registredSale).to.deep.equals({ id, itemsSold });
    });
  });
});

describe("5 - A chamada Services da função getAllSales deve: ", () => {
  describe("caso a consulta ao banco de dados não retorne nenhum produto", () => {
    before(() => {
      const result = [];
      sinon.stub(models.salesModels, "getAllSales").resolves(result);
    });
    after(() => {
      models.salesModels.getAllSales.restore();
    });

    it("Lançar um erro com a mensagem: Sale not found", async () => {
      try {
        await salesServices.getAllSales();
        expect.fail("deveria lançar um erro");
      } catch (err) {
        expect(err.message).to.equals("Sale not found");
      }
    });
  });

  describe("caso a consulta retorne uma lista de vendas", () => {
    const result = [
      { date: "2022-07-06T15:54:07.000Z", sale_id: 1, product_id: 1, quantity: 5 },
      { date: "2022-07-06T15:54:07.000Z", sale_id: 1, product_id: 2, quantity: 10 },
      { date: "2022-07-06T15:54:07.000Z", sale_id: 2, product_id: 3, quantity: 15 },
    ];
        const serialize = [
      { date: "2022-07-06T15:54:07.000Z", saleId: 1, productId: 1, quantity: 5 },
      { date: "2022-07-06T15:54:07.000Z", saleId: 1, productId: 2, quantity: 10 },
      { date: "2022-07-06T15:54:07.000Z", saleId: 2, productId: 3, quantity: 15 },
    ];

    before(() => {
      sinon.stub(models.salesModels, "getAllSales").resolves(result);
    });
    after(() => {
      models.salesModels.getAllSales.restore();
    });

    it("deve retornar um array contendo a lista", async () => {
      const products = await salesServices.getAllSales();
      expect(products).to.be.an("array").that.deep.equals(serialize);
    });
  });
});

describe("6 - A chamada Services da função getSalesById deve: ", () => {
  describe("caso a consulta ao banco de dados não retorne nenhum produto", () => {
    before(() => {
      const result = [];
      sinon.stub(models.salesModels, "getSalesById").resolves(result);
    });
    after(() => {
      models.salesModels.getSalesById.restore();
    });

    it("Lançar um erro com a mensagem: Sale not found", async () => {
      try {
        await salesServices.getSalesById();
        expect.fail("deveria lançar um erro");
      } catch (err) {
        expect(err.message).to.equals("Sale not found");
      }
    });
  });

  describe("caso a consulta retorne uma lista de vendas", () => {
    const result = [
      { date: "2022-07-06T15:54:07.000Z", product_id: 1, quantity: 5 },
      { date: "2022-07-06T15:54:07.000Z", product_id: 2, quantity: 10 },
    ];
        const serialize = [
      { date: "2022-07-06T15:54:07.000Z", productId: 1, quantity: 5 },
      { date: "2022-07-06T15:54:07.000Z", productId: 2, quantity: 10 },
    ];

    before(() => {
      sinon.stub(models.salesModels, "getSalesById").resolves(result);
    });
    after(() => {
      models.salesModels.getSalesById.restore();
    });

    it("deve retornar um array contendo a lista", async () => {
      const products = await salesServices.getSalesById();
      expect(products).to.be.an("array").that.deep.equals(serialize);
    });
  });
});

describe("9 - A chamada Services da função deleteSales deve:", () => {
  describe("caso o id da venda a ser deletada não seja encontrado", () => {
    const affectedRows = 0;
    const saleId = 1;
    before(() => {
      sinon.stub(models.salesModels, "deleteSales").resolves(affectedRows);
    });
    after(() => {
      models.salesModels.deleteSales.restore();
    });
    it("lançar um erro com a mensagem: Sale not found", async () => {
      try {
        await salesServices.deleteSales(saleId);
        expect.fail("deveria lançar um erro");
      } catch (err) {
        expect(err.message).to.equals("Sale not found");
      }
    });
  });
  describe("caso o id da venda seja encontrado", () => {
    const affectedRows = 1;
    const productId = 1;
    before(() => {
      sinon.stub(models.salesModels, "deleteSales").resolves(affectedRows);
    });
    after(() => {
      models.salesModels.deleteSales.restore();
    });
    it("retornar a quantidade de registro de vendas deletados", async () => {
      const deletedProduct = await salesServices.deleteSales(productId);
      expect(deletedProduct).to.equals(affectedRows);
    });
  });
});
