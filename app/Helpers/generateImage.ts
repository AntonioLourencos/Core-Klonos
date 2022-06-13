import Sharp from 'sharp'

const randomColor = () => {
  const RandomInt = () => Math.floor(Math.random() * 255)

  return { r: RandomInt(), g: RandomInt(), b: RandomInt() }
}

const GenerateImage = async (username: string) => {
  const svgImage = Buffer.from(`
    <svg width="300" height="300px">
      <style>
      .title { fill: #ffffff; font-size: 180px; font-weight: bold;}
      </style>
      <text x="33%" y="70%" class="title">${username[0]}</text>
    </svg>
    `)

  const Image = Sharp({
    create: {
      width: 300,
      height: 300,
      channels: 4,
      background: randomColor(),
    },
  })
    .composite([
      {
        input: svgImage,
      },
    ])
    .png()
    .toBuffer()

  return Image
}

export default GenerateImage
