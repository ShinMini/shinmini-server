import { createCipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

const ENCRYPT_ALGORITHM = process.env.ENCRYPT_ALGORITHM
const ENCRYPT_SALT = process.env.ENCRYPT_SALT
const ENCRYPT_KEY_PASSWORD = process.env.ENCRYPT_KEY_PASSWORD

const iv = randomBytes(16)

const genKey = () => {
  return promisify(scrypt)(
    ENCRYPT_KEY_PASSWORD,
    ENCRYPT_SALT,
    32
  ) as Promise<Buffer>
}

class Encrypt {
  private key: Buffer

  constructor() {
    ;(async () => {
      this.key = await genKey()
    })()
  }

  encrypting(text: string) {
    const cipher = createCipheriv(ENCRYPT_ALGORITHM, this.key, iv)
    const encryptedText = Buffer.concat([cipher.update(text), cipher.final()])

    return encryptedText
  }

  decrypting(encryptedText: Buffer) {
    const decipher = createCipheriv(ENCRYPT_ALGORITHM, this.key, iv)
    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ])

    return decryptedText
  }
}

export default Encrypt
