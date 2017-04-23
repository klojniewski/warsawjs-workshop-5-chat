# Message format

## Chat Message

{
    body: String,
    from: String
}

## Login message

{
    login: String,
    password: String
}

## Commands

/login username password

# API

Authenticator {
    validate (login, password) : Promise<boolean>;
}
