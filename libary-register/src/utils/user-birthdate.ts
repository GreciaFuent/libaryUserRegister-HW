export default class UserBirthDate {
  public value: Date;

  constructor(value: Date) {
    this.isValid(value);
    this.value = value;
  }

  private isValid(value: Date) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error("Invalid birth date");
    }
  }
}
