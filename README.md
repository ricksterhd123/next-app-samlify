# next-app-samlify

A proof of concept for using AWS SSO with Next.js

Many thanks to [tigaron](https://github.com/tigaron) who provided example using page router.
I've re-adapted his example with app router instead.

## AWS Identity Center SAML2 single logout
AWS Identity Center does not support SAML2 single logout in the service provider metadata

i.e. `<md:SingleLogoutService>` gets ignored
```xml
<md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="http://localhost:3000/api/logout/callback"/>
```

## Getting Started

### Setup AWS SSO SP
I used https://www.samltool.com/sp_metadata.php with `openssl genrsa -out server.pem 2048`

### Setup AWS SSO IDP
TODO

### Setup `.env` file

## Credits
- https://github.com/tigaron/nextjs-samlify
