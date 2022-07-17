import Joi from "joi";

const wifiSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  title: Joi.string().required(),
});

export default wifiSchema;
