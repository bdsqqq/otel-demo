/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // Enable the instrumentation hook for collecting telemetry data
        instrumentationHook: true,
      },
      webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback = {
            // Disable the 'tls' module on the client side
            tls: false,
          };
        }
        return config;
      },
};

export default nextConfig;
