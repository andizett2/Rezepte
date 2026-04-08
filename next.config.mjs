/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'm2hzveg714qhmtob.public.blob.vercel-storage.com',
			},
		],
	},
};

export default nextConfig;
