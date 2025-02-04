export default {
  plugins: {
    'autoprefixer': {},
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
        'Chrome >= 60',
        'Firefox >= 60',
        'Safari >= 12',
        'iOS >= 12',
        'not IE 11'
      ],
    },
  },
};