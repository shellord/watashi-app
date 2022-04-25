const backgroundColors = {
  red: 'FF0000',
  orange: 'FFA500',
  yellow: 'FFFF00',
  green: '008000',
  blue: '0000FF',
  indigo: '4B0082',
  violet: 'EE82EE',
}

const textColor = 'FFFFFF'

const getRandomColor = () => {
  const keys = Object.keys(backgroundColors)
  const randomKey = keys[
    Math.floor(Math.random() * keys.length)
  ] as keyof typeof backgroundColors
  return backgroundColors[randomKey]
}

export const generateAvatar = (name: string) => {
  const color = getRandomColor()
  return `https://ui-avatars.com/api/?background=${backgroundColors}&name=${name}&size=128&length=1&color=${textColor}`
}
