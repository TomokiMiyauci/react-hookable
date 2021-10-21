import type { ExtendedArgType } from '@story/shared/types'

const deps: ExtendedArgType = {
  description:
    'If present, effect will only activate if the values in the list change',
  table: {
    category: 'args',
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
    category: 'args',
    subcategory: '[2]',
    type: {
      summary: '(() => Maybe<boolean>) | undefined'
    }
  }
}

export { deps, condition }
