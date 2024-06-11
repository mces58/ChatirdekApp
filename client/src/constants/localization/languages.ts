import enJson from './en.json';
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
];

export default Languages;
