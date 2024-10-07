import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development', // or 'production' depending on your needs
  entry: './src/index.js', // Update this with your actual entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node', // This tells Webpack to compile for Node.js
  externals: {
    fs: 'commonjs fs', // Treat fs as an external module
  },
  module: {
    rules: [
      {
        test: /\.html$/, // This will match any HTML files
        use: ['html-loader'], // Use html-loader to handle HTML files
      },
      // Add other loaders if needed (e.g., for CSS or images)
    ],
  },
  // Add plugins if necessary
};
