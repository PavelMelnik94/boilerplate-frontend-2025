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
        'last 2 versions',
        '> 1%',
        'not dead',
        'Chrome >= 100',
        'Firefox >= 110',
        'Safari >= 16',
        'iOS >= 16',
        'not IE 11',
      ],
    },
  },
};
