import Joi from "joi";

const cardSchema = Joi.object({
  number: Joi.string().required(),
  cardholderName: Joi.string().required(),
  securityCode: Joi.string().required(),
  expirationDate: Joi.string().required(),
  password: Joi.string().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.valid("debit", "credit", "mutiple").required(),
  title: Joi.string().required(),
});

export default cardSchema;
