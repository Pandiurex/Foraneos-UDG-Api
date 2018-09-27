class User {
  constructor(data) {
    this.id = data.id;
    this.main_email_id = data.main_email_id;
    this.user_type = data.user_type;
    this.username = data.username;
    this.password = data.password;
  }

  setMainEmail(email) {
    this.mainEmail = email;
  }

  setSecondaryEmails(emails) {
    this.secondaryEmails = emails;
  }
}

module.exports = User;
