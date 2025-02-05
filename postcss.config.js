export default {
  plugins: {
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true,
      },
      browsers: [
        'last 5 Chrome versions',
        'last 5 Firefox versions',
        'last 5 Safari versions',
        'iOS >= 12',
        '> 0.5%',
        'not dead',
        'not ie 11',
      ],
    },
  },
};
