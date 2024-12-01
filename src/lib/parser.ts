type ASTNode = Program | Assignment | BinaryExpression | Literal;
interface Program {
	type: "Program";
	value: ASTNode[];
}

interface Assignment {
	type: "Assignment";
	identifier: string;
	value: ASTNode;
}

interface BinaryExpression {
	type: "BinaryExpression";
	left: ASTNode;
	operator: string;
	right: ASTNode;
}

interface Literal {
	type: "Literal";
	value: number;
}

class Parser {}

export { Parser };
