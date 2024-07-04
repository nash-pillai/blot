const width = 200;
const height = 200;

setDocDimensions(width, height);

const rules = {
	Y: [
		"YFX[+Y][-Y]".split(""),
		"YFX[+Y][-Y]".split(""),
		"YFX[-Y]".split(""),
		"YFX[+Y]".split(""),
	],
	X: [
		"X[-FFF][+FFF]FX".split(""),
		"X[+FFF]FX".split(""),
		"X[-FFF]FX".split(""),
	],
};

const angle = 35;
const savedPositions = [];
const savedAngles = [];

const lines = [];

const normalizedPoint = (point) => [point[0] * width, point[1] * height];
const normalizedLine = (line) => line.map(normalizedPoint);

for (let i = 1; i < 10; i += 1) {
	let instructions = "YYY".split("");
	for (let depth = 0; depth < 5; depth++) {
		instructions = instructions.flatMap((instruction) => {
			return (
				rules[instruction]?.[
					Math.trunc(Math.random() * rules[instruction]?.length)
				] ?? instruction
			);
		});
	}

	const turtle = new bt.Turtle()
		.jump(normalizedPoint([i / 10, bt.randInRange(0, 0.2)]))
		.setAngle(90);
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
}

function makeStar() {
	const star = [];
	const starlines = 24;

	for (let i = 0; i < starlines; i++) {
		star.push(
			normalizedLine([
				[0.5, 0.5],
				[0.5, bt.randInRange(0.7, 0.8)],
			])
		);

		bt.rotate(star, 360 / starlines, [0.5 * width, 0.5 * height]);
	}

	return star;
}
const starcount = 3;

for (let i = 0; i < starcount; i++) {
	const newStar = makeStar();
	bt.scale(newStar, bt.randInRange(0.1, 0.4));
	bt.translate(newStar, [
		bt.randInRange(-0.4, 0.4) * width,
		bt.randInRange(0.1, 0.4) * height,
	]);
	lines.push(...newStar);
}

drawLines(lines);
