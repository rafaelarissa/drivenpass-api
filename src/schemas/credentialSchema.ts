import Joi from "joi";

const credentialSchema = Joi.object({
  url: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  title: Joi.string().required(),
});

export default credentialSchema;
