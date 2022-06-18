import config from "./config.ts"

const generateSvg = (contributor: any, svgWidth: string, svgHeight: string) => {
  if (contributor.length > 50) {
    config.avatarWidth = 48
    config.padding = 3
  }

  if (contributor.length > 100) {
    config.avatarWidth = 24
    config.padding = 2
  }

  for (let i = 0; i < contributor.length; i++) {
    let posY: number = config.padding
    let posX: number = config.padding
    let newPosY: number
    const overflow: number = parseInt(svgWidth)

    return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${svgWidth}" height="${svgHeight}">
      ${contributor.map((contributors: { login: string, contributions: number, url: string, avatar_url: string }, i: number) => {
        posX += config.avatarHeight + config.padding
        posY = config.padding

        if (posX >= overflow) {
          posX = config.avatarHeight + config.padding
          posY += (config.avatarHeight * i) + config.padding
          newPosY = Math.floor(posY / 10)
        }

        console.log(posX, newPosY === undefined ? posY : newPosY)

        return`
        <a xlink:href="${contributors.url}" target="_blank" id="${contributors.login}">
          <image x="${posX - 64}" y="${newPosY === undefined ? posY : newPosY}" width="${config.avatarWidth}" height="${config.avatarHeight}" xlink:href="${contributors.avatar_url}"/>
        </a>
        `
      })}
    </svg>
    `
  }

}

export default generateSvg