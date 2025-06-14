export enum OpCode {
	// 定数と変数
	PUSH_CONST,
	PUSH_NULL,

	// 算術演算
	ADD,
	SUBTRACT,
	MULTIPLY,
	DIVIDE,

	// 比較演算
	EQUAL,
	NOT_EQUAL,
	GREATER_THAN,
	LESS_THAN,

	// 論理演算
	NEGATE, // ! (not)

	// 文と式
	POP, // 式文の結果を捨てる

	// 変数操作
	DEFINE_GLOBAL,
	GET_GLOBAL,
	SET_GLOBAL,
	GET_LOCAL,
	SET_LOCAL,

	// 制御フロー
	JUMP,
	JUMP_IF_FALSE,

	// 関数
	CALL,
	RETURN,

	// 外部連携
	CALL_BUILTIN,
}
