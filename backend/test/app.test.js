import chai from "chai";
import sinon from "sinon";
import request from "supertest";
import sequelize from "../utils/dbConfig.js";
import app from "../app.js";
import db from "../models/indexModel.js";

const { expect } = chai;

describe('Database and Express Tests', () => {

  // Test Database Sync
  describe('Database sync', () => {

    let syncStub; // Stub Sequelize's sync method to simulate success/failure

    before(() => {
      // Stub sequelize.sync before each test
      syncStub = sinon.stub(sequelize, 'sync').resolves();  // Mock successful sync
    });

    after(() => {
      // Restore the original sync function after tests
      syncStub.restore();
    });

    it('should connect database and sync it', async () => {
      try {
        await db.syncDb();  // Run the syncDb function

        expect(syncStub.calledOnce).to.be.true;  // Ensure the sync method was called
        console.log('Database & tables synced');
      } catch (err) {
        expect.fail('Failed to sync db: ' + err.message);
      }
    });
  });

  // Test Express Server
  describe('Express Server Test', () => {
    it('should respond with "Server is running" on GET /', (done) => {
      request(app)
        .get('/')
        // .expect('Milmag Restaurant Application')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Milmag Restaurant Application');
          done();
        });
    });
  });
});
