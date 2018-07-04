import {Platform} from 'react-native';

const fontSettings = {
  weights: {
    Bold: '700',
    SemiBold: '600',
    Light: '300',
    Medium: '500',
    Normal: '400'
  },
  styles: {
    Italic: 'italic'
  }
};

const fonts = {
  'Exo2': fontSettings,
  'Exo 2': fontSettings,
};

const fontMaker = (options = {}) => {
  let { weight, style, family } = Object.assign({
    weight: null,
    style: null,
    family: Platform.OS === 'android' ? 'Exo2' : 'Exo 2',
  }, options);

  const { weights, styles } = fonts[family];

  if (Platform.OS === 'android') {
    weight = weights[weight] ? weight : '';
    style = styles[style] ? style : '';

    const suffix = weight + style;

    return {
      fontFamily: family + (suffix.length ? `-${suffix}` : '')
    };
  } else {
    weight = weights[weight] || weights.Normal;
    style = styles[style] || 'normal';

    return {
      fontFamily: family,
      fontWeight: weight,
      fontStyle: style
    };
  }
};

export {
  fontMaker,
};
