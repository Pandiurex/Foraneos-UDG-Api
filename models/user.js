class User {
  constructor(data) {
    this.id = data.id;
    this.mainEmailId = data.mainEmailId;
    this.user_type = data.userType;
    this.username = data.username;
    this.password = data.password;
    this.name = data.name;
    this.fistSurname = data.fistSurname;
    this.secondSurname = data.secondSurname;
    this.profileImage = data.profileImage;
    this.birthdate = data.birthdate;
    this.gender = data.gender;
  }

  setMainEmail(email) {
    this.mainEmail = email;
  }

  setSecondaryEmails(emails) {
    this.secondaryEmails = emails;
  }
}

module.exports = User;
