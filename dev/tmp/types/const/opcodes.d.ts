export declare enum OpCode {
    PUSH_CONST = 0,
    PUSH_NULL = 1,
    ADD = 2,
    SUBTRACT = 3,
    MULTIPLY = 4,
    DIVIDE = 5,
    EQUAL = 6,
    NOT_EQUAL = 7,
    GREATER_THAN = 8,
    LESS_THAN = 9,
    NEGATE = 10,// ! (not)
    POP = 11,// 式文の結果を捨てる
    DEFINE_GLOBAL = 12,
    GET_GLOBAL = 13,
    SET_GLOBAL = 14,
    GET_LOCAL = 15,
    SET_LOCAL = 16,
    JUMP = 17,
    JUMP_IF_FALSE = 18,
    CALL = 19,
    RETURN = 20,
    CALL_BUILTIN = 21
}
