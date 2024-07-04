const width = 200;
const height = 200;

setDocDimensions(width, height);

let instructions = "YYY".split("");
const rules = {
	Y: "YFX[+Y][-Y]".split(""),
	X: "X[-FFF][+FFF]FX".split(""),
};

const angle = 35;
const savedPositions = [];
const savedAngles = [];

const lines = [];

const normalizedPoint = (point) => [point[0] * width, point[1] * height];
const normalizedLine = (line) => line.map(normalizedPoint);

for (let depth = 0; depth < 5; depth++) {
	instructions = instructions.flatMap(
		(instruction) => rules[instruction] ?? instruction
	);
}

const turtle = new bt.Turtle().jump(normalizedPoint([0.5, 0.1])).setAngle(90);
for (const instruction of instructions) {
	if (instruction === "F") turtle.forward(bt.randInRange(0.5, 1));
	else if (instruction === "+")
		turtle.left(bt.randInRange(angle - 20, angle + 10));
	else if (instruction === "-")
		turtle.right(bt.randInRange(angle - 20, angle + 10));
	else if (instruction === "[") {
		savedPositions.push(turtle.pos);
		savedAngles.push(turtle.angle);
	} else if (instruction === "]") {
		turtle.jump(savedPositions.pop());
		turtle.angle = savedAngles.pop();
	}
}

lines.push(...turtle.path);

drawLines(lines);
