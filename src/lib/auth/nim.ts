// Better Auth requires a unique email per user. Accounts sign in with NIM, so each
// account gets a placeholder address on the reserved .invalid TLD (it can never receive mail).
export function nimToEmail(nim: string) {
  return nim.trim().toLowerCase() + "@pjbl.invalid";
}
