import bcrypt from 'bcryptjs';

const hash = password => bcrypt.hashSync(password, 10);

const checkPassword = (password, hash) => bcrypt.compareSync(password, hash);
export { hash, checkPassword };
