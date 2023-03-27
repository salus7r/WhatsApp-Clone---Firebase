import React, { useState, useEffect } from "react";

export default function useSeedAvatar(roomId?: string) {
	const [seed, setSeed] = useState(0);

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, [roomId]);

	return `https://avatars.dicebear.com/api/human/${seed}.svg`;
}
