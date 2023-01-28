/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	webpack(config) {
		config.module.rules.push({
			loader: "@svgr/webpack",
			issuer: /\.[jt]sx?$/,
			options: {
				prettier: true,
				svgo: true,
				svgoConfig: {
					plugins: [
						{
							name: "preset-default",
							params: {
								override: {
									removeViewBox: false
								}
							}
						}
					]
				},
				titleProp: true
			},
			test: /\.svg$/
		});
		return config;
	}
};

module.exports = nextConfig;
