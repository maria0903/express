const { getRandomCatImage, getRandomDogImage } =
  require('../service/index.service');

const LIMIT = 10;

/**
 * @typedef {[
 *  import('express').Request,
 *  import('express').Response,
 *  import('express').NextFunction
 * ]} ExpressArgument
 */

/**
 * @typedef {'cat'|'dog'} AnimalType
 */

/**
 * @param {AnimalType} type
 * @param {string[]} elements
 */
const createBody = (type, elements) => `
<header style="display: flex; gap: 1rem;">
  <a href="/">Home</a>
  <a href="/generate/${type}?limit=1">Create 1</a>
  <a href="/generate/${type}?limit=10">Create 10</a>
</header>
<div class="center">
  <h3>Generated!</h3>
  ${elements.join('')}
</div>
`

module.exports = {
  /**
   * @param {ExpressArgument} rest
   */
  GenerateCat: async (...rest) => {
    const [req, res] = rest;
    const params = {};

    if (Object.keys(req.query).length && req.query.limit) {
      if (req.query.limit > LIMIT) {
        res.status(400).send('Limit is too high');

        return;
      }

      params.limit = req.query.limit;
    }
    const result = await getRandomCatImage(params);
    const elements = result.map((cat) => {
      const aspectRatio = cat.width > cat.height
        ? cat.height / cat.width
        : cat.width / cat.height;
      const width = 320;

      return `
        <img
            src="${cat.url}"
            alt="${cat.id}"
            style="
              width: ${cat.width}px;
              height: ${cat.height}px;
              max-width: ${width}px;
              max-height: ${(aspectRatio) * width}px;
            "
        />
      `
    });

    res.status(200).send(`
        <html>
            <head>
              <title>Cat</title>
              <style>
                a {
                    color: black;
                }
                .center {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                }
              </style>
            </head>
            <body class="center">
              <h3 style="display: flex; gap: .5rem;">
                ${req.originalUrl.split('?')[0].split('/').map((char, idx) => {
                  return `<span>${char}</span>`
                }).join('<span style="color: #a19a9a;">/</span>')}
              </h3>
              ${createBody('cat', elements)}
            </body>
        </html>
    `)
  },

  /**
   * @param {ExpressArgument} rest
   */
  GenerateDog: async (...rest) => {
    const [req, res] = rest;
    const params = {};

    if (Object.keys(req.query).length && req.query.limit) {
      if (req.query.limit > LIMIT) {
        res.status(400).send('Limit is too high');

        return;
      }

      params.limit = req.query.limit;
    }
    const result = await getRandomDogImage(params);
    const elements = result.message.map((url, idx) => {
      return `
        <img
            src="${url}"
            alt="dog-${idx}"
            style="max-width: 50%;"
        />
      `
    });
    res.status(200).send(`
        <html>
            <head>
              <title>Dog</title>
              <style>
                a {
                    color: black;
                }
                .center {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                }
              </style>
            </head>
            <body class="center">
              <h3 style="display: flex; gap: .5rem;">
                ${req.originalUrl.split('?')[0].split('/').map((char, idx) => {
                  return `<span>${char}</span>`
                }).join('<span style="color: #a19a9a;">/</span>')}
              </h3>
              ${createBody('dog', elements)}
            </body>
        </html>
    `)
  }
}