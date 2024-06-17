/** @type {import('next').NextConfig} */
export const reactStrictMode = false
export async function redirects() {
    return [
        {
            source: '/',
            destination: '/login',
            permanent: true,
        },
    ]
}
