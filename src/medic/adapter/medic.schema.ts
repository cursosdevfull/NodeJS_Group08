import Joi from 'joi';

export const schemas = {
  INSERT: {
    body: Joi.object({
      name: Joi.string().required(),
      paternal_surname: Joi.string().required(),
      maternal_surname: Joi.string().required(),
      cmp: Joi.number().min(2000).max(4000).required(),
      document: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,12}$'))
        .required(),
      typeDocument: Joi.number().valid(1, 2, 3).required(),
    }),
  },
  UPDATE: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
    body: Joi.object({
      name: Joi.string(),
      paternal_surname: Joi.string(),
      maternal_surname: Joi.string(),
      cmp: Joi.number().min(2000).max(4000),
      document: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,12}$')),
      typeDocument: Joi.number().valid(1, 2, 3),
    }),
  },
};

/* --------------------------------
      name: body.name,
      paternal_surname: body.paternal_surname,
      maternal_surname: body.maternal_surname,
      cmp: body.cmp,
      document: body.document,
      typeDocument: body.typeDocument,

*/
