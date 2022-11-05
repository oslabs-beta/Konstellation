

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
        id: 'recipes-landing-2048-598f6',
        label: 'recipes-landing-2048-598f6',
        type: 'trace',
      },
      classes: 'label'
    },
    {
      data: {
        id: 'recipes-server-m65321-321fs',
        label: 'recipes-server-m65321-321fs',
        type: 'trace',
      },
      classes: 'label'
    },
    {
      data: {
        id: 'database-321f-dzd2dmf',
        label: 'database-321f-dzd2dmf',
        type: 'trace',
      },
      classes: 'label'
    },
    {
      data: {
        source: 'CLIENT',
        target: 'recipes-landing-2048-598f6',
        type: 'arrow',
        label: '2ms'
      },
      classes: 'background'
    },
    {
      data: {
        source: 'recipes-landing-2048-598f6',
        target: 'recipes-server-m65321-321fs',
        type: 'arrow',
        label: '2ms'
      },
      classes: 'background'
    },
    {
      data: {
        source: 'recipes-server-m65321-321fs',
        target: 'database-321f-dzd2dmf',
        type: 'arrow',
        label: '2ms'
      },
      classes: 'background'
    },
    {
      data: {
        source: 'database-321f-dzd2dmf',
        target: 'recipes-server-m65321-321fs',
        type: 'arrow',
        label: '2ms'
      },
      classes: 'background'
    },
    {
      data: {
        source: 'recipes-server-m65321-321fs',
        target: 'recipes-landing-2048-598f6',
        type: 'arrow',
        label: '2ms'
      },
      classes: 'background'
    },
    {
      data: {
        source: 'recipes-server-m65321-321fs',
        target: 'CLIENT',
        type: 'arrow',
        label: '2ms'
      },
      classes: 'background'
    }
]