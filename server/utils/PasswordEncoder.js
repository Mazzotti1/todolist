// Alteração no arquivo PasswordEncoder.js
import { hash, compare } from 'bcrypt';

export async function hashPassword(plainPassword) {
    const saltRounds = 10;
    const hashedPassword = await hash(plainPassword, saltRounds);
    return hashedPassword;
}

export async function checkPassword(plainPassword, hashedPassword) {
    const isMatch = await compare(plainPassword, hashedPassword);
    return isMatch;
}
