declare function parse(value: string): parse.ParsedMetaRefresh;

declare namespace parse {
    interface ParsedMetaRefresh {
        timeout: number | null;
        url: string | null;
    }
}

export = parse;
