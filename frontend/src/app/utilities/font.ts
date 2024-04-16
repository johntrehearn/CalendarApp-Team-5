import { Courgette } from 'next/font/google';

// fontTitle uses the Courgette font, and it can be used in different components as an import
const courgette = Courgette({ weight: '400', subsets: ['latin'] });
export const fontTitle = courgette.className;
