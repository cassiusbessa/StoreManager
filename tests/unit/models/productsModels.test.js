const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../helpers/connection');
const productsModels = require("../../../models/productsModels");

describe('1 - A chamada Models da função getAllProducts deve:', ()=>{
  describe('caso não tenham dados no banco, retorna array vazio', ()=>{
    const result = [[]];

    beforeEach(()=>{
      sinon.stub(connection, 'execute').resolves(result);
    });

    afterEach(()=>{
      connection.execute.restore();
    })

    it('retorna um array',  async ()=>{
      const result = await productsModels.getAllProducts();
      expect(result).to.be.an('array');
    })
  });
  describe('caso tenham dados no banco, retorna array de objetos com os dados', ()=>{
    describe('o objeto tem as chaves id e name', ()=>{      
      const result = [[{name:'Product', id:1}]];
      beforeEach(()=>{
        sinon.stub(connection, 'execute').resolves(result);
      });
      afterEach(()=>{
        connection.execute.restore();
      })
      it('retorna um array',  async ()=>{
        const result = await productsModels.getAllProducts();
        expect(result).to.be.an('array');
      })
      it('o objeto dentro do array tem as chaves id e name',  async ()=>{
        const [result] = await productsModels.getAllProducts();
        expect(result).to.includes.all.keys('id', 'name');
      })
    })
  });
})

describe("2 - A chamada Models da função getProductsById deve:", () => {
  describe("caso não o id não exisde nos dados do banco, retorna array vazio", () => {
    const result = [[]];

    beforeEach(() => {
      sinon.stub(connection, "execute").resolves(result);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it("retorna um array", async () => {
      const result = await productsModels.getProductById();
      expect(result).to.be.an("array");
    });
  });
  describe("caso tenha o id nos dados do banco, retorna array de objetos com o único produto", () => {
    describe("o objeto tem as chaves id e name", () => {
      const result = [[{ name: "Product", id: 1 }]];
      beforeEach(() => {
        sinon.stub(connection, "execute").resolves(result);
      });
      afterEach(() => {
        connection.execute.restore();
      });
      it("retorna um array", async () => {
        const result = await productsModels.getProductById();
        expect(result).to.be.an("array");
      });
      it("o objeto dentro do array tem as chaves id e name", async () => {
        const [result] = await productsModels.getProductById();
        expect(result).to.includes.all.keys("id", "name");
      });
    });
  });
});