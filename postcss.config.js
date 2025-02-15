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
        'last 10 Chrome versions',
        'last 10 Firefox versions',
        'last 10 Safari versions',
        'iOS >= 15',
        '> 0.5%',
        'not dead',
      ],
    },
  },
}
