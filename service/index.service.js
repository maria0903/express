const axios = require('axios');
const endpointCat = 'https://api.thecatapi.com/v1/images/search';
const endpointDog = 'https://dog.ceo/api/breeds/image/random';

/**
 * @typedef {Object} RandomCatImage
 * @property {string} id
 * @property {string} url
 * @property {number} width
 * @property {number} height
 */

/**
 * @typedef {Object} RandomDogImage
 * @property {Object[]} RandomDogImage.message
 * @property {string} RandomDogImage.message.url
 */

const LIMIT = 1;

module.exports = {
  /**
   * @param {Object} params
   * @param {number | undefined} params.limit
   * 
   * @returns {Promise<RandomCatImage[]>}
   */
  getRandomCatImage: async (params) => {
    const url = new URL(endpointCat);
    /**
     * @type {import('axios').AxiosRequestConfig}
     */
    const option = {
      params: {
        limit: Number(params.limit) || LIMIT,
        api_key: process.env.CAT_API_KEY,
      }
    }

    const response = await axios.get(url, option)
      .catch(async (error) => {
        delete option.params.api_key;
        return await axios.get(url, option);
    });

    if (response && response?.status === 200) {
      return response.data;
    }

    throw new Error('Failed to get random cat image');
  },

  /**
   * 
   * @param {*} params 
   * @returns {Promise<RandomDogImage>}
   */
  getRandomDogImage: async (params) => {
    const url = endpointDog + `/${params.limit || LIMIT}`
    const response = await axios.get(url);

    if (response && response?.status === 200) {
      return response.data;
    }

    throw new Error('Failed to get random dog image');
  }
}