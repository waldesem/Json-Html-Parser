import purgeCSSPlugin from '@fullhuman/postcss-purgecss'

const isProduction = process.env.NODE_ENV === 'production'

const plugins = []

if (isProduction) {
  plugins.push(
    purgeCSSPlugin({
      content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
      safelist: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^router-link(|-exact)-active$/,
        /data-v-.*/,
      ],
    }),
  )
}

export default {
  plugins,
}
