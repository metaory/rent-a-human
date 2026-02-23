/** @type {import('next').NextConfig} */
const basePath = process.env.GITHUB_REPOSITORY
	? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
	: "";

const nextConfig = {
	output: "export",
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
	},
	...(basePath && { basePath, assetPrefix: `${basePath}/` }),
};

export default nextConfig;
