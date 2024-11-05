import * as samlify from 'samlify';

samlify.setSchemaValidator({
  validate: (response) => {
    return Promise.resolve('skipped');
  }
});

const IDP_METADATA = Buffer.from(process.env.IDP_METADATA, 'base64');
const SP_METADATA = Buffer.from(process.env.SP_METADATA, 'base64');

export const idp = samlify.IdentityProvider({
  metadata: IDP_METADATA,
});

export const sp = samlify.ServiceProvider({
  metadata: SP_METADATA
});
