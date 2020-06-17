# Choirless Inivitations API
An API for creating and getting invitations to choirs for the Choirless platform.

## Routes

### Check an invitation
`[GET] /check/:INVITEID?apikey=<CHOIRLESS_INVITATION_API_KEY>`

Checks whether a known invitation is valid and will return details for that invitation.

#### Success response:

```
{
    "status": "ok",
    "invitation": {
        "creator": "CHOIRLESS USER ID",
        "choirId": "CHOIRLESS CHOIR ID",
        "invitee": "user@example.org", // The recipient of the invitation.
        "expires": 1592451120993, // Expiration time in millseconds (Unixtime).
        "id": "001jlOnw4eA4ai2WFx8m0cW5c64IjGqw" // Invitation ID
    }
}
```

If an invitation exists but the expiration time has passed the following will be returned with a status code of 489. The expired invitation will also be purged from the database.

#### Expired response:

```json
{
    "status": "err",
    "message": "Invitation \"<INVITE ID>\" has expired"
}
```

If an invitation with the passed `INVITE ID` is not found, the following will be returned with a status code of **498**;

#### Invalid response

```json
{
    "status": "err",
    "message": "Invitation \"<INVITE ID>\" was not found"
}
```

### Create an invitation
`[POST] /create/?apikey=<CHOIRLESS_INVITATION_API_KEY>`

Creates a new invitation to a users choir in the Choirless platform.

#### Required properties

```json
{
    "creator" : "<CHOIRLESS USER ID>",
    "invitee" : "user@example.org",
    "cnoirId" : "<CHOIRLESS CHOIR ID>"
}
```

If the request is successful, a new invitation will be created and the ID of that invitation returned to the client.

#### Success Response

```json
{
    "status": "ok",
    "id": "<INVITE ID>"
}
```

If required properties are missing from the creation request, the following response will be passed with status code of **422**.

#### Missing Parameters Response

```json
{
    "status": "err",
    "message": "Parameters missing from invitation creation \"<LIST OF MISSING PARAMETERS>\""
}
```

### Get a key for this API.
`[GET] /keys`

This is a small HTML page that will enable the user to create an API key for this service if they're included on the whitelist.