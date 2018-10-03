class User {
  constructor(data) {
    if (data.id !== undefined) { this.id = data.id; }
    if (data.mainEmailId !== undefined) { this.mainEmailId = data.mainEmailId; }
    if (data.userType !== undefined) { this.userType = data.userType; }
    if (data.username !== undefined) { this.username = data.username; }
    if (data.password !== undefined) { this.password = data.password; }
    if (data.name !== undefined) { this.name = data.name; }
    if (data.firstSurname !== undefined) { this.firstSurname = data.firstSurname; }
    if (data.secondSurname !== undefined) { this.secondSurname = data.secondSurname; }
    if (data.profileImage !== undefined) {
      if (typeof data.profileImage === 'string') {
        this.profileImage = Buffer.from(data.profileImage);
      } else {
        this.profileImage = JSON.stringify(data.profileImage);
      }
    }
    if (data.birthdate !== undefined) {
      this.birthYear = data.birthdate.getFullYear();
      this.birthMonth = data.birthdate.getMonth();
      this.birthDay = data.birthdate.getDay();
    }
    if (data.birthYear !== undefined) { this.birthYear = data.birthYear; }
    if (data.birthMonth !== undefined) { this.birthMonth = data.birthMonth; }
    if (data.birthDay !== undefined) { this.birthDay = data.birthDay; }
    if (data.gender !== undefined) { this.gender = data.gender; }
  }

  setMainEmail(email) {
    this.mainEmail = email;
  }

  setSecondaryEmails(emails) {
    this.secondaryEmails = emails;
  }
}

module.exports = User;
