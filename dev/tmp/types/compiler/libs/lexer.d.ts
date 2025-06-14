import { Token } from "../../const/types";
export declare class Lexer {
    private source;
    private pos;
    private currentChar;
    private keywords;
    constructor(source: string);
    private advance;
    private peek;
    private string;
    private number;
    private skipWhitespace;
    private identifier;
    tokenize(): Token[];
}
