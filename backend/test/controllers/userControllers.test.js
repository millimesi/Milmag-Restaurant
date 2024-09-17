import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';
import { register } from '../../controllers/userController.js';
import request from "supertest";
import { app, startServer } from '../../app.js';

const { TESTPORT } = process.env;

describe('User Controller', () => {
    let req, res, findOneStub, createStub, hashStub, signStub, saveStub, compareStub;

    beforeEach(async () => {

      // mock objects
      req = {
        body: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'b@cd.ff',
          phoneNumber: '+1801234-5678',
          password: 'Password@1'
        }
      };

      res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub().returnsThis(),
        json: sinon.stub().returnsThis(),
        cookie: sinon.stub().returnsThis(),
      };

      // Stub Methods
      findOneStub = sinon.stub(User, 'findOne');
      createStub = sinon.stub(User, 'create');
      hashStub = sinon.stub(bcrypt, 'hash');
      compareStub = sinon.stub(bcrypt, 'compare');
      signStub = sinon.stub(jwt, 'sign');
      saveStub = sinon.stub().resolves();
    });

    afterEach(() => {
      // Restore original methods
      sinon.restore();
      // server.close();
    });

    describe('Register User', () => {
      it('should register a user', async () => {
        findOneStub.resolves(null); // No existing user
        hashStub.resolves('encryptedPassword');
        createStub.resolves({ id: 1, ...req.body, token: 'token', save: saveStub });
        signStub.returns('jwt_token');

        await register(req, res);

        expect(res.status.calledWith(201)).to.be.true;
        expect(res.json.calledWithMatch({ ...req.body, password: undefined, token: 'jwt_token' })).to.be.true;
        expect(res.cookie.calledOnce).to.be.true;
      });
    });
});
