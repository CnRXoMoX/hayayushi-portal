/** @type {import('next').NextConfig} */

module.exports = {
    env: {
        API_URL: process.env.API_URL,
        JWT_KEY: process.env.JWT_KEY
    }
}
