export const prepareHorseModel = (template: Model, color: Color3): Model => {
	const horse = template.Clone();

	horse.GetDescendants().forEach((descendant) => {
		if (descendant.IsA("BasePart")) descendant.Anchored = true;
	});

	const coatFolder = horse.FindFirstChild("Coat");
	coatFolder?.GetChildren().forEach((part) => {
		if (part.IsA("BasePart")) part.Color = color;
	});

	return horse;
};

export const frameHorseInViewport = (model: Model, camera: Camera, distanceMultiplier = 1.6): void => {
	const [boxCFrame, boxSize] = model.GetBoundingBox();
	const maxDimension = math.max(boxSize.X, boxSize.Y, boxSize.Z);
	const distance = maxDimension * distanceMultiplier;

	const cameraOffset = new Vector3(distance * 0.6, distance * 0.35, distance * 0.6);
	camera.CFrame = CFrame.lookAt(boxCFrame.Position.add(cameraOffset), boxCFrame.Position);
};
