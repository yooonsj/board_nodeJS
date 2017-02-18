module.exports = {
    insert: "INSERT INTO USER (email, name, password) VALUES ('{{email}}', '{{name}}', '{{password}}')",
    select: "SELECT name, password FROM USER WHERE email = '{{email}}'"
};
