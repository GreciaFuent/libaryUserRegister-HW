import User from "./user";
import UserDto from "./user-dto";

export default class UserMapper {
  public toDto(user: User): UserDto {
    const p = user.toPrimitives();
    return new UserDto(
      p.id,
      p.name,
      p.password,
      p.birthDate,
      p.email,
      p.dpi,
      p.phoneNumber
    );
  }

  public toEntity(dto: UserDto): User {
    return User.create(
      dto.id,
      dto.name,
      dto.birthDate,
      dto.password,
      dto.dpi,
      dto.email,
      dto.phoneNumber
    );
  }
}
