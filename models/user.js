class User {
  constructor(data) {
    this.id = data.id;
    this.mainEmailId = data.mainEmailId;
    this.active = data.active;
    this.userType = data.userType;
    this.username = data.username;
    this.password = data.password;
    this.name = data.name;
    this.firstSurname = data.firstSurname;
    this.secondSurname = data.secondSurname;
    this.profileImage = data.secondSurname;
    this.birthdate = data.birthdate;
    this.gender = data.gender;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  setMainEmail(email) {
    this.mainEmail = email;
  }

  setSecondaryEmails(emails) {
    this.secondaryEmails = emails;
  }
}

module.exports = User;
