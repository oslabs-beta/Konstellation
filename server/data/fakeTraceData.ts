

export default [
    {
      data: {
        id: 'CLIENT',
        label: 'CLIENT',
        type: 'client',
      }
    },
    {
      data: {
        id: 'recipes-front-end',
        label: 'recipes-front-end',
        type: 'pod',
      }
    },
    {
      data: {
        id: 'recipes-back-end',
        label: 'recipes-back-end',
        type: 'pod',
      }
    },
    {
      data: {
        id: 'database',
        label: 'database',
        type: 'pod',
      }
    },
    {
      data: {
        source: 'CLIENT',
        target: 'recipes-front-end',
        type: 'arrow'
      }
    },
    {
      data: {
        source: 'recipes-front-end',
        target: 'recipes-back-end',
        type: 'arrow'
      }
    },
    {
      data: {
        source: 'recipes-back-end',
        target: 'database',
        type: 'arrow',
      }
    },
    {
      data: {
        source: 'database',
        target: 'recipes-back-end',
        type: 'arrow',
      }
    },
    {
      data: {
        source: 'recipes-back-end',
        target: 'recipes-front-end',
        type: 'arrow',
      }
    },
    {
      data: {
        source: 'recipes-back-end',
        target: 'CLIENT',
        type: 'arrow',
      }
    }
]