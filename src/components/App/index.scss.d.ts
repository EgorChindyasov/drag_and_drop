declare namespace IndexScssNamespace {
  export interface IIndexScss {
    'app': string;
    'board': string;
    'boardTitle': string;
    'item': string;
  }
}

declare const IndexScssModule: IndexScssNamespace.IIndexScss;

export = IndexScssModule;