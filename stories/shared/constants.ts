import type { ExtendedArgType, TableArgTypePolyfill } from '@story/shared/types'

const category: TableArgTypePolyfill['category'] = 'args'
const subcategory0: TableArgTypePolyfill['subcategory'] = '[0]{ options }'

const deps: ExtendedArgType = {
  description:
    'If present, effect will only activate if the values in the list change',
  table: {
    category,
    subcategory: '[1]',
    type: {
      summary: 'DependencyList | undefined'
    }
  }
}

const condition: ExtendedArgType = {
  description:
    'The conditional function that effect or not. If return `true` effect, otherwise not.',
  table: {
    category,
    subcategory: '[2]',
    type: {
      summary: '(() => Maybe<boolean>) | undefined'
    }
  }
}

export { deps, condition, category, subcategory0 }
