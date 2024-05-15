import enJson from './en.json';
import esJson from './es.json';
import trJson from './tr.json';

export interface Language {
  code: string;
  name: string;
  file: Record<string, string>;
}

const Languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    file: enJson,
  },
  {
    code: 'tr',
    name: 'Türkçe',
    file: trJson,
  },
  {
    code: 'es',
    name: 'Español',
    file: esJson,
  },
];

export default Languages;
