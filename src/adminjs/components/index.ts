import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  ColorPicker: componentLoader.add('colorPicker', './color-picker/index.tsx'),
  Dashboard: componentLoader.add('Dashboard', './dashboard/index.tsx'),
  // other custom components
};

export { componentLoader, Components };
