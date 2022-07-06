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
