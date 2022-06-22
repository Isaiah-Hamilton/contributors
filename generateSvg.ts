import config from "./config.ts"

const generateSvg = (data: any, svgWidth: string, svgHeight: string) => {
  const contributor = data.map((contributor: { login: string, contributions: number, html_url: string, avatar_url: string }) => {
    return {
      login: contributor.login,
      count: contributor.contributions,
      url: contributor.html_url,
      image_url: contributor.avatar_url,
    }
  })

  for (let i = 0; i < contributor.length; i++) {
    let posY: number = config.padding
    let posX: number = config.padding
    let PosY: number
    const overflow: number = parseInt(svgWidth)

    return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${svgWidth}" height="${svgHeight}">
      ${contributor.map((contributors: { login: string, contributions: number, url: string, image_url: string }, i: number) => {
        posX += config.imageWidth + config.padding
        posY = config.padding

        // TODO: fix this math. the 2 second rwo is to close to the first row but the other rows are perfectly aligned
        if (posX >= overflow) {
          posX = config.imageWidth + config.padding
          posY += (config.imageHeight * i)
          PosY = Math.floor((posY / 10) - config.padding)
        }

        return`
        <a xlink:href="${contributors.url}" target="_blank" id="${contributors.login}">
          <image x="${PosY === undefined ? posX - (config.imageWidth + 5) : posX - config.imageWidth}" y="${PosY === undefined ? posY : PosY}" width="${config.imageWidth}" height="${config.imageHeight}" xlink:href="${contributors.image_url}"/>
        </a>
        `
      })}
    </svg>
    `
  }
}

export default generateSvg