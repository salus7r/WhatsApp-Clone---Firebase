import React, { useState, useEffect } from "react";

export default function useSeedAvatar() {
	const [seed, setSeed] = useState(0);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	return `https://avatars.dicebear.com/api/human/${seed}.svg`;
}
