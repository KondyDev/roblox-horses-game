import React, { useEffect } from "@rbxts/react";
import { RunService } from "@rbxts/services";
import { AuraStyle } from "client/ui/auraStyles";

export const useAuraAnimation = (
	gradientRef: React.RefObject<UIGradient>,
	strokeRef: React.RefObject<UIStroke>,
	style: AuraStyle | undefined,
) => {
	useEffect(() => {
		if (style === undefined) return;

		let elapsed = 0;
		const connection = RunService.Heartbeat.Connect((dt) => {
			elapsed += dt;

			const gradient = gradientRef.current;
			if (gradient !== undefined) gradient.Rotation = (elapsed * style.rotationSpeed) % 360;

			const stroke = strokeRef.current;
			if (stroke !== undefined) {
				const wave = 0.5 + 0.5 * math.sin(elapsed * style.pulseSpeed * math.pi * 2);
				stroke.Transparency = wave * style.pulseAmount;
			}
		});

		return () => connection.Disconnect();
	}, [style]);
};
