export default [
  {
    data: {
      id: 'CLIENT',
      label: 'CLIENT',
      type: 'client',
    },
  },
  {
    data: {
      id: 'recipes-landing-2048-598f6',
      label: 'recipes-landing-2048-598f6',
      type: 'trace',
    },
    classes: 'label',
  },
  {
    data: {
      id: 'recipes-server-m65321-321fs',
      label: 'recipes-server-m65321-321fs',
      type: 'trace',
    },
    classes: 'label',
  },
  {
    data: {
      id: 'database-321f-dzd2dmf',
      label: 'database-321f-dzd2dmf',
      type: 'trace',
    },
    classes: 'label',
  },
  {
    data: {
      id: 'dj2i1joiod-=ui9d201jido',
      source: 'CLIENT',
      target: 'recipes-landing-2048-598f6',
      type: 'arrow',
      label: '13ms',
    },
    classes: 'background',
  },
  {
    data: {
      id: 'jd21jkdlsjkal-dj2iodjskla',
      source: 'recipes-landing-2048-598f6',
      target: 'recipes-server-m65321-321fs',
      type: 'arrow',
      label: '9ms',
    },
    classes: 'background',
  },
  {
    data: {
      id: 'djkslajd2ijdklnvhjkcsx890',
      source: 'recipes-server-m65321-321fs',
      target: 'database-321f-dzd2dmf',
      type: 'arrow',
      label: '37ms',
    },
    classes: 'background',
  },
  {
    data: {
      id: 'djkslajd2ijdklnvhjkcsx890-fjiew0ojiod',
      source: 'database-321f-dzd2dmf',
      target: 'recipes-server-m65321-321fs',
      type: 'arrow',
      label: '6ms',
    },
    classes: 'background',
  },
  {
    data: {
      id: 'djkslajd2ijdklnvhjkcsx890-hur291hfdj2321',
      source: 'recipes-server-m65321-321fs',
      target: 'recipes-landing-2048-598f6',
      type: 'arrow',
      label: '14ms',
    },
    classes: 'background',
  },
  {
    data: {
      id: 'djkslajd2ijdklnvhjkcsx890-jfi09882bncxzki',
      source: 'recipes-server-m65321-321fs',
      target: 'CLIENT',
      type: 'arrow',
      label: '7ms',
    },
    classes: 'background',
  },
];
