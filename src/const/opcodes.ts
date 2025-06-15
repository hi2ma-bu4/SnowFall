export enum OpCode {
	// 定数と変数
	PUSH_CONST,
	PUSH_NULL,

	// Boolean値
	PUSH_TRUE,
	PUSH_FALSE,

	// 算術演算
	ADD,
	SUBTRACT,
	MULTIPLY,
	DIVIDE,
	MODULO,

	// 比較演算
	EQUAL,
	NOT_EQUAL,
	GREATER_THAN,
	GREATER_EQUAL,
	LESS_THAN,
	LESS_EQUAL,

	// 論理・ビット演算
	NEGATE, // ! (not)
	BITWISE_AND,
	BITWISE_OR,

	// 文と式
	POP, // 式文の結果を捨てる

	// 変数操作
	DEFINE_GLOBAL,
	GET_GLOBAL,
	SET_GLOBAL,
	GET_LOCAL,
	SET_LOCAL,

	// データ構造
	BUILD_ARRAY,
	BUILD_OBJECT,
	GET_PROPERTY,
	SET_PROPERTY,

	// 制御フロー
	JUMP,
	JUMP_IF_FALSE,
	LOOP,

	// 関数
	CALL,
	RETURN,

	// 外部連携
	CALL_BUILTIN,

	// 型チェックと例外処理
	CHECK_TYPE, // 実行時型チェック
	SETUP_EXCEPTION, // tryブロックの開始
	TEARDOWN_EXCEPTION, // tryブロックの終了
	THROW, // 例外のスロー
}
