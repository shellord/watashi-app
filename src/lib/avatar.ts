import crypto from 'crypto'

export const generateAvatar = (name: string) => {
  //   const hash = crypto.createHash('md5').update(name).digest('hex')
  //   return `https://www.gravatar.com/avatar/${hash}?d=retro`
  return `https://ui-avatars.com/api/?background=random&name=${name}&size=128`
}
