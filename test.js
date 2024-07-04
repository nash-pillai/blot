const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const lines = [];
const star = [];

const starlines = 24;
const starcount = 5;

const normalizedLine = (line) =>
	line.map((point) => [point[0] * width, point[1] * height]);

for (let i = 0; i < starlines; i++) {
	star.push(
		normalizedLine([
			[0.5, 0.5],
			[0.5, bt.randInRange(0.8, 0.9)],
		])
	);

	bt.rotate(star, 360 / starlines, [0.5 * width, 0.5 * height]);
}

for (let i = 0; i < 5; i++) {
	const newStar = bt.copy(star);
	bt.scale(newStar, bt.randInRange(0.1, 0.4));
	bt.translate(newStar, [
		bt.randInRange(-0.4, 0.4) * width,
		bt.randInRange(-0.4, 0.4) * height,
	]);
	lines.push(...newStar);
}
// draw it
drawLines(lines);
