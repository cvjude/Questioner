import bcrypt from 'bcryptjs';

const hash = password => bcrypt.hashSync(password, 10);

const checkPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}
export { hash, checkPassword };
